import React from 'react';

import { getClassName, Use } from '../../lib';

interface StrictPlaceholderImageProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Additional classes. */
  className?: string;

  /** An image can modify size correctly with responsive styles. */
  square?: boolean;

  /** An image can modify size correctly with responsive styles. */
  rectangular?: boolean;
}

interface PlaceholderImageProps extends StrictPlaceholderImageProps {
  [key: string]: any;
}

/**
 * A placeholder can contain an image.
 */
const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ as, className, square, rectangular, ...rest }) => {

  const classes = getClassName([Use.Key, { square, rectangular }], 'image', className);

  const ElementType = as || 'div';

  return <ElementType {...rest} className={classes} />;
};

export { PlaceholderImage, PlaceholderImageProps, StrictPlaceholderImageProps };
