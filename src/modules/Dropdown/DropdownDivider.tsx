import React from 'react';
import { getClassName } from '../../lib';

export interface DropdownDividerProps extends StrictDropdownDividerProps {
  [key: string]: any;
}

export interface StrictDropdownDividerProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Additional classes. */
  className?: string;
}

/**
 * A dropdown menu can contain dividers to separate related content.
 */
export const DropdownDivider: React.FC<DropdownDividerProps> = ({ as: ElementType = 'div', className, ...rest }) => <ElementType {...rest} className={getClassName('divider', className)} />;

DropdownDivider.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Additional classes. */
  className: PropTypes.string,
};
