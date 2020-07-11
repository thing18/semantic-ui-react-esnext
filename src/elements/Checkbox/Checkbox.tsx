import React, { useRef, useEffect, useState } from 'react';

import { HtmlLabelProps, SemanticShorthandItem, getClassName, partitionHTMLProps, htmlInputAttrs, createHTMLLabel } from '../../lib';

export interface CheckboxProps extends StrictCheckboxProps {
  [key: string]: any;
}

export interface StrictCheckboxProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Whether or not checkbox is checked. */
  checked?: boolean;

  /** Additional classes. */
  className?: string;

  /** The initial value of checked. */
  defaultChecked?: boolean;

  /** Whether or not checkbox is indeterminate. */
  defaultIndeterminate?: boolean;

  /** A checkbox can appear disabled and be unable to change states */
  disabled?: boolean;

  /** Removes padding for a label. Auto applied when there is no label. */
  fitted?: boolean;

  /** A unique identifier. */
  id?: string;

  /** Whether or not checkbox is indeterminate. */
  indeterminate?: boolean;

  /** The text of the associated label element. */
  label?: SemanticShorthandItem<HtmlLabelProps>;

  /** The HTML input name. */
  name?: string;

  /**
   * Called when the user attempts to change the checked state.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed checked/indeterminate state.
   */
  onChange?: (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => void;

  /**
   * Called when the checkbox or label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onClick?: (event: React.MouseEvent<HTMLInputElement>, data: CheckboxProps) => void;

  /**
   * Called when the user presses down on the mouse.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement>, data: CheckboxProps) => void;

  /**
   * Called when the user releases the mouse.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onMouseUp?: (event: React.MouseEvent<HTMLInputElement>, data: CheckboxProps) => void;

  /** Format as a radio element. This means it is an exclusive option. */
  radio?: boolean;

  /** A checkbox can be read-only and unable to change states. */
  readOnly?: boolean;

  /** Format to emphasize the current selection state. */
  slider?: boolean;

  /** A checkbox can receive focus. */
  tabIndex?: number;

  /** Format to show an on or off choice. */
  toggle?: boolean;

  /** HTML input type, either checkbox or radio. */
  type?: 'checkbox' | 'radio';

  /** The HTML input value. */
  value?: number | string;
}

/**
 * A checkbox allows a user to select a value from a small set of options, often binary.
 * @see Form
 * @see Radio
 */
export const Checkbox: React.FC<CheckboxProps> = props => {

  const { as: ElementType = 'div', checked, className, defaultChecked, defaultIndeterminate, disabled, fitted, id, indeterminate, label, name, onChange, onClick, onMouseDown, onMouseUp, radio, readOnly, slider, tabIndex, toggle, type = 'checkbox', value, ...unhandled } = props;

  const inputRef = useRef<any>();
  const labelRef = useRef<any>();
  const [{ isChecked, isIndeterminate }, setState] = useState({ isChecked: checked ?? defaultChecked ?? false, isIndeterminate: indeterminate ?? defaultIndeterminate ?? false });
  const [isClickFromMouse, setIsClickFromMouse] = useState(false);

  useEffect(() => { inputRef.current.indeterminate = !!isIndeterminate; }, []);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {

    const isInputClick = inputRef.current?.contains(e.target);
    const isLabelClick = labelRef.current?.contains(e.target);
    const isRootClick = !isLabelClick && !isInputClick;

    const hasId = id != null;
    const isLabelClickAndForwardedToInput = isLabelClick && hasId;

    // https://github.com/Semantic-Org/Semantic-UI-React/pull/3351
    if (!isLabelClickAndForwardedToInput) {
      onClick?.call(null, e, { ...props, checked: !isChecked, indeterminate: !!isIndeterminate });
    }

    if (isClickFromMouse) {
      setIsClickFromMouse(false);

      if (isLabelClick && !hasId) handleChange(e);

      // Changes should be triggered for the slider variation
      if (isRootClick) handleChange(e);

      // To prevent two clicks from being fired from the component we have to stop the propagation
      // from the "input" click: https://github.com/Semantic-Org/Semantic-UI-React/issues/3433
      if (isLabelClick && hasId) e.stopPropagation();
    }
  };

  const handleChange = (e: React.MouseEvent<HTMLInputElement>) => {

    if (!(!disabled && !readOnly && !(radio && isChecked))) return;

    onChange?.call(null, e, { ...props, checked: !isChecked, indeterminate: false });
    setState({ isChecked: !checked, isIndeterminate: false });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {

    onMouseDown?.call(null, e, { ...props, checked: !!isChecked, indeterminate: !!isIndeterminate });

    if (!e.defaultPrevented) {
      inputRef.current?.focus();
    }

    // Heads up!
    // We need to call "preventDefault" to keep element focused.
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsClickFromMouse(true);
    onMouseUp?.call(null, e, { ...props, checked: !!isChecked, indeterminate: !!isIndeterminate });
  };

  // auto apply fitted class to compact white space when there is no label https://semantic-ui.com/modules/checkbox.html#fitted
  // tslint:disable-next-line: object-shorthand-properties-first
  const classes = getClassName('ui', { checked: isChecked, disabled, indeterminate: isIndeterminate, fitted: label == null, radio, 'read-only': readOnly, slider, toggle }, 'checkbox', className);
  // const ElementType = getElementType(Checkbox, props);
  const [htmlInputProps, rest] = partitionHTMLProps(unhandled, { htmlProps: htmlInputAttrs });

  // Heads Up!
  // Do not remove empty labels, they are required by SUI CSS
  const labelElement = createHTMLLabel(label, { defaultProps: { htmlFor: id, ref: labelRef }, autoGenerateKey: false }) || <label htmlFor={id} ref={labelRef} />;

  return (
    <ElementType {...rest} className={classes} onClick={handleClick} onChange={handleChange} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <input
        ref={inputRef}
        {...htmlInputProps}
        checked={isChecked}
        className='hidden'
        disabled={disabled}
        id={id}
        name={name}
        readOnly
        tabIndex={tabIndex != null ? tabIndex : disabled ? -1 : 0}
        type={type}
        value={value}
      />
      {labelElement}
    </ElementType>
  );
};

Checkbox.defaultProps = { type: 'checkbox' };
