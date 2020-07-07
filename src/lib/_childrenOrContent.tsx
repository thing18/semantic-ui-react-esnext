import React, { Children } from 'react';
import { SemanticShorthandContent, getClassNames } from '.';

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

export const ChildrenOrContent = (className1: any, { as: ElementType = 'div', children, className, content, ...rest }: Props) => (
  <ElementType {...rest} className={getClassNames([className1, className])}>
    {Children.count(children) ? children : content}
  </ElementType>
);
