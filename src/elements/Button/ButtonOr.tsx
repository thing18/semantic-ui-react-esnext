import React from 'react';
import { getClassName } from '../../lib';

export interface StrictButtonOrProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Additional classes. */
  className?: string;

  /** Or buttons can have their text localized, or adjusted by using the text prop. */
  text?: number | string;
}

export interface ButtonOrProps extends StrictButtonOrProps {
  [key: string]: any;
}

/**
 * Button groups can contain conditionals.
 */
export const ButtonOr: React.FC<ButtonOrProps> = ({ as: ElementType = 'div', className, text, ...rest }) => <ElementType {...rest} className={getClassName('or', className)} data-text={text} />;
