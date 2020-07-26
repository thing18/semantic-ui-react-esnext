import React from 'react';
import { ChildrenOrContent } from '../../lib';

type SEMANTICLineLength = 'full' | 'very long' | 'long' | 'medium' | 'short' | 'very short';

export interface StrictPlaceholderLineProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Additional classes. */
  className?: string;

  /** A line can specify how long its contents should appear. */
  length?: SEMANTICLineLength;
}

export interface PlaceholderLineProps extends StrictPlaceholderLineProps {
  [key: string]: any;
}

/**
 * A placeholder can contain have lines of text.
 */
export const PlaceholderLine: React.FC<PlaceholderLineProps> = ({ length, ...props }) =>
  ChildrenOrContent(props, 'line', length);
