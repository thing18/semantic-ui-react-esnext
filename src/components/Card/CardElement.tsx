import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticTEXTALIGNMENTS, getClassName, Use } from '../../lib';

interface Props {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A card meta can adjust its text alignment. */
  textAlign?: Exclude<SemanticTEXTALIGNMENTS, 'justified'>;

  /** any other */
  [key: string]: any;
}

/**
 * A card can contain content metadata.
 */
export const CardElement = (className1: string, { as: ElementType = 'div', children, className, content, textAlign, ...rest }: Props) => (
  <ElementType {...rest} className={getClassName([Use.TextAlign, textAlign], className1, className)}>
    {Children.count(children) ? children : content}
  </ElementType>
);
