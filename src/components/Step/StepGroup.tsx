import React, { Children } from 'react';

import { SemanticSIZES, SemanticShorthandCollection, SemanticShorthandContent, Use, getClassName } from '../../lib';
import { Step, StepProps } from './Step';

interface StrictStepGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Steps can be attached to other elements. */
  attached?: boolean | 'bottom' | 'top';

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A fluid step takes up the width of its container. */
  fluid?: boolean;

  /** Shorthand array of props for Step. */
  items?: SemanticShorthandCollection<StepProps>;

  /** A step can show a ordered sequence of steps. */
  ordered?: boolean;

  /** Steps can have different sizes. */
  size?: Exclude<SemanticSIZES, 'medium'>;

  /** A step can stack vertically only on smaller screens. */
  stackable?: 'tablet';

  /** A step can prevent itself from stacking on mobile. */
  unstackable?: boolean;

  /** A step can be displayed stacked vertically. */
  vertical?: boolean;

  /** Steps can be divided evenly inside their parent. */
  widths?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight';
}

interface StepGroupProps extends StrictStepGroupProps {
  [key: string]: any;
}

/**
 * A set of steps.
 */
const StepGroup: React.FC<StepGroupProps> = ({ as: ElementType = 'div', attached, children, className, content, fluid, items, ordered, size, stackable, unstackable, vertical, widths, ...rest }) => {

  const classes = getClassName('ui', size, { fluid, ordered, unstackable, vertical }, [Use.KeyOrValueKey, { attached }], [Use.ValueKey, { stackable }], [Use.Width, widths], 'steps', className);

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
      {items && items.map(item => Step.create(item))}
    </ElementType>
  );
};

export { StepGroup, StepGroupProps, StrictStepGroupProps };
