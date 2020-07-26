import React from 'react';

import { SemanticSIZES, SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface StrictImageGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A group of images can be formatted to have the same size. */
  size?: SemanticSIZES;
}

export interface ImageGroupProps extends StrictImageGroupProps {
  [key: string]: any;
}

/**
 * A group of images.
 */
export const ImageGroup: React.FC<ImageGroupProps> = ({ className, size, ...props }) => ChildrenOrContent(props, 'ui', size, className, 'images');
