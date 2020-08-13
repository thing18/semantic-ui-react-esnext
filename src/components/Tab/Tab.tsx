import React, { useState, useEffect } from 'react';

import { SemanticShorthandItem } from '../../lib';
import { Grid, GridColumn, GridProps } from '../Grid';
import { Menu, MenuProps } from '../Menu';
import { TabPane, TabPaneProps } from './TabPane';

export interface TabProps extends StrictTabProps {
  [key: string]: any;
}

export interface StrictTabProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** The initial activeIndex. */
  defaultActiveIndex?: number | string;

  /** Index of the currently active tab. */
  activeIndex?: number | string;

  /** Shorthand props for the Menu. */
  menu?: MenuProps;

  /** Align vertical menu */
  menuPosition?: 'left' | 'right';

  /** Shorthand props for the Grid. */
  grid?: GridProps;

  /**
   * Called on tab change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - The proposed new Tab.Pane.
   * @param {object} data.activeIndex - The new proposed activeIndex.
   * @param {object} data.panes - Props of the new proposed active pane.
   */
  onTabChange?: (event: React.MouseEvent<HTMLDivElement>, data: TabProps) => void;

  /**
   * Array of objects describing each Menu.Item and Tab.Pane:
   * {
   *   menuItem: 'Home',
   *   render: () => <Tab.Pane>Welcome!</Tab.Pane>,
   * }
   * or
   * {
   *   menuItem: 'Home',
   *   pane: 'Welcome',
   * }
   */
  panes?: {
    pane?: SemanticShorthandItem<TabPaneProps>;
    menuItem?: any;
    render?: React.FC<TabPaneProps>;
  }[];

  /** A Tab can render only active pane. */
  renderActiveOnly?: boolean;
}

interface CTab extends React.FC<TabProps> {
  Pane: typeof TabPane;
}

/**
 * A Tab is a hidden section of content activated by a Menu.
 * @see Menu
 * @see Segment
 */
const Tab: CTab = props => {

  const { as: ElementType = 'div', grid, activeIndex, defaultActiveIndex, onTabChange, menu, panes, menuPosition, renderActiveOnly, gird, ...rest } = props;

  const [state, setState] = useState(0);

  useEffect(
    () => {
      setState(Number(activeIndex ?? defaultActiveIndex ?? 0));
    },
    [activeIndex],
  );

  const handleItemClick = (e: any, { index }: TabPaneProps) => {
    onTabChange?.call(null, e, { ...props, activeIndex: index });
    setState(index);
  };

  const __menu = __renderMenu(props, state, handleItemClick);
  if (__menu.props.vertical) return <ElementType {...rest}>{__renderVerticalMenu(props, state, __menu)}</ElementType>;

  return (
    <ElementType {...rest}>
      {__menu.props.attached !== 'bottom' && __menu}
      {__renderItems(props, state)}
      {__menu.props.attached === 'bottom' && __menu}
    </ElementType>
  );
};

Tab.defaultProps = { grid: { paneWidth: 12, tabWidth: 4 }, menu: { attached: true, tabular: true }, renderActiveOnly: true };
Tab.Pane = TabPane;

const __renderVerticalMenu = (props: TabProps, activeIndex: number, menu: any) => {

  const { paneWidth = 12, tabWidth = 4, ...gridProps } = props.grid ?? {};
  const position = props.menuPosition || (menu.props.tabular === 'right' && 'right') || 'left';

  return (
    <Grid {...gridProps}>
      {position === 'left' && GridColumn.create({ width: tabWidth, children: menu }, { autoGenerateKey: false })}
      {GridColumn.create({ width: paneWidth, children: __renderItems(props, activeIndex), stretched: true }, { autoGenerateKey: false })}
      {position === 'right' && GridColumn.create({ width: tabWidth, children: menu }, { autoGenerateKey: false })}
    </Grid>
  );
};

const __renderMenu = ({ panes, menuPosition, menu = {} }: TabProps, activeIndex: number, onItemClick: any) => {

  if (menu.tabular === true && menuPosition === 'right') {
    menu.tabular = 'right';
  }

  return Menu.create(menu, {
    autoGenerateKey: false,
    overrideProps: {
      onItemClick,
      activeIndex,
      items: (panes ?? []).map(x => x.menuItem),
    },
  });
};

const __renderItems = (props: TabProps, activeIndex: number) => {

  const { panes, renderActiveOnly } = props;

  if (!Array.isArray(panes)) return null;

  if (renderActiveOnly) return panes[activeIndex]?.render?.call(null, props);

  return panes.map(({ pane }, index) => TabPane.create(pane, { overrideProps: { active: index === activeIndex } }));
};

export { Tab };
