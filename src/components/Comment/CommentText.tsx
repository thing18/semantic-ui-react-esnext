import React, { Children } from 'react';

import { SemanticShorthandContent, getClassName } from '../../lib';

interface CommentTextProps extends StrictCommentTextProps {
  [key: string]: any;
}

interface StrictCommentTextProps {
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
 * A comment can contain text.
 */
const CommentText: React.FC<CommentTextProps> = ({ as: ElementType = 'div', className, children, content, ...rest }) => (
  <ElementType {...rest} className={getClassName(className, 'text')}>
    {Children.count(children) ? children : content}
  </ElementType>
);

export { CommentText, CommentTextProps, StrictCommentTextProps };
