import React, { Children, cloneElement, useCallback, forwardRef } from 'react';

import { HtmlInputrops, SemanticShorthandItem, SemanticSIZES, childrenUtils, createHTMLInput, createShorthandFactory, partitionHTMLProps, Use, FCX, getClassName } from '../../lib';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Label, LabelProps } from '../Label';

export interface StrictInputProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** An Input can be formatted to alert the user to an action they may perform. */
  action?: any | boolean;

  /** An action can appear along side an Input on the left or right. */
  actionPosition?: 'left';

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** An Input field can show that it is disabled. */
  disabled?: boolean;

  /** An Input field can show the data contains errors. */
  error?: boolean;

  /** Take on the size of its container. */
  fluid?: boolean;

  /** An Input field can show a user is currently interacting with it. */
  focus?: boolean;

  /** Optional Icon to display inside the Input. */
  icon?: any | SemanticShorthandItem<InputProps>;

  /** An Icon can appear inside an Input on the left. */
  iconPosition?: 'left';

  /** Shorthand for creating the HTML Input. */
  input?: SemanticShorthandItem<HtmlInputrops>;

  /** Format to appear on dark backgrounds. */
  inverted?: boolean;

  /** Optional Label to display along side the Input. */
  label?: SemanticShorthandItem<LabelProps>;

  /** A Label can appear outside an Input on the left or right. */
  labelPosition?: 'left' | 'right' | 'left corner' | 'right corner';

  /** An Icon Input field can show that it is currently loading data. */
  loading?: boolean;

  /**
   * Called on change.
   *
   * @param {ChangeEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and a proposed value.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;

  /** An Input can vary in size. */
  size?: SemanticSIZES;

  /** An Input can receive focus. */
  tabIndex?: number | string;

  /** Transparent Input has no background. */
  transparent?: boolean;

  /** The HTML input type. */
  type?: string;
}

export interface InputProps extends StrictInputProps {
  [key: string]: any;
}

export interface InputOnChangeData extends InputProps {
  value: string;
}

/**
 * An Input is a field used to elicit a response from a user.
 * @see Button
 * @see Form
 * @see Icon
 * @see Label
 */

export const Input: FCX<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {

  const { as: ElementType = 'div', tabIndex, type = 'text', onChange, action, actionPosition, children, className, disabled, error, fluid, focus, icon, iconPosition, input, inverted, label, labelPosition, loading, size, transparent, ...unhandled } = props;

  const classes = getClassName(
    'ui', size,
    { disabled, error, fluid, focus, inverted, loading, transparent },
    [Use.ValueKeyOrKey, { action: [actionPosition, action], icon: [iconPosition, icon || loading], labeled: [labelPosition, label] }],
    'input', className,
  );

  const handleChange = (e: any) => unhandled.readOnly || disabled ? e.preventDefault() : onChange?.call(null, e, { ...props, value: e.target.value });

  const handleChildOverrides = (child: any, defaultProps: any) => ({
    ...defaultProps,
    ...child.props,
    ref,
  });

  const [hprops, rest] = partitionHTMLProps(unhandled);
  const htmlInputProps = {
    ...hprops,
    disabled,
    type,
    tabIndex: tabIndex != null ? tabIndex : disabled ? -1 : undefined,
    onChange: handleChange,
    // tslint:disable-next-line: object-shorthand-properties-first
    ref,
  };

  // Render with children
  // ----------------------------------------
  if (Children.count(children)) {

    // add htmlInputProps to the `<input />` child
    const childElements = Children.toArray(children).map((child: any) => {
      if (child.type !== 'input') return child;
      return cloneElement(child, handleChildOverrides(child, htmlInputProps));
    });

    return (
      <ElementType {...rest} className={classes}>
        {childElements}
      </ElementType>
    );
  }

  // Render Shorthand
  // ----------------------------------------
  const actionElement = Button.create(action, { autoGenerateKey: false });
  const labelElement = Label.create(label, { defaultProps: { className: getClassName('label', [Use.Key, { labelPosition: labelPosition?.includes('corner') }]) }, autoGenerateKey: false });

  return (
    <ElementType {...rest} className={classes}>
      {actionPosition === 'left' && actionElement}
      {labelPosition !== 'right' && labelElement}
      {createHTMLInput(input || type, { defaultProps: htmlInputProps, autoGenerateKey: false })}
      {Icon.create(icon != null ? icon : loading ? 'spinner' : undefined, { autoGenerateKey: false })}
      {actionPosition !== 'left' && actionElement}
      {labelPosition === 'right' && labelElement}
    </ElementType>
  );
}) as any;

Input.defaultProps = { type: 'text' };
Input.create = createShorthandFactory(Input, (type) => ({ type }));
