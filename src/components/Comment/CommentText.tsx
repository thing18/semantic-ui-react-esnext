import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface CommentTextProps extends StrictCommentTextProps {
  [key: string]: any;
}

export interface StrictCommentTextProps {
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
 * A comment can contain text.
 */
export const CommentText: React.FC<CommentTextProps> = ({ className, ...props }) =>
  ChildrenOrContent(props, className, 'text');
