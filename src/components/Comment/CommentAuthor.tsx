import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface CommentAuthorProps extends StrictCommentAuthorProps {
  [key: string]: any;
}

export interface StrictCommentAuthorProps {
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
 * A comment can contain an author.
 */
export const CommentAuthor: React.FC<CommentAuthorProps> = props =>
  ChildrenOrContent(props, 'author');
