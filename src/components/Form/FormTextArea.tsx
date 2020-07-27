import React from 'react';

import { TextArea, StrictTextAreaProps } from '../TextArea';
import { FormField, StrictFormFieldProps } from './FormField';

export interface FormTextAreaProps extends StrictFormTextAreaProps {
  [key: string]: any;
}

export interface StrictFormTextAreaProps extends StrictFormFieldProps, StrictTextAreaProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A FormField control prop. */
  control?: any;
}

/**
 * Sugar for <Form.Field control={TextArea} />.
 * @see Form
 * @see TextArea
 */
export const FormTextArea: React.FC<FormTextAreaProps> = ({ as: ElementType = FormField, control = TextArea, ...rest }) => <ElementType {...rest} control={control} />;

FormTextArea.defaultProps = { as: FormField, control: TextArea };
