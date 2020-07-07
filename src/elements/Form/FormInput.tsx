import React from 'react';

import { SemanticShorthandItem } from '../../lib';
import { LabelProps, StrictInputProps, Input } from '..';
import { FormField, StrictFormFieldProps } from './FormField';

export interface FormInputProps extends StrictFormInputProps {
  [key: string]: any;
}

export interface StrictFormInputProps extends StrictFormFieldProps, StrictInputProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A FormField control prop. */
  control?: any;

  /** Individual fields may display an error state along with a message. */
  error?: any;

  /** Shorthand for a Label. */
  label?: SemanticShorthandItem<LabelProps>;
}

/**
 * Sugar for <Form.Field control={Input} />.
 * @see Form
 * @see Input
 */
export const FormInput: React.FC<FormInputProps> = ({ as: ElementType = FormField, control = Input, ...rest }) => <ElementType {...rest} control={control} />;

FormInput.defaultProps = { as: FormField, control: Input };
