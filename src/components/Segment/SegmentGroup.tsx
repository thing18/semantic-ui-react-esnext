import React, { Children } from 'react';

import { SemanticShorthandContent, Use, getClassName, ChildrenOrContent } from '../../lib';
import { SegmentSizeProp } from './Segment';

export interface StrictSegmentGroupProps {
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

export interface SegmentGroupProps extends StrictSegmentGroupProps {
  [key: string]: any;
}

/**
 * A group of segments can be formatted to appear together.
 */
export const SegmentGroup: React.FC<SegmentGroupProps> = ({ compact, horizontal, piled, raised, size, stacked, ...props }) =>
  ChildrenOrContent(props, 'ui', size, { compact, horizontal, piled, raised, stacked }, 'segments');
