import React, { Children } from 'react';

import { SemanticShorthandContent, getClassName } from '../../lib';

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
export const DropdownMenu: React.FC<DropdownMenuProps> = ({ as: ElementType = 'div', children, className, content, direction, open, scrolling, ...rest }) => {

  // tslint:disable-next-line: object-shorthand-properties-first
  const classes = getClassName(direction, { visible: open, scrolling }, 'menu transition', className);

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

DropdownMenu.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A dropdown menu can open to the left or to the right. */
  direction: PropTypes.oneOf(['left', 'right']),

  /** Whether or not the dropdown menu is displayed. */
  open: PropTypes.bool,

  /** A dropdown menu can scroll. */
  scrolling: PropTypes.bool,
};
