import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface MenuMenuProps extends StrictMenuMenuProps {
  [key: string]: any;
}

export interface StrictMenuMenuProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A sub menu can take left or right position. */
  position?: 'left' | 'right';
}

/**
 * A menu can contain a sub menu.
 */
export const MenuMenu: React.FC<MenuMenuProps> = ({ position, ...props }) =>
  ChildrenOrContent(props, position, 'menu');
