import React from 'react';

import { SemanticWIDTHS, getClassName, Use } from '../../lib';

export interface FormGroupProps extends StrictFormGroupProps {
  [key: string]: any;
}

export interface StrictFormGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Fields can show related choices. */
  grouped?: boolean;

  /** Multiple fields may be inline in a row. */
  inline?: boolean;

  /** A form group can prevent itself from stacking on mobile. */
  unstackable?: boolean;

  /** Fields Groups can specify their width in grid columns or automatically divide fields to be equal width. */
  widths?: SemanticWIDTHS | 'equal';
}

/**
 * A set of fields can appear grouped together.
 * @see Form
 */
export const FormGroup: React.FC<FormGroupProps> = ({ as: ElementType = 'div', children, className, grouped, inline, unstackable, widths, ...rest }) => {

  const classes = getClassName([Use.Key, { grouped, inline, unstackable }], [Use.Width, widths, null, true], 'fields', className);

  return (
    <ElementType {...rest} className={classes}>
      {children}
    </ElementType>
  );
};
