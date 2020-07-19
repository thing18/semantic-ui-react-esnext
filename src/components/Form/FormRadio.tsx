import React from 'react';

import { Radio, StrictRadioProps } from '..';
import { FormField, StrictFormFieldProps } from './FormField';

export interface FormRadioProps extends StrictFormRadioProps {
  [key: string]: any;
}

export interface StrictFormRadioProps extends StrictFormFieldProps, StrictRadioProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A FormField control prop. */
  control?: any;

  /** HTML input type, either checkbox or radio. */
  type?: 'checkbox' | 'radio';
}

/**
 * Sugar for <Form.Field control={Radio} />.
 * @see Form
 * @see Radio
 */
export const FormRadio: React.FC<FormRadioProps> = ({ as: ElementType = FormField, control = Radio, ...rest }) => <ElementType {...rest} control={control} />;

FormRadio.defaultProps = { as: FormField, control: Radio };
