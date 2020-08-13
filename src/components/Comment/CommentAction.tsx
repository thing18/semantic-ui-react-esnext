import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface CommentActionProps extends StrictCommentActionProps {
  [key: string]: any;
}

export interface StrictCommentActionProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Style as the currently active action. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

/**
 * A comment can contain an action.
 */
export const CommentAction: React.FC<CommentActionProps> = ({ as = 'a', active, ...props }) =>
  ChildrenOrContent({ ...props, as }, { active });

CommentAction.defaultProps = { as: 'a' };
