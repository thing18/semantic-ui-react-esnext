import React, { forwardRef } from 'react';
import { FCX } from '../../lib';

export interface TextAreaProps extends StrictTextAreaProps {
  [key: string]: any;
}

export interface StrictTextAreaProps {
  /** An element type to render as (string or function). */
  as?: any;

  /**
   * Called on change.
   *
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onChange?: (event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void;

  /**
   * Called on input.
   *
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onInput?: (event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void;

  /** Indicates row count for a TextArea. */
  rows?: number | string;

  /** The value of the textarea. */
  value?: number | string;
}

/**
 * A TextArea can be used to allow for extended user input.
 * @see Form
 */
export const TextArea: React.FC<TextAreaProps> = forwardRef<any, TextAreaProps>((props, ref) => {

  const { as: ElementType = 'textarea', onChange, onInput, rows = 3, value, ...rest } = props;

  const handleChange = onChange ? (e: any) => onChange(e, { ...props, value: e.target.value }) : null;

  const handleInput = onInput ? (e: any) => onInput(e, { ...props, value: e.target.value }) : null;

  return <ElementType {...rest} onChange={handleChange} onInput={handleInput} rows={rows} value={value} ref={ref} />;
});

TextArea.defaultProps = { as: 'textarea', rows: 3 };
