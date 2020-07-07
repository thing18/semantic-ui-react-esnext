import React, { Children } from 'react';

import { SemanticCOLORS, SemanticFLOATS, SemanticShorthandContent, SemanticTEXTALIGNMENTS, Use, getClassName } from '../../lib';
import { SegmentGroup } from './SegmentGroup';
import { SegmentInline } from './SegmentInline';

type SegmentSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';

interface StrictSegmentProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Attach segment to other content, like a header. */
  attached?: boolean | 'top' | 'bottom';

  /** A basic segment has no special formatting. */
  basic?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** A segment can be circular. */
  circular?: boolean;

  /** Additional classes. */
  className?: string;

  /** A segment can clear floated content. */
  clearing?: boolean;

  /** Segment can be colored. */
  color?: SemanticCOLORS;

  /** A segment may take up only as much space as is necessary. */
  compact?: boolean;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A segment may show its content is disabled. */
  disabled?: boolean;

  /** Segment content can be floated to the left or right. */
  floated?: SemanticFLOATS;

  /** A segment can have its colors inverted for contrast. */
  inverted?: boolean;

  /** A segment may show its content is being loaded. */
  loading?: boolean;

  /** A segment can increase its padding. */
  padded?: boolean | 'very';

  /** A segment can be used to reserve space for conditionally displayed content. */
  placeholder?: boolean;

  /** Formatted to look like a pile of pages. */
  piled?: boolean;

  /** A segment may be formatted to raise above the page. */
  raised?: boolean;

  /** A segment can be formatted to appear less noticeable. */
  secondary?: boolean;

  /** A segment can have different sizes. */
  size?: SegmentSizeProp;

  /** Formatted to show it contains multiple pages. */
  stacked?: boolean;

  /** A segment can be formatted to appear even less noticeable. */
  tertiary?: boolean;

  /** Formats content to be aligned as part of a vertical group. */
  textAlign?: SemanticTEXTALIGNMENTS;

  /** Formats content to be aligned vertically. */
  vertical?: boolean;
}

interface SegmentProps extends StrictSegmentProps {
  [key: string]: any;
}

interface CSegment extends React.FC<SegmentProps> {
  Group: typeof SegmentGroup;
  Inline: typeof SegmentInline;
}

/**
 * A segment is used to create a grouping of related content.
 */
const Segment: CSegment = ({ as = 'div', attached, basic, children, circular, className, clearing, color, compact, content, disabled, floated, inverted, loading, placeholder, padded, piled, raised, secondary, size, stacked, tertiary, textAlign, vertical, ...rest }) => {

  const classes = getClassName('ui', color, size, { basic, circular, clearing, compact, disabled, inverted, loading, placeholder, piled, raised, secondary, stacked, tertiary, vertical }, [Use.KeyOrValueKey, { attached, padded }], [Use.TextAlign, textAlign], [Use.ValueKey, { floated }], 'segment', className);

  const ElementType = !!rest.href ? 'a' : as;

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

Segment.Group = SegmentGroup;
Segment.Inline = SegmentInline;

export { Segment, SegmentSizeProp, SegmentProps, StrictSegmentProps };
