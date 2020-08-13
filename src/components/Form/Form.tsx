import React, { } from 'react';
import { FormField } from './FormField';
import { FormButton } from './FormButton';
import { FormCheckbox } from './FormCheckbox';
import { FormDropdown } from './FormDropdown';
import { FormGroup } from './FormGroup';
import { FormInput } from './FormInput';
import { FormRadio } from './FormRadio';
import { FormSelect } from './FormSelect';
import { FormTextArea } from './FormTextArea';
import { getClassName, Use } from '../../lib';

export interface FormProps extends StrictFormProps {
  [key: string]: any;
}

export interface StrictFormProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** The HTML form action */
  action?: string;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Automatically show any error Message children. */
  error?: boolean;

  /** A form can have its color inverted for contrast. */
  inverted?: boolean;

  /** Automatically show a loading indicator. */
  loading?: boolean;

  /** The HTML form submit handler. */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>, data: FormProps, ...args: any[]) => void;

  /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
  reply?: boolean;

  /** A form can vary in size. */
  size?: string;

  /** Automatically show any success Message children. */
  success?: boolean;

  /** A form can prevent itself from stacking on mobile. */
  unstackable?: boolean;

  /** Automatically show any warning Message children. */
  warning?: boolean;

  /** Forms can automatically divide fields to be equal width. */
  widths?: 'equal';
}

interface CForm extends React.FC<FormProps> {
  Field: typeof FormField;
  Button: typeof FormButton;
  Checkbox: typeof FormCheckbox;
  Dropdown: typeof FormDropdown;
  Group: typeof FormGroup;
  Input: typeof FormInput;
  Radio: typeof FormRadio;
  Select: typeof FormSelect;
  TextArea: typeof FormTextArea;
}

/**
 * A Form displays a set of related user input fields in a structured way.
 * @see Button
 * @see Checkbox
 * @see Dropdown
 * @see Input
 * @see Message
 * @see Radio
 * @see Select
 * @see Visibility
 */
export const Form: CForm = props => {

  const { as: ElementType = 'form', onSubmit, action, children, className, error, inverted, loading, reply, size, success, unstackable, warning, widths, ...rest } = props;

  const handleSubmit = (e: any, ...args: any[]) => {

    // Heads up! Third party libs can pass own data as first argument, we need to check that it has preventDefault()
    // method.
    if (typeof action !== 'string') e.preventDefault && e.preventDefault();
    onSubmit?.call(null, e, props, ...args);
  };

  const classes = getClassName('ui', size, [Use.Key, { error, inverted, loading, reply, success, unstackable, warning }], [Use.Width, widths, null, true], 'form', className);

  return (
    <ElementType {...rest} action={action} className={classes} onSubmit={handleSubmit}>
      {children}
    </ElementType>
  );
};

Form.defaultProps = { as: 'form' };
Form.Field = FormField;
Form.Button = FormButton;
Form.Checkbox = FormCheckbox;
Form.Dropdown = FormDropdown;
Form.Group = FormGroup;
Form.Input = FormInput;
Form.Radio = FormRadio;
Form.Select = FormSelect;
Form.TextArea = FormTextArea;
