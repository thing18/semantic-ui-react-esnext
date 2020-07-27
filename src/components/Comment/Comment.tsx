import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';
import { CommentAction } from './CommentAction';
import { CommentActions } from './CommentActions';
import { CommentAuthor } from './CommentAuthor';
import { CommentAvatar } from './CommentAvatar';
import { CommentContent } from './CommentContent';
import { CommentGroup } from './CommentGroup';
import { CommentMetadata } from './CommentMetadata';
import { CommentText } from './CommentText';

interface CommentProps extends StrictCommentProps {
  [key: string]: any;
}

interface StrictCommentProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Comment can be collapsed, or hidden from view. */
  collapsed?: boolean;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

interface CComment extends React.FC<CommentProps> {
  Action: typeof CommentAction;
  Actions: typeof CommentActions;
  Author: typeof CommentAuthor;
  Avatar: typeof CommentAvatar;
  Content: typeof CommentContent;
  Group: typeof CommentGroup;
  Metadata: typeof CommentMetadata;
  Text: typeof CommentText;
}

/**
 * A comment displays user feedback to site content.
 */
const Comment: CComment = ({ collapsed, ...props }) =>
  ChildrenOrContent(props, { collapsed }, 'comment');

Comment.Author = CommentAuthor;
Comment.Action = CommentAction;
Comment.Actions = CommentActions;
Comment.Avatar = CommentAvatar;
Comment.Content = CommentContent;
Comment.Group = CommentGroup;
Comment.Metadata = CommentMetadata;
Comment.Text = CommentText;

export { Comment, CommentProps, StrictCommentProps };
