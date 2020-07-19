import React, { useState, useEffect } from 'react';

import { SemanticShorthandItem } from '../../lib';
import { Grid, GridColumn, Menu, GridProps, MenuProps } from '..';
import { TabPane, TabPaneProps } from './TabPane';

export interface TabProps extends StrictTabProps {
  [key: string]: any;
}

export interface StrictTabProps {
  /** An element type to render as (string or function). */
  as?: any;

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

  const { as: ElementType = 'div', activeIndex, defaultActiveIndex, onTabChange, menu, panes, menuPosition, renderActiveOnly, gird, ...rest } = props;

  const [__activeIndex, __setActiveIndex] = useState(Math.max(Number(activeIndex ?? defaultActiveIndex ?? 0)));

  useEffect(
    () => { __setActiveIndex(Number(activeIndex)); },
    [activeIndex],
  );

  const handleItemClick = (e: any, { index }: TabPaneProps) => {

    onTabChange?.call(null, e, { ...props, activeIndex: index });
    __setActiveIndex(index);
  };

  const _menu = renderMenu(props, __activeIndex, handleItemClick);
  if (!_menu) return null;

  if (_menu.props.vertical) {
    return <ElementType {...rest}>{renderVertical(props, __activeIndex, _menu)}</ElementType>;
  }

  return (
    <ElementType {...rest}>
      {_menu.props.attached !== 'bottom' && _menu}
      {renderItems(props, __activeIndex)}
      {_menu.props.attached === 'bottom' && _menu}
    </ElementType>
  );
};

Tab.defaultProps = { grid: { paneWidth: 12, tabWidth: 4 }, menu: { attached: true, tabular: true }, renderActiveOnly: true };
Tab.Pane = TabPane;

const renderVertical = (props: TabProps, activeIndex: number, menu: any) => {

  const { paneWidth = 12, tabWidth = 4, ...gridProps } = props.grid ?? {};
  const position = props.menuPosition || (menu.props.tabular === 'right' && 'right') || 'left';

  return (
    <Grid {...gridProps}>
      {position === 'left' && GridColumn.create({ width: tabWidth, children: menu }, { autoGenerateKey: false })}
      {GridColumn.create({ width: paneWidth, children: renderItems(props, activeIndex), stretched: true }, { autoGenerateKey: false })}
      {position === 'right' && GridColumn.create({ width: tabWidth, children: menu }, { autoGenerateKey: false })}
    </Grid>
  );
};

const renderMenu = ({ panes, menuPosition, menu }: TabProps, activeIndex: number, onItemClick: any) => {

  const { attached = true, tabular = true, ...menuprops } = menu ?? {};

  if (menuprops.tabular === true && menuPosition === 'right') {
    menuprops.tabular = 'right';
  }

  return Menu.create({ attached, tabular, ...menuprops }, {
    autoGenerateKey: false,
    overrideProps: {
      onItemClick,
      activeIndex,
      items: (panes ?? []).map(x => x.menuItem),
    },
  });
};

const renderItems = (props: TabProps, activeIndex: number) => {

  if (!props.panes) return null;

  if (props.renderActiveOnly ?? true) {

    const pane = props.panes[activeIndex];
    if (!pane) return null;

    return pane.render ? pane.render(props) : TabPane.create(pane.pane, { overrideProps: { active: true } });
  }

  return props.panes.map(({ pane }, index) => TabPane.create(pane, { overrideProps: { active: index === activeIndex } }));
};

export { Tab };
