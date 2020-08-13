import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface DimmerDimmableProps extends StrictDimmerDimmableProps {
  [key: string]: any;
}

export interface StrictDimmerDimmableProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** A dimmable element can blur its contents. */
  blurring?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Controls whether or not the dim is displayed. */
  dimmed?: boolean;
}

/**
 * A dimmable sub-component for Dimmer.
 */
export const DimmerDimmable: React.FC<DimmerDimmableProps> = ({ blurring, dimmed, ...props }) =>
  ChildrenOrContent(props, { blurring, dimmed }, 'dimmable');
