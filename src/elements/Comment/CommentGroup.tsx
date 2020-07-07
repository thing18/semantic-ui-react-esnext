import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticSIZES, getClassName } from '../../lib';

interface CommentGroupProps extends StrictCommentGroupProps {
  [key: string]: any;
}

interface StrictCommentGroupProps {
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
const CommentGroup: React.FC<CommentGroupProps> = ({ as, className, children, collapsed, content, minimal, size, threaded, ...rest }) => {

  const classes = getClassName('ui', size, { collapsed, minimal, threaded }, 'comments', className);

  const ElementType = as || 'div';

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

export { CommentGroup, CommentGroupProps, StrictCommentGroupProps };
