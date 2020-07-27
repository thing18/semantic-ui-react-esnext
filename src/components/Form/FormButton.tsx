import React from 'react';

import { SemanticShorthandItem } from '../../lib';
import { StrictButtonProps, Button } from '../Button';
import { LabelProps } from '../Label';
import { StrictFormFieldProps, FormField } from './FormField';

export interface FormButtonProps extends StrictFormButtonProps {
  [key: string]: any;
}

export interface StrictFormButtonProps extends StrictFormFieldProps, StrictButtonProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A FormField control prop. */
  control?: any;

  /** Shorthand for a Label. */
  label?: SemanticShorthandItem<LabelProps>;
}

/**
 * Sugar for <Form.Field control={Button} />.
 * @see Button
 * @see Form
 */
export const FormButton: React.FC<FormButtonProps> = ({ as: ElementType = FormField, control = Button, ...rest }) => <ElementType {...rest} control={control} />;

FormButton.defaultProps = { as: FormField, control: Button };
