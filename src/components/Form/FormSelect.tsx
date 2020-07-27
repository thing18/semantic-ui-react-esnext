import React from 'react';

import { Select, StrictSelectProps } from '../Select';
import { FormField, StrictFormFieldProps } from './FormField';
import { DropdownItemProps } from '../Dropdown';

export interface FormSelectProps extends StrictFormSelectProps {
  [key: string]: any;
}

export interface StrictFormSelectProps extends StrictFormFieldProps, StrictSelectProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A FormField control prop. */
  control?: any;

  /** Individual fields may display an error state along with a message. */
  error?: any;

  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: DropdownItemProps[];
}

/**
 * Sugar for <Form.Field control={Select} />.
 * @see Form
 * @see Select
 */
export const FormSelect: React.FC<FormSelectProps> = ({ as: ElementType = FormField, control = Select, options, ...rest }) => <ElementType {...rest} control={control} options={options} />;

FormSelect.defaultProps = { as: FormField, control: Select };
