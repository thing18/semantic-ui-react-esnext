import PropTypes from 'prop-types';
import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Segment } from './Segment';
import { SegmentGroup } from './SegmentGroup';
import { SegmentInline } from './SegmentInline';

SegmentInline.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

SegmentGroup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A segment may take up only as much space as is necessary. */
    compact: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Formats content to be aligned horizontally. */
    horizontal: PropTypes.bool,

    /** Formatted to look like a pile of pages. */
    piled: PropTypes.bool,

    /** A segment group may be formatted to raise above the page. */
    raised: PropTypes.bool,

    /** A segment group can have different sizes. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')) as any,

    /** Formatted to show it contains multiple pages. */
    stacked: PropTypes.bool,
};

Segment.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Attach segment to other content, like a header. */
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]) as any,

    /** A basic segment has no special formatting. */
    basic: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** A segment can be circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** A segment can clear floated content. */
    clearing: PropTypes.bool,

    /** Segment can be colored. */
    color: PropTypes.oneOf(SUI.COLORS as any) as any,

    /** A segment may take up only as much space as is necessary. */
    compact: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A segment may show its content is disabled. */
    disabled: PropTypes.bool,

    /** Segment content can be floated to the left or right. */
    floated: PropTypes.oneOf(SUI.FLOATS as any) as any,

    /** A segment can have its colors inverted for contrast. */
    inverted: PropTypes.bool,

    /** A segment may show its content is being loaded. */
    loading: PropTypes.bool,

    /** A segment can increase its padding. */
    padded: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

    /** A segment can be used to reserve space for conditionally displayed content. */
    placeholder: PropTypes.bool,

    /** Formatted to look like a pile of pages. */
    piled: PropTypes.bool,

    /** A segment may be formatted to raise above the page. */
    raised: PropTypes.bool,

    /** A segment can be formatted to appear less noticeable. */
    secondary: PropTypes.bool,

    /** A segment can have different sizes. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')) as any,

    /** Formatted to show it contains multiple pages. */
    stacked: PropTypes.bool,

    /** A segment can be formatted to appear even less noticeable. */
    tertiary: PropTypes.bool,

    /** Formats content to be aligned as part of a vertical group. */
    textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')) as any,

    /** Formats content to be aligned vertically. */
    vertical: PropTypes.bool,
};

export { };
