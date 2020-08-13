import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface CommentMetadataProps extends StrictCommentMetadataProps {
  [key: string]: any;
}

export interface StrictCommentMetadataProps {
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
 * A comment can contain metadata about the comment, an arbitrary amount of metadata may be defined.
 */
export const CommentMetadata: React.FC<CommentMetadataProps> = props =>
  ChildrenOrContent(props, 'metadata');
