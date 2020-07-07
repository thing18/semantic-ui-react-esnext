import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

interface CommentAuthorProps extends StrictCommentAuthorProps {
  [key: string]: any;
}

interface StrictCommentAuthorProps {
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
 * A comment can contain an author.
 */
const CommentAuthor: React.FC<CommentAuthorProps> = props => ChildrenOrContent('author', props);

export { CommentAuthor, CommentAuthorProps, StrictCommentAuthorProps };
