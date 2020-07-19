import React, { Children } from 'react';

import { SemanticShorthandContent, FCX, getClassName, createShorthandFactory } from '../../lib';
import { Segment } from '..';

export interface TabPaneProps extends StrictTabPaneProps {
  [key: string]: any;
}

export interface StrictTabPaneProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A tab pane can be active. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A Tab.Pane can display a loading indicator. */
  loading?: boolean;
}

/**
 * A tab pane holds the content of a tab.
 */
const TabPane: FCX<TabPaneProps> = ({ as: ElementType = Segment, active = true, children, className, content, loading, ...rest }) => {

  const classes = getClassName({ active, loading }, 'tab', className);

  const calculatedDefaultProps = (ElementType === Segment) ? { attached: 'bottom' } : {};

  return (
    <ElementType {...calculatedDefaultProps} {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

TabPane.defaultProps = { as: Segment, active: true };
TabPane.create = createShorthandFactory(TabPane, (content) => ({ content }));

export { TabPane };
