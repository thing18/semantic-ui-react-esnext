import React, { Children } from 'react';

import { SemanticShorthandContent, getClassName, ChildrenOrContent } from '../../lib';

export interface CommentContentProps extends StrictCommentContentProps {
  [key: string]: any;
}

export interface StrictCommentContentProps {
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
 * A comment can contain content.
 */
export const CommentContent: React.FC<CommentContentProps> = ({ className, ...props }) =>
  ChildrenOrContent(props, className, 'content');
