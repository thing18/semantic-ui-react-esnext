import React, { Children } from 'react';
import { SemanticShorthandContent, getClassName } from '.';

interface Props {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  [key: string]: any;
}

export const ChildrenOrContent = ({ as: ElementType = 'div', children, className, content, ...rest }: Props, ...classNameArgs: any[]) => (
  <ElementType {...rest} className={getClassName(...classNameArgs, className)}>
    {Children.count(children) ? children : content}
  </ElementType>
);
