import React from 'react';

import { SemanticShorthandContent, FCX, createShorthandFactory, ChildrenOrContent } from '../../lib';

export interface MessageHeaderProps extends StrictMessageHeaderProps {
  [key: string]: any;
}

export interface StrictMessageHeaderProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

/**
 * A message can contain a header.
 */
export const MessageHeader: FCX<MessageHeaderProps> = (props) => ChildrenOrContent(props, 'header');

MessageHeader.create = createShorthandFactory(MessageHeader, (val) => ({ content: val }));
