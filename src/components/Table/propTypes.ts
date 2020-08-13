import PropTypes from 'prop-types';
import _without from 'lodash/without';
import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeader } from './TableHeader';
import { TableFooter } from './TableFooter';
import { TableBody } from './TableBody';
import { Table } from './Table';

TableRow.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** A row can be active or selected by a user. */
    active: PropTypes.bool,

    /** An element type to render as (string or function). */
    cellas: PropTypes.elementType as any,

    /** Shorthand array of props for TableCell. */
    cells: customPropTypes.collectionShorthand,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A row can be disabled. */
    disabled: PropTypes.bool,

    /** A row may call attention to an error or a negative value. */
    error: PropTypes.bool,

    /** A row may let a user know whether a value is bad. */
    negative: PropTypes.bool,

    /** A row may let a user know whether a value is good. */
    positive: PropTypes.bool,

    /** A table row can adjust its text alignment. */
    textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')) as any,

    /** A table row can adjust its vertical alignment. */
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS) as any,

    /** A row may warn a user. */
    warning: PropTypes.bool,
};

TableCell.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** A cell can be active or selected by a user. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A cell can be collapsing so that it only uses as much space as required. */
    collapsing: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A cell can be disabled. */
    disabled: PropTypes.bool,

    /** A cell may call attention to an error or a negative value. */
    error: PropTypes.bool,

    /** Add an Icon by name, props object, or pass an <Icon /> */
    icon: customPropTypes.itemShorthand,

    /** A cell may let a user know whether a value is bad. */
    negative: PropTypes.bool,

    /** A cell may let a user know whether a value is good. */
    positive: PropTypes.bool,

    /** A cell can be selectable. */
    selectable: PropTypes.bool,

    /** A cell can specify that its contents should remain on a single line and not wrap. */
    singleLine: PropTypes.bool,

    /** A table cell can adjust its text alignment. */
    textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')) as any,

    /** A table cell can adjust its text alignment. */
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS) as any,

    /** A cell may warn a user. */
    warning: PropTypes.bool,

    /** A table can specify the width of individual columns independently. */
    width: PropTypes.oneOf(SUI.WIDTHS) as any,
};

TableHeaderCell.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Additional classes. */
    className: PropTypes.string,

    /** A header cell can be sorted in ascending or descending order. */
    sorted: PropTypes.oneOf(['ascending', 'descending']),
};

TableHeader.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A definition table can have a full width header or footer, filling in the gap left by the first column. */
    fullWidth: PropTypes.bool,
};

TableFooter.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,
};

TableBody.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,
};

Table.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Attach table to other content */
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]) as any,

    /** A table can reduce its complexity to increase readability. */
    basic: PropTypes.oneOfType([PropTypes.oneOf(['very']), PropTypes.bool]) as any,

    /** A table may be divided each row into separate cells. */
    celled: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A table can be collapsing, taking up only as much space as its rows. */
    collapsing: PropTypes.bool,

    /** A table can be given a color to distinguish it from other tables. */
    color: PropTypes.oneOf(SUI.COLORS) as any,

    /** A table can specify its column count to divide its content evenly. */
    columns: PropTypes.oneOf(SUI.WIDTHS) as any,

    /** A table may sometimes need to be more compact to make more rows visible at a time. */
    compact: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

    /** A table may be formatted to emphasize a first column that defines a rows content. */
    definition: PropTypes.bool,

    /**
     * A table can use fixed a special faster form of table rendering that does not resize table cells based on content
     */
    fixed: PropTypes.bool,

    /** Shorthand for a TableRow to be placed within Table.Footer. */
    footerRow: customPropTypes.itemShorthand,

    /** Shorthand for a TableRow to be placed within Table.Header. */
    headerRow: customPropTypes.every([
        customPropTypes.disallow(['headerRows']),
        customPropTypes.itemShorthand,
    ]),

    /** Shorthand for multiple TableRows to be placed within Table.Header. */
    headerRows: customPropTypes.every([
        customPropTypes.disallow(['headerRow']),
        customPropTypes.collectionShorthand,
    ]),

    /** A table's colors can be inverted. */
    inverted: PropTypes.bool,

    /** A table may sometimes need to be more padded for legibility. */
    padded: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

    /**
     * Mapped over `tableData` and should return shorthand for each Table.Row to be placed within Table.Body.
     *
     * @param {*} data - An element in the `tableData` array.
     * @param {number} index - The index of the current element in `tableData`.
     * @returns {*} Shorthand for a Table.Row.
     */
    renderBodyRow: customPropTypes.every([
        customPropTypes.disallow(['children']),
        customPropTypes.demand(['tableData']),
        PropTypes.func,
    ]),

    /** A table can have its rows appear selectable. */
    selectable: PropTypes.bool,

    /** A table can specify that its cell contents should remain on a single line and not wrap. */
    singleLine: PropTypes.bool,

    /** A table can also be small or large. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive')) as any,

    /** A table may allow a user to sort contents by clicking on a table header. */
    sortable: PropTypes.bool,

    /** A table can specify how it stacks table content responsively. */
    stackable: PropTypes.bool,

    /** A table can stripe alternate rows of content with a darker color to increase contrast. */
    striped: PropTypes.bool,

    /** A table can be formatted to display complex structured data. */
    structured: PropTypes.bool,

    /** Data to be passed to the renderBodyRow function. */
    tableData: customPropTypes.every([
        customPropTypes.disallow(['children']),
        customPropTypes.demand(['renderBodyRow']),
        PropTypes.array,
    ]),

    /** A table can adjust its text alignment. */
    textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')) as any,

    /** A table can specify how it stacks table content responsively. */
    unstackable: PropTypes.bool,

    /** A table can adjust its text alignment. */
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS as any) as any,
};

export { };
