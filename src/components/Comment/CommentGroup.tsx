import React from 'react';

import { SemanticShorthandContent, SemanticSIZES, ChildrenOrContent } from '../../lib';

export interface CommentGroupProps extends StrictCommentGroupProps {
  [key: string]: any;
}

export interface StrictCommentGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Comments can be collapsed, or hidden from view. */
  collapsed?: boolean;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Comments can hide extra information unless a user shows intent to interact with a comment */
  minimal?: boolean;

  /** Comments can have different sizes. */
  size?: Exclude<SemanticSIZES, 'medium'>;

  /** A comment list can be threaded to showing the relationship between conversations */
  threaded?: boolean;
}

/**
 * Comments can be grouped.
 */
export const CommentGroup: React.FC<CommentGroupProps> = ({ collapsed, minimal, size, threaded, ...props }) =>
  ChildrenOrContent(props, 'ui', size, { collapsed, minimal, threaded }, 'comments');
