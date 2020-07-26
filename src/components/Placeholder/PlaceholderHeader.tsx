import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface StrictPlaceholderHeaderProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A placeholder can contain an image. */
  image?: boolean;
}

export interface PlaceholderHeaderProps extends StrictPlaceholderHeaderProps {
  [key: string]: any;
}

/**
 * A placeholder can contain a header.
 */
export const PlaceholderHeader: React.FC<PlaceholderHeaderProps> = ({ image, ...props }) =>
  ChildrenOrContent(props, { image }, 'header');
