import React, { useState, Children, useEffect } from 'react';

import { SemanticCOLORS, SemanticShorthandCollection, SemanticWIDTHS, createShorthandFactory, FCX, Use, getClassName } from '../../lib';
import { MenuHeader } from './MenuHeader';
import { MenuItem, MenuItemProps } from './MenuItem';
import { MenuMenu } from './MenuMenu';

export interface MenuProps extends StrictMenuProps {
  [key: string]: any;
}

export interface StrictMenuProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Index of the currently active item. */
  activeIndex?: number | string;

  /** A menu may be attached to other content segments. */
  attached?: boolean | 'bottom' | 'top';

  /** A menu item or menu can have no borders. */
  borderless?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Additional colors can be specified. */
  color?: SemanticCOLORS;

  /** A menu can take up only the space necessary to fit its content. */
  compact?: boolean;

  /** Initial activeIndex value. */
  defaultActiveIndex?: number | string;

  /** A menu can be fixed to a side of its context. */
  fixed?: 'left' | 'right' | 'bottom' | 'top';

  /** A menu can be floated. */
  floated?: boolean | 'right';

  /** A vertical menu may take the size of its container. */
  fluid?: boolean;

  /** A menu may have labeled icons. */
  icon?: boolean | 'labeled';

  /** A menu may have its colors inverted to show greater contrast. */
  inverted?: boolean;

  /** Shorthand array of props for Menu. */
  items?: SemanticShorthandCollection<MenuItemProps>;

  /**
   * onClick handler for MenuItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => void;

  /** A pagination menu is specially formatted to present links to pages of content. */
  pagination?: boolean;

  /** A menu can point to show its relationship to nearby content. */
  pointing?: boolean;

  /** A menu can adjust its appearance to de-emphasize its contents. */
  secondary?: boolean;

  /** A menu can vary in size. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'huge' | 'massive';

  /** A menu can stack at mobile resolutions. */
  stackable?: boolean;

  /** A menu can be formatted to show tabs of information. */
  tabular?: boolean | 'right';

  /** A menu can be formatted for text content. */
  text?: boolean;

  /** A vertical menu displays elements vertically. */
  vertical?: boolean;

  /** A menu can have its items divided evenly. */
  widths?: SemanticWIDTHS;
}

interface CMenu extends FCX<MenuProps> {
  Header: typeof MenuHeader;
  Item: typeof MenuItem;
  Menu: typeof MenuMenu;
}

/**
 * A menu displays grouped navigation actions.
 * @see Dropdown
 */
export const Menu: CMenu = ({ as: ElementType = 'div', onItemClick, activeIndex, defaultActiveIndex, items, attached, borderless, children, className, color, compact, fixed, floated, fluid, icon, inverted, pagination, pointing, secondary, size, stackable, tabular, text, vertical, widths, ...rest }) => {

  const [__activeIndex, __setActiveIndex] = useState(Number(activeIndex ?? defaultActiveIndex ?? -1));

  useEffect(
    () => { __setActiveIndex(Number(activeIndex)); },
    [activeIndex],
  );

  const classes = getClassName('ui', color, size, { borderless, compact, fluid, inverted, pagination, pointing, secondary, stackable, text, vertical }, [Use.KeyOrValueKey, { attached, floated, icon, tabular }], [Use.ValueKey, { fixed }], [Use.Width, widths, 'item'], className, 'menu');

  const handleItemOverrides = (pprops: MenuProps) => ({
    onClick: (e: any, itemProps: MenuItemProps) => {

      __setActiveIndex(itemProps.index as number);

      pprops.onClick?.call(null, e, itemProps);
      onItemClick?.call(null, e, itemProps);
    },
  });

  return (
    <ElementType {...rest} className={classes}>
      {
        Children.count(children)
          ? children
          : Array.isArray(items)
            ? items.map((item, index) => MenuItem.create(item, { defaultProps: { index, active: __activeIndex === index }, overrideProps: handleItemOverrides }))
            : null
      }
    </ElementType>
  );
};

Menu.create = createShorthandFactory(Menu, (items) => ({ items }));
Menu.Header = MenuHeader;
Menu.Item = MenuItem;
Menu.Menu = MenuMenu;
