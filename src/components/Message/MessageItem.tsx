import React from 'react';

import { SemanticShorthandContent, FCX, createShorthandFactory, ChildrenOrContent } from '../../lib';

export interface MessageItemProps extends StrictMessageItemProps {
  [key: string]: any;
}

export interface StrictMessageItemProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

/**
 * A message list can contain an item.
 */
export const MessageItem: FCX<MessageItemProps> = ({ as = 'li', ...rest }) => ChildrenOrContent({ as, ...rest }, 'content');

MessageItem.defaultProps = { as: 'li' };
MessageItem.create = createShorthandFactory(MessageItem, (content) => ({ content }));
