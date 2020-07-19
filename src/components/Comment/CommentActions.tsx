import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

interface CommentActionsProps extends StrictCommentActionsProps {
  [key: string]: any;
}

interface StrictCommentActionsProps {
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
 * A comment can contain an list of actions a user may perform related to this comment.
 */
const CommentActions: React.FC<CommentActionsProps> = props => ChildrenOrContent(props, 'actions');

export { CommentActions, CommentActionsProps, StrictCommentActionsProps };
