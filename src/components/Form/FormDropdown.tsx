import React from 'react';

import { Dropdown, StrictDropdownProps } from '..';
import { FormField, StrictFormFieldProps } from './FormField';

export interface FormDropdownProps extends StrictFormDropdownProps {
  [key: string]: any;
}

export interface StrictFormDropdownProps extends StrictFormFieldProps, StrictDropdownProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A FormField control prop. */
  control?: any;

  /** Individual fields may display an error state along with a message. */
  error?: any;
}

/**
 * Sugar for <Form.Field control={Dropdown} />.
 * @see Dropdown
 * @see Form
 */
export const FormDropdown: React.FC<FormDropdownProps> = ({ as: ElementType = FormField, control = Dropdown, ...rest }) => <ElementType {...rest} control={control} />;

FormDropdown.defaultProps = { as: FormField, control: Dropdown };
