import PropTypes from 'prop-types';
// import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Pagination } from './Pagination';
import { PaginationItem } from './PaginationItem';

PaginationItem.propTypes = {
    /** A pagination item can be active. */
    active: PropTypes.bool,

    /** A pagination item can be disabled. */
    disabled: PropTypes.bool,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Called on key down.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onKeyDown: PropTypes.func,

    /** A pagination should have a type. */
    type: PropTypes.oneOf([
        'ellipsisItem',
        'firstItem',
        'prevItem',
        'pageItem',
        'nextItem',
        'lastItem',
    ]),
};

Pagination.propTypes = {
    /** A pagination item can have an aria label. */
    'aria-label': PropTypes.string,

    /** Initial activePage value. */
    defaultActivePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Index of the currently active page. */
    activePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Number of always visible pages at the beginning and end. */
    boundaryRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** A pagination can be disabled. */
    disabled: PropTypes.bool,

    /** A shorthand for PaginationItem. */
    ellipsisItem: customPropTypes.itemShorthand,

    /** A shorthand for PaginationItem. */
    firstItem: customPropTypes.itemShorthand,

    /** A shorthand for PaginationItem. */
    lastItem: customPropTypes.itemShorthand,

    /** A shorthand for PaginationItem. */
    nextItem: customPropTypes.itemShorthand,

    /** A shorthand for PaginationItem. */
    pageItem: customPropTypes.itemShorthand,

    /** A shorthand for PaginationItem. */
    prevItem: customPropTypes.itemShorthand,

    /**
     * Called on change of an active page.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onPageChange: PropTypes.func,

    /** Number of always visible pages before and after the current one. */
    siblingRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Total number of pages. */
    totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export { };
