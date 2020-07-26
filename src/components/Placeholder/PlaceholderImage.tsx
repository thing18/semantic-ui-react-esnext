import React from 'react';

import { ChildrenOrContent } from '../../lib';

export interface StrictPlaceholderImageProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Additional classes. */
  className?: string;

  /** An image can modify size correctly with responsive styles. */
  square?: boolean;

  /** An image can modify size correctly with responsive styles. */
  rectangular?: boolean;
}

export interface PlaceholderImageProps extends StrictPlaceholderImageProps {
  [key: string]: any;
}

/**
 * A placeholder can contain an image.
 */
export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ square, rectangular, ...props }) =>
  ChildrenOrContent(props, { square, rectangular }, 'image');
