import React, { Children } from 'react';

import { SemanticShorthandContent, getClassName } from '../../lib';

interface CommentActionProps extends StrictCommentActionProps {
  [key: string]: any;
}

interface StrictCommentActionProps {
  /** An element type to render as (string or function). */
  as?: any;

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
const CommentAction: React.FC<CommentActionProps> = ({ as: ElementType = 'a', active, className, children, content, ...rest }) => (
  <ElementType {...rest} className={getClassName({ active }, className)}>
    {Children.count(children) ? children : content}
  </ElementType>
);

CommentAction.defaultProps = { as: 'a' };

export { CommentAction, CommentActionProps, StrictCommentActionProps };
