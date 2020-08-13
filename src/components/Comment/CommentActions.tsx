import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface CommentActionsProps extends StrictCommentActionsProps {
  [key: string]: any;
}

export interface StrictCommentActionsProps {
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
 * A comment can contain an list of actions a user may perform related to this comment.
 */
export const CommentActions: React.FC<CommentActionsProps> = props =>
  ChildrenOrContent(props, 'actions');
