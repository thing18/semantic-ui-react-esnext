import React from 'react';
import { getClassName } from '../../lib';

type SEMANTICLineLength = 'full' | 'very long' | 'long' | 'medium' | 'short' | 'very short';

interface StrictPlaceholderLineProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Additional classes. */
  className?: string;

  /** A line can specify how long its contents should appear. */
  length?: SEMANTICLineLength;
}

interface PlaceholderLineProps extends StrictPlaceholderLineProps {
  [key: string]: any;
}

/**
 * A placeholder can contain have lines of text.
 */
const PlaceholderLine: React.FC<PlaceholderLineProps> = ({ as = 'div', className, length, ...rest }) => {

  const classes = getClassName('line', length, className);

  const ElementType = !!rest.href ? 'a' : as;

  return <ElementType {...rest} className={classes} />;
};

export { PlaceholderLine, PlaceholderLineProps, StrictPlaceholderLineProps, SEMANTICLineLength };
