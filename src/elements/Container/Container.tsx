import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticTEXTALIGNMENTS, Use, getClassName } from '../../lib';

export interface StrictContainerProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Container has no maximum width. */
  fluid?: boolean;

  /** Reduce maximum width to more naturally accommodate text. */
  text?: boolean;

  /** Describes how the text inside this component should be aligned. */
  textAlign?: SemanticTEXTALIGNMENTS;
}

export interface ContainerProps extends StrictContainerProps {
  [key: string]: any;
}

/**
 * A container limits content to a maximum width.
 */
export const Container: React.FC<ContainerProps> = ({ as: ElementType = 'div', children, className, content, fluid, text, textAlign, ...rest }) => {

  const classes = getClassName('ui', [Use.Key, { text, fluid }], [Use.TextAlign, textAlign], 'container', className);

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};
