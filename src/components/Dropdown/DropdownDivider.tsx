import React from 'react';
import { getClassName1 } from '../../lib';

export interface DropdownDividerProps extends StrictDropdownDividerProps {
  [key: string]: any;
}

export interface StrictDropdownDividerProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Additional classes. */
  className?: string;
}

/**
 * A dropdown menu can contain dividers to separate related content.
 */
export const DropdownDivider: React.FC<DropdownDividerProps> = ({ as: ElementType = 'div', className, ...rest }) =>
  <ElementType {...rest} className={getClassName1('divider', className)} />;
