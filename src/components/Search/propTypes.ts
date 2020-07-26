import PropTypes from 'prop-types';
import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { SearchResults } from './SearchResults';
import { SearchResult } from './SearchResult';
import { SearchCategoryLayout } from './SearchCategoryLayout';
import { SearchCategory } from './SearchCategory';
import { Search } from './Search';

SearchResults.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

SearchResult.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** The item currently selected by keyboard shortcut. */
    active: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Additional text with less emphasis. */
    description: PropTypes.string,

    /** A unique identifier. */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Add an image to the item. */
    image: PropTypes.string,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** Customized text for price. */
    price: PropTypes.string,

    /**
     * Renders the result contents.
     *
     * @param {object} props - The SearchResult props object.
     * @returns {*} - Renderable result contents.
     */
    renderer: PropTypes.func,

    /** Display title. */
    title: PropTypes.string.isRequired,
};

SearchCategoryLayout.propTypes = {
    /** The rendered category content */
    categoryContent: PropTypes.element.isRequired,

    /** The rendered results content */
    resultsContent: PropTypes.element.isRequired,
};

SearchCategory.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** The item currently selected by keyboard shortcut. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Display name. */
    name: PropTypes.string,

    /**
     * Renders the category layout contents.
     *
     * @param {object} props - The SearchCategoryLayout props object.
     * @returns {*} - Renderable category layout contents.
     */
    layoutRenderer: PropTypes.func,

    /**
     * Renders the category contents.
     *
     * @param {object} props - The SearchCategory props object.
     * @returns {*} - Renderable category contents.
     */
    renderer: PropTypes.func,

    /** Array of Search.Result props. */
    results: PropTypes.array,
};

Search.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    // ------------------------------------
    // Behavior
    // ------------------------------------

    /** Initial value of open. */
    defaultOpen: PropTypes.bool,

    /** Initial value. */
    defaultValue: PropTypes.string,

    /** Shorthand for Icon. */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),

    /** Minimum characters to query for results */
    minCharacters: PropTypes.number,

    /** Additional text for "No Results" message with less emphasis. */
    noResultsDescription: PropTypes.node,

    /** Message to display when there are no results. */
    noResultsMessage: PropTypes.node,

    /** Controls whether or not the results menu is displayed. */
    open: PropTypes.bool,

    /**
     * One of:
     * - array of Search.Result props e.g. `{ title: '', description: '' }` or
     * - object of categories e.g. `{ name: '', results: [{ title: '', description: '' }]`
     */
    results: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape(SearchResult.propTypes)),
        PropTypes.shape(SearchCategory.propTypes),
    ]),

    /** Whether the search should automatically select the first result after searching. */
    selectFirstResult: PropTypes.bool,

    /** Whether a "no results" message should be shown if no results are found. */
    showNoResults: PropTypes.bool,

    /** Current value of the search input. Creates a controlled component. */
    value: PropTypes.string,

    // ------------------------------------
    // Rendering
    // ------------------------------------

    /**
     * Renders the SearchCategory layout.
     *
     * @param {object} categoryContent - The Renderable SearchCategory contents.
     * @param {object} resultsContent - The Renderable SearchResult contents.
     * @returns {*} - Renderable SearchCategory layout.
     */
    categoryLayoutRenderer: PropTypes.func,

    /**
     * Renders the SearchCategory contents.
     *
     * @param {object} props - The SearchCategory props object.
     * @returns {*} - Renderable SearchCategory contents.
     */
    categoryRenderer: PropTypes.func,

    /**
     * Renders the SearchResult contents.
     *
     * @param {object} props - The SearchResult props object.
     * @returns {*} - Renderable SearchResult contents.
     */
    resultRenderer: PropTypes.func,

    // ------------------------------------
    // Callbacks
    // ------------------------------------

    /**
     * Called on blur.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onBlur: PropTypes.func,

    /**
     * Called on focus.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onFocus: PropTypes.func,

    /**
     * Called on mousedown.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onMouseDown: PropTypes.func,

    /**
     * Called when a result is selected.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onResultSelect: PropTypes.func,

    /**
     * Called on search input change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props, includes current value of search input.
     */
    onSearchChange: PropTypes.func,

    /**
     * Called when the active selection index is changed.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onSelectionChange: PropTypes.func,

    // ------------------------------------
    // Style
    // ------------------------------------

    /** A search can have its results aligned to its left or right container edge. */
    aligned: PropTypes.string,

    /** A search can display results from remote content ordered by categories. */
    category: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** A search can have its results take up the width of its container. */
    fluid: PropTypes.bool,

    /** Shorthand for input element. */
    input: customPropTypes.itemShorthand,

    /** A search can show a loading indicator. */
    loading: PropTypes.bool,

    /** A search can have different sizes. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')),
};

export { };
