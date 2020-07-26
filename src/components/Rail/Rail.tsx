import React, { Children } from 'react';

import { SemanticFLOATS, SemanticShorthandContent, getClassName, Use, ChildrenOrContent } from '../../lib';

export interface RailProps extends StrictRailProps {
  [key: string]: any;
}

export interface StrictRailProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A rail can appear attached to the main viewport. */
  attached?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A rail can appear closer to the main viewport. */
  close?: boolean | 'very';

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A rail can create a division between itself and a container. */
  dividing?: boolean;

  /** A rail can attach itself to the inside of a container. */
  internal?: boolean;

  /** A rail can be presented on the left or right side of a container. */
  position: SemanticFLOATS;

  /** A rail can have different sizes. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';
}

/**
 * A rail is used to show accompanying content outside the boundaries of the main view of a site.
 */
export const Rail: React.FC<RailProps> = ({ attached, close, dividing, internal, position, size, ...props }) =>
  ChildrenOrContent(props, 'ui', position, size, { attached, dividing, internal }, [Use.KeyOrValueKey, { close }], 'rail');
