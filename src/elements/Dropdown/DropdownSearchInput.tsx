import React, { forwardRef } from 'react';
import { FCX, createShorthandFactory, getClassName } from '../../lib';

export interface DropdownSearchInputProps extends StrictDropdownSearchInputProps {
  [key: string]: any;
}

export interface StrictDropdownSearchInputProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** An input can have the auto complete. */
  autoComplete?: string;

  /** Additional classes. */
  className?: string;

  /** An input can receive focus. */
  tabIndex?: number;

  /** The HTML input type. */
  type?: string;

  /** Stored value. */
  value?: number | string;
}

/**
 * A search item sub-component for Dropdown component.
 */
const DropdownSearchInput: FCX<DropdownSearchInputProps> = forwardRef<any, DropdownSearchInputProps>((props, ref) => {

  const { as: ElementType = 'div', autoComplete = 'off', className, tabIndex, type = 'text', value, onChange, ...rest } = props;

  const handleChange = (e: any) => onChange?.call(null, e, { ...props, value: e.target.value });

  const classes = getClassName('search', className);

  return (
    <input
      {...rest}
      ref={ref}
      aria-autocomplete='list'
      autoComplete={autoComplete}
      className={classes}
      onChange={handleChange}
      tabIndex={tabIndex}
      type={type}
      value={value}
    />
  );
}) as any;

DropdownSearchInput.defaultProps = { autoComplete: 'off', type: 'text' };
DropdownSearchInput.create = createShorthandFactory(DropdownSearchInput, (type) => ({ type }));

export { DropdownSearchInput };
