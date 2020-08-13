import React, { Children } from 'react';
import { SemanticShorthandContent } from './types';
import { getClassName } from './classNameBuilders';

interface Props {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  [key: string]: any;
}

export const ChildrenOrContent = ({ as, children, className, content, ...rest }: Props, ...classNameArgs: any[]) => {

  const ElementType = (rest.href ? 'a' : as) ?? 'div';

  return (
    <ElementType {...rest} className={getClassName(...classNameArgs, className)}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};
