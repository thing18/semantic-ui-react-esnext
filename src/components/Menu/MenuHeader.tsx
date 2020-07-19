import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface MenuHeaderProps extends StrictMenuHeaderProps {
  [key: string]: any;
}

export interface StrictMenuHeaderProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

/**
 * A menu item may include a header or may itself be a header.
 */
export const MenuHeader: React.FC<MenuHeaderProps> = (props) => ChildrenOrContent(props, 'header');
