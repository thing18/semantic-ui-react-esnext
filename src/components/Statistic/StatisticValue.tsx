import React, { Children } from 'react';

import { SemanticShorthandContent, createShorthandFactory, getClassName, FCX, ChildrenOrContent } from '../../lib';

interface StatisticValueProps extends StrictStatisticValueProps {
  [key: string]: any;
}

interface StrictStatisticValueProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Format the value with smaller font size to fit nicely beside number values. */
  text?: boolean;
}

/**
 * A statistic can contain a numeric, icon, image, or text value.
 */
const StatisticValue: FCX<StatisticValueProps> = ({ text, ...props }) =>
  ChildrenOrContent(props, { text }, 'value');

StatisticValue.create = createShorthandFactory(StatisticValue, (content) => ({ content }));

export { StatisticValue, StatisticValueProps, StrictStatisticValueProps };
