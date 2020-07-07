import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface MessageContentProps extends StrictMessageContentProps {
  [key: string]: any;
}

export interface StrictMessageContentProps {
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
 * A message can contain a content.
 */
export const MessageContent: React.FC<MessageContentProps> = (props) => ChildrenOrContent('content', props);
