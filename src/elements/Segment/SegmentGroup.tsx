import React, { Children } from 'react';

import { SemanticShorthandContent, Use, getClassName } from '../../lib';
import { SegmentSizeProp } from './Segment';

interface StrictSegmentGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A segment may take up only as much space as is necessary. */
  compact?: boolean;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Formats content to be aligned horizontally. */
  horizontal?: boolean;

  /** Formatted to look like a pile of pages. */
  piled?: boolean;

  /** A segment group may be formatted to raise above the page. */
  raised?: boolean;

  /** A segment group can have different sizes. */
  size?: SegmentSizeProp;

  /** Formatted to show it contains multiple pages. */
  stacked?: boolean;
}

interface SegmentGroupProps extends StrictSegmentGroupProps {
  [key: string]: any;
}

/**
 * A group of segments can be formatted to appear together.
 */
const SegmentGroup: React.FC<SegmentGroupProps> = ({ as, children, className, compact, content, horizontal, piled, raised, size, stacked, ...rest }) => {

  const classes = getClassName('ui', size, { compact, horizontal, piled, raised, stacked }, 'segments', className);

  const ElementType = as || ' div';

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

export { SegmentGroup, SegmentGroupProps, StrictSegmentGroupProps };
