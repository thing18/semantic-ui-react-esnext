import React from 'react';

import { StrictCheckboxProps, Checkbox } from '..';

export interface RadioProps extends StrictRadioProps {
  [key: string]: any;
}

export interface StrictRadioProps extends StrictCheckboxProps {
  /** Format to emphasize the current selection state. */
  slider?: boolean;

  /** Format to show an on or off choice. */
  toggle?: boolean;

  /** HTML input type, either checkbox or radio. */
  type?: 'checkbox' | 'radio';
}

/**
 * A Radio is sugar for <Checkbox radio />.
 * Useful for exclusive groups of sliders or toggles.
 * @see Checkbox
 * @see Form
 */
const Radio: React.FC<RadioProps> = props => {

  const { slider, toggle, type, ...rest } = { ...Radio.defaultProps, ...props };

  return <Checkbox {...rest} type={type} radio={!(slider || toggle) || undefined} slider={slider} toggle={toggle} />;
};

Radio.defaultProps = { type: 'radio' };

export { Radio };
