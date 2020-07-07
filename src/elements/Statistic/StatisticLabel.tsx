import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

interface StatisticLabelProps extends StrictStatisticLabelProps {
  [key: string]: any;
}

interface StrictStatisticLabelProps {
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
 * A statistic can contain a label to help provide context for the presented value.
 */
const StatisticLabel: FCX<StatisticLabelProps> = props => ChildrenOrContent('label', props);

StatisticLabel.create = createShorthandFactory(StatisticLabel, (content) => ({ content }));

export { StatisticLabel, StatisticLabelProps, StrictStatisticLabelProps };
