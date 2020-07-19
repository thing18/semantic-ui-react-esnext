import React from 'react';

import { Checkbox, StrictCheckboxProps } from '..';
import { StrictFormFieldProps, FormField } from './FormField';

export interface FormCheckboxProps extends StrictFormCheckboxProps {
  [key: string]: any;
}

export interface StrictFormCheckboxProps extends StrictFormFieldProps, StrictCheckboxProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A FormField control prop. */
  control?: any;

  /** HTML input type, either checkbox or radio. */
  type?: 'checkbox' | 'radio';
}

/**
 * Sugar for <Form.Field control={Checkbox} />.
 * @see Checkbox
 * @see Form
 */
export const FormCheckbox: React.FC<FormCheckboxProps> = ({ as: ElementType = FormField, control = Checkbox, ...rest }) => <ElementType {...rest} control={control} />;

FormCheckbox.defaultProps = { as: FormField, control: Checkbox };
