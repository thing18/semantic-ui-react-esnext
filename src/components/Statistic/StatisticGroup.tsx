import React, { Children } from 'react';

import { SemanticCOLORS, SemanticShorthandCollection, SemanticShorthandContent, SemanticWIDTHS, getClassName, Use } from '../../lib';
import { Statistic, StatisticProps, StatisticSizeProp } from './Statistic';

interface StatisticGroupProps extends StrictStatisticGroupProps {
  [key: string]: any;
}

interface StrictStatisticGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A statistic group can be formatted to be different colors. */
  color?: SemanticCOLORS;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A statistic group can present its measurement horizontally. */
  horizontal?: boolean;

  /** A statistic group can present its measurement horizontally. */
  inverted?: boolean;

  /** Array of props for Statistic. */
  items?: SemanticShorthandCollection<StatisticProps>;

  /** A statistic group can vary in size. */
  size?: StatisticSizeProp;

  /** A statistic group can have its items divided evenly. */
  widths?: SemanticWIDTHS;
}

/**
 * A group of statistics.
 */
const StatisticGroup: React.FC<StrictStatisticGroupProps> = ({ as: ElementType = 'div', children, className, color, content, horizontal, inverted, items, size, widths, ...rest }) => {

  const classes = getClassName('ui', color, size, { horizontal, inverted }, [Use.Width, widths], 'statistics', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }
  if (content != null) {
    return (
      <ElementType {...rest} className={classes}>
        {content}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {items && items.map(item => Statistic.create(item))}
    </ElementType>
  );
};

export { StatisticGroup, StatisticGroupProps, StrictStatisticGroupProps };
