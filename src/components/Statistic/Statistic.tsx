import React, { Children } from 'react';

import { SemanticCOLORS, SemanticFLOATS, SemanticShorthandContent, createShorthandFactory, FCX, getClassName, Use } from '../../lib';
import { StatisticGroup } from './StatisticGroup';
import { StatisticLabel } from './StatisticLabel';
import { StatisticValue } from './StatisticValue';

type StatisticSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'huge';

interface StatisticProps extends StrictStatisticProps {
  [key: string]: any;
}

interface StrictStatisticProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A statistic can be formatted to be different colors. */
  color?: SemanticCOLORS;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A statistic can sit to the left or right of other content. */
  floated?: SemanticFLOATS;

  /** A statistic can present its measurement horizontally. */
  horizontal?: boolean;

  /** A statistic can be formatted to fit on a dark background. */
  inverted?: boolean;

  /** Label content of the Statistic. */
  label?: SemanticShorthandContent;

  /** A statistic can vary in size. */
  size?: StatisticSizeProp;

  /** Format the StatisticValue with smaller font size to fit nicely beside number values. */
  text?: boolean;

  /** Value content of the Statistic. */
  value?: SemanticShorthandContent;
}

interface CStatistic extends FCX<StatisticProps> {
  Group: typeof StatisticGroup;
  Label: typeof StatisticLabel;
  Value: typeof StatisticValue;
}

/**
 * A statistic emphasizes the current value of an attribute.
 */
const Statistic: CStatistic = ({ as, children, className, color, content, floated, horizontal, inverted, label, size, text, value, ...rest }) => {

  const classes = getClassName('ui', color, size, [Use.ValueKey, { floated }], { horizontal, inverted }, 'statistic', className);

  const ElementType = !!rest.href ? 'a' : (as || 'div');

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
      {StatisticValue.create(value, { defaultProps: { text }, autoGenerateKey: false })}
      {StatisticLabel.create(label, { autoGenerateKey: false })}
    </ElementType>
  );
};

Statistic.Group = StatisticGroup;
Statistic.Label = StatisticLabel;
Statistic.Value = StatisticValue;

Statistic.create = createShorthandFactory(Statistic, (content) => ({ content }));

export { Statistic, StatisticSizeProp, StatisticProps, StrictStatisticProps };
