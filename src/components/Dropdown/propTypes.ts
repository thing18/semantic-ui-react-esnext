import PropTypes from 'prop-types';
import _without from 'lodash/without';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { DropdownMenu } from './DropdownMenu';
import { DropdownItem } from './DropdownItem';
import { DropdownHeader } from './DropdownHeader';
import { DropdownDivider } from './DropdownDivider';
import { DropdownSearchInput } from './DropdownSearchInput';
import { Dropdown } from './Dropdown';

Dropdown.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Label prefixed to an option added by a user. */
    additionLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

    /** Position of the `Add: ...` option in the dropdown list ('top' or 'bottom'). */
    additionPosition: PropTypes.oneOf(['top', 'bottom']),

    /**
     * Allow user additions to the list of options (boolean).
     * Requires the use of `selection`, `options` and `search`.
     */
    allowAdditions: customPropTypes.every([
        customPropTypes.demand(['options', 'selection', 'search']),
        PropTypes.bool,
    ]),

    /** A Dropdown can reduce its complexity. */
    basic: PropTypes.bool,

    /** Format the Dropdown to appear as a button. */
    button: PropTypes.bool,

    /** Primary content. */
    children: customPropTypes.every([
        customPropTypes.disallow(['options', 'selection']),
        customPropTypes.givenProps(
            { children: PropTypes.any.isRequired },
            PropTypes.element.isRequired,
        ),
    ]),

    /** Additional classes. */
    className: PropTypes.string,

    /** Using the clearable setting will let users remove their selection from a dropdown. */
    clearable: PropTypes.bool,

    /** Whether or not the menu should close when the dropdown is blurred. */
    closeOnBlur: PropTypes.bool,

    /** Whether or not the dropdown should close when the escape key is pressed. */
    closeOnEscape: PropTypes.bool,

    /**
     * Whether or not the menu should close when a value is selected from the dropdown.
     * By default, multiple selection dropdowns will remain open on change, while single
     * selection dropdowns will close on change.
     */
    closeOnChange: PropTypes.bool,

    /** A compact dropdown has no minimum width. */
    compact: PropTypes.bool,

    /** Whether or not the dropdown should strip diacritics in options and input search */
    deburr: PropTypes.bool,

    /** Initial value of open. */
    defaultOpen: PropTypes.bool,

    /** Initial value of searchQuery. */
    defaultSearchQuery: PropTypes.string,

    /** Currently selected label in multi-select. */
    defaultSelectedLabel: customPropTypes.every([
        customPropTypes.demand(['multiple']),
        PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ]),

    /** Initial value of upward. */
    defaultUpward: PropTypes.bool,

    /** Initial value or value array if multiple. */
    defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
    ]),

    /** A dropdown menu can open to the left or to the right. */
    direction: PropTypes.oneOf(['left', 'right']),

    /** A disabled dropdown menu or item does not allow user interaction. */
    disabled: PropTypes.bool,

    /** An errored dropdown can alert a user to a problem. */
    error: PropTypes.bool,

    /** A dropdown menu can contain floated content. */
    floating: PropTypes.bool,

    /** A dropdown can take the full width of its parent */
    fluid: PropTypes.bool,

    /** A dropdown menu can contain a header. */
    header: PropTypes.node,

    /** Shorthand for Icon. */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),

    /** A dropdown can be formatted to appear inline in other content. */
    inline: PropTypes.bool,

    /** A dropdown can be formatted as a Menu item. */
    item: PropTypes.bool,

    /** A dropdown can be labeled. */
    labeled: PropTypes.bool,

    /** A dropdown can defer rendering its options until it is open. */
    lazyLoad: PropTypes.bool,

    /** A dropdown can show that it is currently loading data. */
    loading: PropTypes.bool,

    /** The minimum characters for a search to begin showing results. */
    minCharacters: PropTypes.number,

    /** A selection dropdown can allow multiple selections. */
    multiple: PropTypes.bool,

    /** Message to display when there are no results. */
    noResultsMessage: PropTypes.node,

    /**
     * Called when a user adds a new item. Use this to update the options list.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and the new item's value.
     */
    onAddItem: PropTypes.func,

    /**
     * Called on blur.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onBlur: PropTypes.func,

    /**
     * Called when the user attempts to change the value.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange: PropTypes.func,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Called when a close event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClose: PropTypes.func,

    /**
     * Called on focus.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onFocus: PropTypes.func,

    /**
     * Called when a multi-select label is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All label props.
     */
    onLabelClick: PropTypes.func,

    /**
     * Called on mousedown.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onMouseDown: PropTypes.func,

    /**
     * Called when an open event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onOpen: PropTypes.func,

    /**
     * Called on search input change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props, includes current value of searchQuery.
     */
    onSearchChange: PropTypes.func,

    /** Controls whether or not the dropdown menu is displayed. */
    open: PropTypes.bool,

    /** Whether or not the menu should open when the dropdown is focused. */
    openOnFocus: PropTypes.bool,

    /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
    options: customPropTypes.every([
        customPropTypes.disallow(['children']),
        PropTypes.arrayOf(PropTypes.shape(DropdownItem.propTypes as any)),
    ]),

    /** Placeholder text. */
    placeholder: PropTypes.string,

    /** A dropdown can be formatted so that its menu is pointing. */
    pointing: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([
            'left',
            'right',
            'top',
            'top left',
            'top right',
            'bottom',
            'bottom left',
            'bottom right',
        ]),
    ]),

    /**
     * Mapped over the active items and returns shorthand for the active item Labels.
     * Only applies to `multiple` Dropdowns.
     *
     * @param {object} item - A currently active dropdown item.
     * @param {number} index - The current index.
     * @param {object} defaultLabelProps - The default props for an active item Label.
     * @returns {*} Shorthand for a Label.
     */
    renderLabel: PropTypes.func,

    /** A dropdown can have its menu scroll. */
    scrolling: PropTypes.bool,

    /**
     * A selection dropdown can allow a user to search through a large list of choices.
     * Pass a function here to replace the default search.
     */
    search: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

    /** A shorthand for a search input. */
    searchInput: PropTypes.oneOfType([PropTypes.array, PropTypes.node, PropTypes.object]),

    /** Current value of searchQuery. Creates a controlled component. */
    searchQuery: PropTypes.string,

    // TODO 'searchInMenu' or 'search='in menu' or ???  How to handle this markup and functionality?

    /** Define whether the highlighted item should be selected on blur. */
    selectOnBlur: PropTypes.bool,

    /**
     * Whether or not to change the value when navigating the menu using arrow keys.
     * Setting to false will require enter or left click to confirm a choice.
     */
    selectOnNavigation: PropTypes.bool,

    /** Currently selected label in multi-select. */
    selectedLabel: customPropTypes.every([
        customPropTypes.demand(['multiple']),
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ]),

    /** A dropdown can be used to select between choices in a form. */
    selection: customPropTypes.every([
        customPropTypes.disallow(['children']),
        customPropTypes.demand(['options']),
        PropTypes.bool,
    ]),

    /** A simple dropdown can open without Javascript. */
    simple: PropTypes.bool,

    /** A dropdown can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** The text displayed in the dropdown, usually for the active item. */
    text: PropTypes.string,

    /** Custom element to trigger the menu to become visible. Takes place of 'text'. */
    trigger: customPropTypes.every([
        customPropTypes.disallow(['selection', 'text']),
        PropTypes.node,
    ]),

    /** Current value or value array if multiple. Creates a controlled component. */
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number])),
    ]),

    /** Controls whether the dropdown will open upward. */
    upward: PropTypes.bool,

    /**
     * A dropdown will go to the last element when ArrowUp is pressed on the first,
     * or go to the first when ArrowDown is pressed on the last( aka infinite selection )
     */
    wrapSelection: PropTypes.bool,
};

DropdownSearchInput.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** An input can have the auto complete. */
    autoComplete: PropTypes.string,

    /** Additional classes. */
    className: PropTypes.string,

    /** An input can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

    /** The HTML input type. */
    type: PropTypes.string,

    /** Stored value. */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

DropdownDivider.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Additional classes. */
    className: PropTypes.string,
};

DropdownHeader.propTypes = {
    /** An element type to render as (string or function) */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for Icon. */
    icon: customPropTypes.itemShorthand,
};

DropdownItem.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Style as the currently chosen item. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Additional text with less emphasis. */
    description: customPropTypes.itemShorthand,

    /** A dropdown item can be disabled. */
    disabled: PropTypes.bool,

    /** Shorthand for Flag. */
    flag: customPropTypes.itemShorthand,

    /** Shorthand for Icon. */
    icon: customPropTypes.itemShorthand,

    /** Shorthand for Image. */
    image: customPropTypes.itemShorthand,

    /** Shorthand for Label. */
    label: customPropTypes.itemShorthand,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * The item currently selected by keyboard shortcut.
     * This is not the active item.
     */
    selected: PropTypes.bool,

    /** Display text. */
    text: customPropTypes.contentShorthand,

    /** Stored value. */
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
};

DropdownMenu.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A dropdown menu can open to the left or to the right. */
    direction: PropTypes.oneOf(['left', 'right']),

    /** Whether or not the dropdown menu is displayed. */
    open: PropTypes.bool,

    /** A dropdown menu can scroll. */
    scrolling: PropTypes.bool,
};

export { };
