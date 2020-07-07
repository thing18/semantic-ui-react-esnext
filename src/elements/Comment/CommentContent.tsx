import React, { Children } from 'react';

import { SemanticShorthandContent, getClassName } from '../../lib';

interface CommentContentProps extends StrictCommentContentProps {
  [key: string]: any;
}

interface StrictCommentContentProps {
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
 * A comment can contain content.
 */
const CommentContent: React.FC<CommentContentProps> = ({ as: ElementType = 'div', className, children, content, ...rest }) => (
  <ElementType {...rest} className={getClassName(className, 'content')}>
    {Children.count(children) ? children : content}
  </ElementType>
);

export { CommentContent, CommentContentProps, StrictCommentContentProps };
