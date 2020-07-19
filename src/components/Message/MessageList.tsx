import React, { Children } from 'react';

import { SemanticShorthandCollection, FCX, getClassName, createShorthandFactory } from '../../lib';
import { MessageItem, MessageItemProps } from './MessageItem';

export interface MessageListProps extends StrictMessageListProps {
  [key: string]: any;
}

export interface StrictMessageListProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand Message.Items. */
  items?: SemanticShorthandCollection<MessageItemProps>;
}

/**
 * A message can contain a list of items.
 */
export const MessageList: FCX<MessageListProps> = ({ as: ElementType = 'ul', children, className, items, ...rest }) => (
  <ElementType {...rest} className={getClassName('list', className)}>
    {Children.count(children) ? children : Array.isArray(items) && items.map(item => MessageItem.create(item))}
  </ElementType>
);

MessageList.defaultProps = { as: 'ul' };
MessageList.create = createShorthandFactory(MessageList, (val) => ({ items: val }));
