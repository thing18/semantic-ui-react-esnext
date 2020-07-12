import React, { createElement, Children } from 'react';

import { HtmlLabelProps, SemanticShorthandContent, SemanticShorthandItem, SemanticWIDTHS, getClassName, createHTMLLabel, Use } from '../../lib';
import { LabelProps, Label, Radio, Checkbox } from '..';

export interface FormFieldProps extends StrictFormFieldProps {
  [key: string]: any;
}

export interface StrictFormFieldProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /**
   * A form control component (i.e. Dropdown) or HTML tagName (i.e. 'input').
   * Extra FormField props are passed to the control component.
   * Mutually exclusive with children.
   */
  control?: any;

  /** Individual fields may be disabled. */
  disabled?: boolean;

  /** Individual fields may display an error state along with a message. */
  error?: boolean | SemanticShorthandItem<LabelProps>;

  /** The id of the control */
  id?: string;

  /** A field can have its label next to instead of above it. */
  inline?: boolean;

  /** Mutually exclusive with children. */
  label?: SemanticShorthandItem<HtmlLabelProps>;

  /** A field can show that input is mandatory.  Requires a label. */
  required?: any;

  /** Passed to the control component (i.e. <input type='password' />) */
  type?: string;

  /** A field can specify its width in grid columns */
  width?: SemanticWIDTHS;
}

/**
 * A field is a form element containing a label and an input.
 * @see Form
 * @see Button
 * @see Checkbox
 * @see Dropdown
 * @see Input
 * @see Radio
 * @see Select
 * @see Visibility
 */
export const FormField: React.FC<FormFieldProps> = (props) => {

  const { as: ElementType, children, className, content, control, disabled, error, inline, label, required, type, width, id, ...rest } = props;

  const classes = getClassName([Use.Key, { disabled, error, inline, required }], [Use.Width, width, 'wide'], 'field', className);

  const errorPointing = (error as any)?.pointing ?? 'above';
  const errorLabel = Label.create(error, { autoGenerateKey: false, defaultProps: { prompt: true, pointing: errorPointing, id: id ? `${id}-error-message` : undefined, role: 'alert', 'aria-atomic': true } });

  const errorLabelBefore = (errorPointing === 'below' || errorPointing === 'right') && errorLabel;
  const errorLabelAfter = (errorPointing === 'above' || errorPointing === 'left') && errorLabel;

  // ----------------------------------------
  // No Control
  // ----------------------------------------

  if (control == null) {
    if (label == null) {
      return (
        <ElementType {...rest} className={classes}>
          {Children.count(children) ? children : content}
        </ElementType>
      );
    }

    return (
      <ElementType {...rest} className={classes}>
        {errorLabelBefore}
        {createHTMLLabel(label, { autoGenerateKey: false })}
        {errorLabelAfter}
      </ElementType>
    );
  }

  // ----------------------------------------
  // Checkbox/Radio Control
  // ----------------------------------------

  const ariaDescribedBy = id && error ? `${id}-error-message` : null;
  const ariaAttrs = { 'aria-describedby': ariaDescribedBy, 'aria-invalid': error !== undefined ? true : undefined };
  const controlProps = { ...rest, content, children, disabled, required, type, id };

  // wrap HTML checkboxes/radios in the label
  if (control === 'input' && (type === 'checkbox' || type === 'radio')) {
    return (
      <ElementType className={classes}>
        <label>
          {errorLabelBefore}
          {createElement(control, { ...ariaAttrs, ...controlProps })} {label}
          {errorLabelAfter}
        </label>
      </ElementType>
    );
  }

  // pass label prop to controls that support it
  if (control === Checkbox || control === Radio) {
    return (
      <ElementType className={classes}>
        {errorLabelBefore}
        {createElement(control, { ...ariaAttrs, ...controlProps, label })}
        {errorLabelAfter}
      </ElementType>
    );
  }

  // ----------------------------------------
  // Other Control
  // ----------------------------------------

  return (
    <ElementType className={classes}>
      {createHTMLLabel(label, {
        defaultProps: { htmlFor: id },
        autoGenerateKey: false,
      })}
      {errorLabelBefore}
      {createElement(control, { ...ariaAttrs, ...controlProps })}
      {errorLabelAfter}
    </ElementType>
  );
};
