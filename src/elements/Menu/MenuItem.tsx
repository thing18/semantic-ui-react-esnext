import React, { Children } from 'react';

import { SemanticCOLORS, SemanticShorthandContent, SemanticShorthandItem, createShorthandFactory, FCX, getClassName, Use } from '../../lib';
import { Icon, IconProps } from '..';

export interface MenuItemProps extends StrictMenuItemProps {
  [key: string]: any;
}

export interface StrictMenuItemProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A menu item can be active. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Additional colors can be specified. */
  color?: SemanticCOLORS;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A menu item can be disabled. */
  disabled?: boolean;

  /** A menu item or menu can remove element padding, vertically or horizontally. */
  fitted?: boolean | 'horizontally' | 'vertically';

  /** A menu item may include a header or may itself be a header. */
  header?: boolean;

  /** MenuItem can be only icon. */
  icon?: boolean | SemanticShorthandItem<IconProps>;

  /** MenuItem index inside Menu. */
  index?: number;

  /** A menu item can be link. */
  link?: boolean;

  /** Internal name of the MenuItem. */
  name?: string;

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => void;

  /** A menu item can take left or right position. */
  position?: 'left' | 'right';
}

/**
 * A menu can contain an item.
 */
export const MenuItem: FCX<MenuItemProps> = (props) => {

  const { as = 'div', active, children, className, color, content, disabled, fitted, header, icon, link, name, onClick, position, ...rest } = props;

  const handleClick = (e: any) => !disabled && onClick?.call(null, e, props);

  // tslint:disable-next-line: object-shorthand-properties-first
  const classes = getClassName(color, position, [Use.Key, { active, disabledicon: icon === true || (icon && !(name || content)), header, link }], [Use.KeyOrValueKey, { fitted }], 'item', className);

  const ElementType = !!onClick ? 'a' : as;

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes} onClick={handleClick}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {content == null ? name /* _.startCase(name) */ : content}
    </ElementType>
  );
};

MenuItem.create = createShorthandFactory(MenuItem, (val) => ({ content: val, name: val }));
