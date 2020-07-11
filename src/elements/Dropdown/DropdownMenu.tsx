import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface DropdownMenuProps extends StrictDropdownMenuProps {
  [key: string]: any;
}

export interface StrictDropdownMenuProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A dropdown menu can open to the left or to the right. */
  direction?: 'left' | 'right';

  /** Whether or not the dropdown menu is displayed. */
  open?: boolean;

  /** A dropdown menu can scroll. */
  scrolling?: boolean;
}

/**
 * A dropdown menu can contain a menu.
 */
// tslint:disable-next-line: object-shorthand-properties-first
export const DropdownMenu: React.FC<DropdownMenuProps> = ({ direction, open, scrolling, ...rest }) => ChildrenOrContent(rest, direction, { visible: open, scrolling }, 'menu transition');
