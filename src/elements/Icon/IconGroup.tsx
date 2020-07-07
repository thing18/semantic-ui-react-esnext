import React from 'react';

import { SemanticShorthandContent, getClassName, ChildrenOrContent } from '../../lib';
import { IconSizeProp } from './Icon';

export interface IconGroupProps extends StrictIconGroupProps {
  [key: string]: any;
}

export interface StrictIconGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Size of the icon group. */
  size?: IconSizeProp;
}

/**
 * Several icons can be used together as a group.
 */
export const IconGroup: React.FC<IconGroupProps> = ({ as = 'i', size, ...rest }) => ChildrenOrContent([size, 'icons'], { as, ...rest });

IconGroup.defaultProps = { as: 'i' };
