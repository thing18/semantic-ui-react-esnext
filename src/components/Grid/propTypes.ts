import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Grid } from './Grid';
import { GridColumn } from './GridColumn';
import { GridRow } from './GridRow';

GridRow.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A row can have its columns centered. */
    centered: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A grid row can be colored. */
    color: PropTypes.oneOf(SUI.COLORS) as any,

    /** Represents column count per line in Row. */
    columns: PropTypes.oneOf([...SUI.WIDTHS as any, 'equal']),

    /** A row can have dividers between its columns. */
    divided: PropTypes.bool,

    /** A row can appear only for a specific device, or screen sizes. */
    only: customPropTypes.multipleProp(SUI.VISIBILITY) as any,

    /** A row can specify that its columns should reverse order at different device sizes. */
    reversed: customPropTypes.multipleProp([
        'computer',
        'computer vertically',
        'mobile',
        'mobile vertically',
        'tablet',
        'tablet vertically',
    ]) as any,

    /** A row can stretch its contents to take up the entire column height. */
    stretched: PropTypes.bool,

    /** A row can specify its text alignment. */
    textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS) as any,

    /** A row can specify its vertical alignment to have all its columns vertically centered. */
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS) as any,
};

GridColumn.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A grid column can be colored. */
    color: PropTypes.oneOf(SUI.COLORS) as any,

    /** A column can specify a width for a computer. */
    computer: customPropTypes.every([
        customPropTypes.disallow(['width']),
        PropTypes.oneOf(SUI.WIDTHS),
    ]),

    /** A column can sit flush against the left or right edge of a row. */
    floated: PropTypes.oneOf(SUI.FLOATS) as any,

    /** A column can specify a width for a large screen device. */
    largeScreen: customPropTypes.every([
        customPropTypes.disallow(['width']),
        PropTypes.oneOf(SUI.WIDTHS),
    ]),

    /** A column can specify a width for a mobile device. */
    mobile: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS as any)]),

    /** A column can appear only for a specific device, or screen sizes. */
    only: customPropTypes.multipleProp(SUI.VISIBILITY) as any,

    /** A column can stretch its contents to take up the entire grid or row height. */
    stretched: PropTypes.bool,

    /** A column can specify a width for a tablet device. */
    tablet: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS as any)]),

    /** A column can specify its text alignment. */
    textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS as any),

    /** A column can specify its vertical alignment to have all its columns vertically centered. */
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS as any),

    /** A column can specify a width for a wide screen device. */
    widescreen: customPropTypes.every([
        customPropTypes.disallow(['width']),
        PropTypes.oneOf(SUI.WIDTHS as any),
    ]),

    /** Represents width of column. */
    width: customPropTypes.every([
        customPropTypes.disallow(['computer', 'largeScreen', 'mobile', 'tablet', 'widescreen']),
        PropTypes.oneOf(SUI.WIDTHS as any),
    ]),
};

Grid.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A grid can have rows divided into cells. */
    celled: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['internally'])]) as any,

    /** A grid can have its columns centered. */
    centered: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Represents column count per row in Grid. */
    columns: PropTypes.oneOf([...SUI.WIDTHS as any, 'equal']),

    /** A grid can be combined with a container to use the available layout and alignment. */
    container: PropTypes.bool,

    /** A grid can have dividers between its columns. */
    divided: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['vertically'])]) as any,

    /** A grid can double its column width on tablet and mobile sizes. */
    doubling: PropTypes.bool,

    /** A grid's colors can be inverted. */
    inverted: PropTypes.bool,

    /** A grid can preserve its vertical and horizontal gutters on first and last columns. */
    padded: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['horizontally', 'vertically'])]) as any,

    /** A grid can increase its gutters to allow for more negative space. */
    relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

    /** A grid can specify that its columns should reverse order at different device sizes. */
    reversed: customPropTypes.multipleProp([
        'computer',
        'computer vertically',
        'mobile',
        'mobile vertically',
        'tablet',
        'tablet vertically',
    ]) as any,

    /** A grid can have its columns stack on-top of each other after reaching mobile breakpoints. */
    stackable: PropTypes.bool,

    /** A grid can stretch its contents to take up the entire grid height. */
    stretched: PropTypes.bool,

    /** A grid can specify its text alignment. */
    textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS as any),

    /** A grid can specify its vertical alignment to have all its columns vertically centered. */
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS as any),
};

export { };
