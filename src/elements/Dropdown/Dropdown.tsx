import EventStack from '@semantic-ui-react/event-stack';
import keyboardKey from 'keyboard-key';
import React, { Component, Children, cloneElement, createRef } from 'react';
import shallowEqual from 'shallowequal';

import { doesNodeContainClick, getClassName, Use, isEqualObj, unique, diffValues, isEmptyPrimitive, escapeRegExp, deburr as _deburr } from '../../lib';
import { LabelProps, Label, Icon, IconProps } from '..';
import { DropdownDivider } from './DropdownDivider';
import { DropdownHeader } from './DropdownHeader';
import { DropdownItem, DropdownItemProps } from './DropdownItem';
import { DropdownMenu } from './DropdownMenu';
import { DropdownSearchInput } from './DropdownSearchInput';

export interface DropdownProps extends StrictDropdownProps {
    [key: string]: any;
}

type Value1 = string | number | boolean;
type ValueN = Value1[];
type Value = Value1 | ValueN | undefined;

export interface StrictDropdownProps {
    /** An element type to render as (string or function). */
    as?: any;

    /** Label prefixed to an option added by a user. */
    additionLabel?: number | string | React.ReactNode;

    /** Position of the `Add: ...` option in the dropdown list ('top' or 'bottom'). */
    additionPosition?: 'top' | 'bottom';

    /**
     * Allow user additions to the list of options (boolean).
     * Requires the use of `selection`, `options` and `search`.
     */
    allowAdditions?: boolean;

    /** A Dropdown can reduce its complexity. */
    basic?: boolean;

    /** Format the Dropdown to appear as a button. */
    button?: boolean;

    /** Primary content. */
    children?: React.ReactNode;

    /** Additional classes. */
    className?: string;

    /** Using the clearable setting will let users remove their selection from a dropdown. */
    clearable?: boolean;

    /** Whether or not the menu should close when the dropdown is blurred. */
    closeOnBlur?: boolean;

    /** Whether or not the dropdown should close when the escape key is pressed. */
    closeOnEscape?: boolean;

    /**
     * Whether or not the menu should close when a value is selected from the dropdown.
     * By default, multiple selection dropdowns will remain open on change, while single
     * selection dropdowns will close on change.
     */
    closeOnChange?: boolean;

    /** A compact dropdown has no minimum width. */
    compact?: boolean;

    /** Whether or not the dropdown should strip diacritics in options and input search */
    deburr?: boolean;

    /** Initial value of open. */
    defaultOpen?: boolean;

    /** Initial value of searchQuery. */
    defaultSearchQuery?: string;

    /** Currently selected label in multi-select. */
    defaultSelectedLabel?: number | string;

    /** Initial value of upward. */
    defaultUpward?: boolean;

    /** Initial value or value array if multiple. */
    defaultValue?: string | number | boolean | (number | string | boolean)[];

    /** A dropdown menu can open to the left or to the right. */
    direction?: 'left' | 'right';

    /** A disabled dropdown menu or item does not allow user interaction. */
    disabled?: boolean;

    /** An errored dropdown can alert a user to a problem. */
    error?: boolean;

    /** A dropdown menu can contain floated content. */
    floating?: boolean;

    /** A dropdown can take the full width of its parent */
    fluid?: boolean;

    /** A dropdown menu can contain a header. */
    header?: React.ReactNode;

    /** Shorthand for Icon. */
    icon?: any;

    /** A dropdown can be formatted to appear inline in other content. */
    inline?: boolean;

    /** A dropdown can be formatted as a Menu item. */
    item?: boolean;

    /** A dropdown can be labeled. */
    labeled?: boolean;

    /** A dropdown can defer rendering its options until it is open. */
    lazyLoad?: boolean;

    /** A dropdown can show that it is currently loading data. */
    loading?: boolean;

    /** The minimum characters for a search to begin showing results. */
    minCharacters?: number;

    /** A selection dropdown can allow multiple selections. */
    multiple?: boolean;

    /** Message to display when there are no results. */
    noResultsMessage?: React.ReactNode;

    /**
     * Called when a user adds a new item. Use this to update the options list.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and the new item's value.
     */
    onAddItem?: (event: React.KeyboardEvent<HTMLElement>, data: DropdownProps) => void;

    /**
     * Called on blur.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onBlur?: (event: React.KeyboardEvent<HTMLElement>, data: DropdownProps) => void;

    /**
     * Called when the user attempts to change the value.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void;

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick?: (event: React.KeyboardEvent<HTMLElement>, data: DropdownProps) => void;

    /**
     * Called when a close event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClose?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void;

    /**
     * Called on focus.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onFocus?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void;

    /**
     * Called when a multi-select label is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All label props.
     */
    onLabelClick?: (event: React.MouseEvent<HTMLElement>, data: LabelProps) => void;

    /**
     * Called on mousedown.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onMouseDown?: (event: React.MouseEvent<HTMLElement>, data: DropdownProps) => void;

    /**
     * Called when an open event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onOpen?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void;

    /**
     * Called on search input change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props, includes current value of searchQuery.
     */
    onSearchChange?: (
        event: React.SyntheticEvent<HTMLElement>,
        data: DropdownOnSearchChangeData,
    ) => void;

    /** Controls whether or not the dropdown menu is displayed. */
    open?: boolean;

    /** Whether or not the menu should open when the dropdown is focused. */
    openOnFocus?: boolean;

    /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
    options?: DropdownItemProps[];

    /** Placeholder text. */
    placeholder?: string;

    /** A dropdown can be formatted so that its menu is pointing. */
    pointing?:
    | boolean
    | 'left'
    | 'right'
    | 'top'
    | 'top left'
    | 'top right'
    | 'bottom'
    | 'bottom left'
    | 'bottom right';

    /**
     * Mapped over the active items and returns shorthand for the active item Labels.
     * Only applies to `multiple` Dropdowns.
     *
     * @param {object} item - A currently active dropdown item.
     * @param {number} index - The current index.
     * @param {object} defaultLabelProps - The default props for an active item Label.
     * @returns {*} Shorthand for a Label.
     */
    renderLabel?: (item: DropdownItemProps, index: number, defaultLabelProps: LabelProps) => any;

    /** A dropdown can have its menu scroll. */
    scrolling?: boolean;

    /**
     * A selection dropdown can allow a user to search through a large list of choices.
     * Pass a function here to replace the default search.
     */
    search?: boolean | ((options: DropdownItemProps[], value: string) => DropdownItemProps[]);

    /** A shorthand for a search input. */
    searchInput?: any;

    /** Current value of searchQuery. Creates a controlled component. */
    searchQuery?: string;

    /** Define whether the highlighted item should be selected on blur. */
    selectOnBlur?: boolean;

    /** Whether dropdown should select new option when using keyboard shortcuts. Setting to false will require enter or left click to confirm a choice. */
    selectOnNavigation?: boolean;

    /** Currently selected label in multi-select. */
    selectedLabel?: number | string;

    /** A dropdown can be used to select between choices in a form. */
    selection?: any;

    /** A simple dropdown can open without Javascript. */
    simple?: boolean;

    /** A dropdown can receive focus. */
    tabIndex?: number | string;

    /** The text displayed in the dropdown, usually for the active item. */
    text?: string;

    /** Custom element to trigger the menu to become visible. Takes place of 'text'. */
    trigger?: React.ReactNode;

    /** Current value or value array if multiple. Creates a controlled component. */
    value?: boolean | number | string | (boolean | number | string)[];

    /** Controls whether the dropdown will open upward. */
    upward?: boolean;

    /**
     * A dropdown will go to the last element when ArrowUp is pressed on the first,
     * or go to the first when ArrowDown is pressed on the last( aka infinite selection )
     */
    wrapSelection?: boolean;
}

/* TODO: replace with DropdownProps when #1829 will be fixed:
 * https://github.com/Semantic-Org/Semantic-UI-React/issues/1829
 */
export interface DropdownOnSearchChangeData extends DropdownProps {
    searchQuery: string;
}

// interface CDropdown extends React.FC<DropdownProps> {
//     Divider: typeof DropdownDivider;
//     Header: typeof DropdownHeader;
//     Item: typeof DropdownItem;
//     Menu: typeof DropdownMenu;
//     SearchInput: typeof DropdownSearchInput;
// }

interface State {
    // isMouseDown: boolean;
    open: boolean;
    selectedIndex: number;
    value: Value;
    selectedLabel: number | string;
    searchQuery: string;
    upward: boolean;
    focus: boolean;
}

export class Dropdown extends Component<DropdownProps, State> {

    static propTypes: any;

    static defaultProps = {
        additionLabel: 'Add ',
        additionPosition: 'top',
        closeOnBlur: true,
        closeOnEscape: true,
        deburr: false,
        icon: 'dropdown',
        minCharacters: 1,
        noResultsMessage: 'No results found.',
        openOnFocus: true,
        renderLabel: ({ text }: any) => text,
        searchInput: 'text',
        selectOnBlur: true,
        selectOnNavigation: true,
        wrapSelection: true,
    };

    // static autoControlledProps = ['open', 'searchQuery', 'selectedLabel', 'value', 'upward'];

    static Divider = DropdownDivider;
    static Header = DropdownHeader;
    static Item = DropdownItem;
    static Menu = DropdownMenu;
    static SearchInput = DropdownSearchInput;

    searchRef: React.RefObject<any>;
    sizerRef: React.RefObject<any>;
    ref: React.RefObject<any>;
    isMouseDown: boolean;

    public constructor(props: DropdownProps) {
        super(props);

        this.searchRef = createRef();
        this.sizerRef = createRef();
        this.ref = createRef();
        this.isMouseDown = false;

        this.state = {
            focus: false,
            upward: props.upward ?? props.defaultUpward ?? false,
            searchQuery: props.searchQuery ?? props.defaultSearchQuery ?? '',
            open: props.open ?? props.defaultOpen ?? false,
            selectedIndex: -1,
            value: props.value ?? props.defaultValue,
            selectedLabel: props.selectedLabel ?? props.defaultSelectedLabel ?? '',
        };
    }

    // tslint:disable-next-line: function-name
    UNSAFE_componentWillMount() {

        const { open, value } = this.state;

        this.trySetState({ value });
        this.setSelectedIndex(value);

        if (open) {
            this.open();
        }
    }

    // tslint:disable-next-line: function-name
    UNSAFE_componentWillReceiveProps(nextProps: DropdownProps) {

        const autoControlledProps = ['open', 'searchQuery', 'selectedLabel', 'value', 'upward'];

        // Solve the next state for autoControlledProps
        const newState = autoControlledProps.reduce((acc, prop) => {

            const isNextDefined = (nextProps[prop]) !== undefined;

            // if next is defined then use its value
            if (isNextDefined) acc[prop] = nextProps[prop];

            return acc;
        }, {} as any);

        if (Object.keys(newState).length > 0) this.setState(newState);

        if (!shallowEqual(nextProps.value, this.props.value)) {
            this.trySetState({ value: nextProps.value });
            this.setSelectedIndex(nextProps.value);
        }

        // The selected index is only dependent on option keys/values.
        // We only check those properties to avoid recursive performance impacts.
        // https://github.com/Semantic-Org/Semantic-UI-React/issues/3000
        if (isEqualObj(getKeyAndValues(nextProps.options), getKeyAndValues(this.props.options))) {
            this.setSelectedIndex(undefined, nextProps.options);
        }
    }

    shouldComponentUpdate(nextProps: DropdownProps, nextState: State) {
        return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
    }

    componentDidUpdate(prevProps: DropdownProps, prevState: State) {

        const { closeOnBlur, minCharacters, openOnFocus, search } = this.props;

        // focused / blurred
        if (!prevState.focus && this.state.focus) {

            if (!this.isMouseDown) {
                const openable = !search || (search && minCharacters === 1 && !this.state.open);

                if (openOnFocus && openable) this.open();
            }
        } else if (prevState.focus && !this.state.focus) {

            if (!this.isMouseDown && closeOnBlur) this.close();
        }

        // opened / closed
        if (!prevState.open && this.state.open) {

            this.setOpenDirection();
            this.scrollSelectedItemIntoView();
        }
    }

    trySetState = (state: Partial<State>, callback?: any) => {

        const newState = (Object.keys(state) as (keyof State)[]).reduce((acc: any, prop) => {
            // ignore props defined by the parent
            if (this.props[prop] !== undefined) return acc;

            acc[prop] = state[prop];
            return acc;
        }, {} as Partial<State>);

        if (Object.keys(newState).length > 0) this.setState(newState, callback);
    }

    // ----------------------------------------
    // Document Event Handlers
    // ----------------------------------------

    // onChange needs to receive a value
    // can't rely on props.value if we are controlled
    handleChange = (e: any, value: any) => this.props.onChange?.call(null, e, { ...this.props, value });

    closeOnChange = (e: any) => {

        const { closeOnChange, multiple } = this.props;

        if (!closeOnChange ? !multiple : closeOnChange) this.close(e, () => void 0);
    }

    closeOnEscape = (e: any) => {

        if (!this.props.closeOnEscape || (keyboardKey.getCode(e) !== keyboardKey.Escape)) return;

        e.preventDefault();
        this.close(e);
    }

    moveSelectionOnKeyDown = (e: any) => {

        switch (keyboardKey.getCode(e)) {

            case (keyboardKey.ArrowDown):
                e.preventDefault();
                this.moveSelectionBy(1);
                break;

            case (keyboardKey.ArrowUp):
                e.preventDefault();
                this.moveSelectionBy(-1);
                break;

            default:
                return;
        }

        const { multiple, selectOnNavigation } = this.props;
        if (!multiple && selectOnNavigation) this.makeSelectedItemActive(e);
    }

    openOnSpace = (e: any) => {

        if (keyboardKey.getCode(e) !== keyboardKey.Spacebar) return;

        e.preventDefault();
        this.open(e);
    }

    openOnArrow = (e: any) => {

        const code = keyboardKey.getCode(e);
        if ((![keyboardKey.ArrowDown, keyboardKey.ArrowUp].includes(code as any)) || this.state.open) return;

        e.preventDefault();
        this.open(e);
    }

    makeSelectedItemActive = (e: any) => {

        const { multiple, onAddItem } = this.props;
        const item = this.getSelectedItem();
        const selectedItemValue = item.value;

        // prevent selecting null if there was no selected item value
        // prevent selecting duplicate items when the dropdown is closed
        if (selectedItemValue == null || !this.state.open) return;

        // state value may be undefined
        const newValue: Value = multiple ? unique(this.state.value as any, selectedItemValue) : selectedItemValue;
        const valueHasChanged = multiple ? diffValues(newValue as ValueN, this.state.value as ValueN).length : newValue !== this.state.value;

        if (valueHasChanged) {
            // notify the onChange prop that the user is trying to change value
            this.trySetState({ value: newValue });
            this.setSelectedIndex(newValue);
            this.handleChange(e, newValue);

            // Heads up! This event handler should be called after `onChange`
            // Notify the onAddItem prop if this is a new value
            if (item['data-additional']) {
                onAddItem?.call(null, e, { ...this.props, value: selectedItemValue });
            }
        }
    }

    selectItemOnEnter = (e: any) => {

        const { search } = this.props;

        const shouldSelect =
            keyboardKey.getCode(e) === keyboardKey.Enter ||
            // https://github.com/Semantic-Org/Semantic-UI-React/pull/3766
            (!search && keyboardKey.getCode(e) === keyboardKey.Spacebar);

        if (!shouldSelect) return;
        e.preventDefault();

        const optionSize = this.getMenuOptions()?.length ?? 0;
        if (search && optionSize === 0) return;

        this.makeSelectedItemActive(e);
        this.closeOnChange(e);
        this.clearSearchQuery(e);
        if (search) this.searchRef.current?.focus();
    }

    removeItemOnBackspace = (e: any) => {

        if (keyboardKey.getCode(e) !== keyboardKey.Backspace) return;
        if (this.state.searchQuery || !this.props.search || !this.props.multiple || isEmptyPrimitive(this.state.value as any)) return;
        e.preventDefault();

        // remove most recent value
        const newValue = (this.state.value as ValueN).slice(0, -1);

        this.trySetState({ value: newValue });
        this.setSelectedIndex(newValue);
        this.handleChange(e, newValue);
    }

    closeOnDocumentClick = (e: any) => {

        if (!this.props.closeOnBlur) return;

        // If event happened in the dropdown, ignore it
        if (this.ref.current && doesNodeContainClick(this.ref.current, e)) return;

        this.close();
    }

    // ----------------------------------------
    // Component Event Handlers
    // ----------------------------------------

    handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {

        this.isMouseDown = true;
        this.props.onMouseDown?.call(null, e, this.props);
        document.addEventListener('mouseup', this.handleDocumentMouseUp);
    }

    handleDocumentMouseUp = () => {

        this.isMouseDown = false;
        document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    }

    handleClick = (e: any) => {

        const { minCharacters, search } = this.props;
        const { open, searchQuery } = this.state;

        this.props.onClick?.call(null, e, this.props);
        // prevent closeOnDocumentClick()
        e.stopPropagation();

        if (!search) return this.toggle(e);
        if (open) {
            this.searchRef.current?.focus();
            return;
        }
        if (searchQuery.length >= minCharacters! || minCharacters === 1) {
            this.open(e);
            return;
        }
        this.searchRef.current?.focus();
    }

    handleIconClick = (e: any) => {
        const { clearable } = this.props;
        const hasValue = this.hasValue();

        this.props.onClick?.call(null, e, this.props);
        // prevent handleClick()
        e.stopPropagation();

        if (clearable && hasValue) {
            this.clearValue(e);
        } else {
            this.toggle(e);
        }
    }

    handleItemClick = (e: any, item: DropdownItemProps) => {

        const { multiple, search, onAddItem } = this.props;

        // prevent toggle() in handleClick()
        e.stopPropagation();
        // prevent closeOnDocumentClick() if multiple or item is disabled
        if (multiple || item.disabled) e.nativeEvent.stopImmediatePropagation();
        if (item.disabled) return;

        const isAdditionItem = item['data-additional'];
        const newValue = multiple ? unique(this.state.value as any, item.value as any) : item.value;
        const valueHasChanged = multiple ? !!diffValues(newValue as ValueN, this.state.value as ValueN).length : newValue !== this.state.value;

        // notify the onChange prop that the user is trying to change value
        if (valueHasChanged) {
            this.trySetState({ value: newValue });
            this.setSelectedIndex(item.value);
            this.handleChange(e, newValue);
        }

        this.clearSearchQuery(item.value);

        if (search) {
            this.searchRef.current?.focus();
        } else {
            this.ref.current?.focus();
        }

        this.closeOnChange(e);

        // Heads up! This event handler should be called after `onChange`
        // Notify the onAddItem prop if this is a new value
        if (isAdditionItem) onAddItem?.call(null, e, { ...this.props, value: item.value });
    }

    handleFocus = (e: any) => {

        if (this.state.focus) return;

        this.props.onFocus?.call(null, e, this.props);
        this.setState({ focus: true });
    }

    handleBlur = (e: any) => {

        // Heads up! Don't remove this.
        // https://github.com/Semantic-Org/Semantic-UI-React/issues/1315
        const currentTarget = e?.currentTarget;
        if (currentTarget && currentTarget.contains(document.activeElement)) return;

        const { closeOnBlur, multiple, selectOnBlur } = this.props;
        // do not "blur" when the mouse is down inside of the Dropdown
        if (this.isMouseDown) return;

        this.props.onBlur?.call(null, e, this.props);

        if (selectOnBlur && !multiple) {
            this.makeSelectedItemActive(e);
            if (closeOnBlur) this.close();
        }

        this.setState({ focus: false });
        this.clearSearchQuery();
    }

    handleSearchChange = (e: any, { value }: DropdownItemProps) => {

        // prevent propagating to this.props.onChange()
        e.stopPropagation();

        const { minCharacters } = this.props;
        const { open } = this.state;
        const newQuery = value as string;

        this.props.onSearchChange?.call(null, e, { ...this.props, searchQuery: newQuery });
        this.trySetState({ searchQuery: newQuery, selectedIndex: 0 });

        // open search dropdown on search query
        if (!open && newQuery.length >= minCharacters!) {
            this.open();
            return;
        }
        // close search dropdown if search query is too small
        if (open && minCharacters !== 1 && newQuery.length < minCharacters!) this.close();
    }

    // ----------------------------------------
    // Getters
    // ----------------------------------------

    // There are times when we need to calculate the options based on a value
    // that hasn't yet been persisted to state.
    getMenuOptions = (value = this.state.value, options = this.props.options, searchQuery = this.state.searchQuery) => {

        const { additionLabel, additionPosition, allowAdditions, deburr, multiple, search } = this.props;

        let filteredOptions = options as DropdownItemProps[];

        // filter out active options
        if (multiple) filteredOptions = filteredOptions.filter((opt) => (value as ValueN).includes(opt.value!));

        // filter by search query
        if (search && searchQuery) {
            // tslint:disable-next-line: triple-equals
            if (typeof search == 'function') {
                filteredOptions = search(filteredOptions, searchQuery);
            } else {
                // remove diacritics on search input and options, if deburr prop is set
                const strippedQuery = deburr ? _deburr(searchQuery) : searchQuery;

                const re = new RegExp(escapeRegExp(strippedQuery), 'i');

                filteredOptions = filteredOptions.filter(({ text }) => re.test(deburr ? _deburr(text as string) : text as string));
            }
        }

        // insert the "add" item
        if (allowAdditions && search && searchQuery && !filteredOptions.some(x => x.text === searchQuery)) {
            const additionLabelElement = React.isValidElement(additionLabel)
                ? React.cloneElement(additionLabel, { key: 'addition-label' })
                : additionLabel || '';

            const addItem = {
                key: 'addition',
                // by using an array, we can pass multiple elements, but when doing so
                // we must specify a `key` for React to know which one is which
                text: [additionLabelElement, <b key='addition-query'>{searchQuery}</b>],
                value: searchQuery,
                className: 'addition',
                'data-additional': true,
            };
            if (additionPosition === 'top') filteredOptions.unshift(addItem);
            else filteredOptions.push(addItem);
        }

        return filteredOptions;
    }

    getSelectedItem = () => this.getMenuOptions()[this.state.selectedIndex];

    getEnabledIndices = (givenOptions: DropdownItemProps[]) => {

        const options = givenOptions || this.getMenuOptions();

        return options.reduce(
            (memo, item, index) => {
                if (!item.disabled) memo.push(index);
                return memo;
            },
            [] as number[],
        );
    }

    getItemByValue = (value: Value1) => this.props.options?.find(x => x.value === value)!;

    getMenuItemIndexByValue = (value: Value1, givenOptions: DropdownItemProps[]) => {

        const options = givenOptions || this.getMenuOptions();

        return options.findIndex(x => x.value === value);
    }

    // getDropdownAriaOptions = () => {
    //     const { loading, disabled, search, multiple } = this.props;
    //     const { open } = this.state;
    //     const ariaOptions = {
    //         role: search ? 'combobox' : 'listbox',
    //         'aria-busy': loading,
    //         'aria-disabled': disabled,
    //         'aria-expanded': !!open,
    //     };
    //     if (ariaOptions.role === 'listbox') {
    //         ariaOptions['aria-multiselectable'] = multiple;
    //     }
    //     return ariaOptions;
    // }

    // getDropdownMenuAriaOptions() {
    //     const { search, multiple } = this.props;
    //     const ariaOptions = {};

    //     if (search) {
    //         ariaOptions['aria-multiselectable'] = multiple;
    //         ariaOptions.role = 'listbox';
    //     }
    //     return ariaOptions;
    // }

    // ----------------------------------------
    // Setters
    // ----------------------------------------

    clearSearchQuery = (value?: any) => {

        const { searchQuery } = this.state;
        if (searchQuery === undefined || searchQuery === '') return;

        this.trySetState({ searchQuery: '' });
        this.setSelectedIndex(value, undefined, '');
    }

    // setValue = (value: Value) => this.trySetState({ value });

    setSelectedIndex = (value = this.state.value, optionsProps = this.props.options, searchQuery = this.state.searchQuery) => {

        const { multiple } = this.props;
        const { selectedIndex } = this.state;
        const options = this.getMenuOptions(value, optionsProps, searchQuery);
        const enabledIndicies = this.getEnabledIndices(options);

        let newSelectedIndex;

        // update the selected index
        if (!selectedIndex || selectedIndex < 0) {
            const firstIndex = enabledIndicies[0];

            // Select the currently active item, if none, use the first item.
            // Multiple selects remove active items from the list,
            // their initial selected index should be 0.
            newSelectedIndex = multiple
                ? firstIndex
                : this.getMenuItemIndexByValue(value as Value1, options) || enabledIndicies[0];
        } else if (multiple) {
            // multiple selects remove options from the menu as they are made active
            // keep the selected index within range of the remaining items
            if (selectedIndex >= options.length - 1) {
                newSelectedIndex = enabledIndicies[enabledIndicies.length - 1];
            }
        } else {
            const activeIndex = this.getMenuItemIndexByValue(value as Value1, options);

            // regular selects can only have one active item
            // set the selected index to the currently active item
            newSelectedIndex = enabledIndicies.includes(activeIndex) ? activeIndex : undefined;
        }

        if (!newSelectedIndex || newSelectedIndex < 0) {
            newSelectedIndex = enabledIndicies[0];
        }

        this.setState({ selectedIndex: newSelectedIndex });
    }

    handleLabelClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, labelProps: LabelProps) => {

        // prevent focusing search input on click
        e.stopPropagation();

        this.setState({ selectedLabel: labelProps.value });
        this.props.onLabelClick?.call(null, e, labelProps);
    }

    handleLabelRemove = (e: any, p: { value: any; }) => {

        // prevent focusing search input on click
        e.stopPropagation();
        const newValue = (this.state.value as ValueN).filter(x => x !== p.value);

        this.trySetState({ value: newValue });
        this.setSelectedIndex(newValue);
        this.handleChange(e, newValue);
    }

    moveSelectionBy = (offset: number, startIndex = this.state.selectedIndex) => {

        const options = this.getMenuOptions();

        // Prevent infinite loop
        // TODO: remove left part of condition after children API will be removed
        if (options === undefined || options.every(x => x.disabled)) return;

        const lastIndex = options.length - 1;
        const { wrapSelection } = this.props;
        // next is after last, wrap to beginning
        // next is before first, wrap to end
        let nextIndex = startIndex + offset;

        // if 'wrapSelection' is set to false and selection is after last or before first, it just does not change
        if (!wrapSelection && (nextIndex > lastIndex || nextIndex < 0)) {
            nextIndex = startIndex;
        } else if (nextIndex > lastIndex) nextIndex = 0;
        else if (nextIndex < 0) nextIndex = lastIndex;

        if (options[nextIndex].disabled) {
            this.moveSelectionBy(offset, nextIndex);
            return;
        }

        this.setState({ selectedIndex: nextIndex });
        this.scrollSelectedItemIntoView();
    }

    // ----------------------------------------
    // Overrides
    // ----------------------------------------

    handleIconOverrides = (pprops: IconProps) => {

        const { clearable } = this.props;
        const classes = getClassName(clearable && this.hasValue() && 'clear' as any, pprops.className);

        return {
            className: classes,
            onClick: (e: any) => {
                pprops.onClick?.call(null, e, pprops);
                this.handleIconClick(e);
            },
        };
    }

    // ----------------------------------------
    // Helpers
    // ----------------------------------------

    clearValue = (e: any) => {

        const newValue = this.props.multiple ? [] : '';

        this.trySetState({ value: newValue });
        this.setSelectedIndex(newValue);
        this.handleChange(e, newValue);
    }

    // computeSearchInputTabIndex = () => {
    //     const { disabled, tabIndex } = this.props;

    //     if (!_.isNil(tabIndex)) return tabIndex;
    //     return disabled ? -1 : 0;
    // }

    computeSearchInputWidth = () => {
        const { searchQuery } = this.state;

        if (this.sizerRef.current && searchQuery) {
            // resize the search input, temporarily show the sizer so we can measure it

            this.sizerRef.current.style.display = 'inline';
            this.sizerRef.current.textContent = searchQuery;
            const searchWidth = Math.ceil(this.sizerRef.current.getBoundingClientRect().width);
            this.sizerRef.current.style.removeProperty('display');

            return searchWidth;
        }
    }

    // computeTabIndex = () => {
    //     const { disabled, search, tabIndex } = this.props;

    //     // don't set a root node tabIndex as the search input has its own tabIndex
    //     if (search) return undefined;
    //     if (disabled) return -1;
    //     return _.isNil(tabIndex) ? 0 : tabIndex;
    // }

    handleSearchInputOverrides = (pprops: DropdownItemProps) => ({
        onChange: (e: any, inputProps: DropdownItemProps) => {
            pprops.onChange?.call(null, e, inputProps);
            this.handleSearchChange(e, inputProps);
        },
    })

    hasValue = () => {

        const { value } = this.state;

        return this.props.multiple ? value != null : value != null && value !== '';
    }

    // ----------------------------------------
    // Behavior
    // ----------------------------------------

    scrollSelectedItemIntoView = () => {

        if (!this.ref.current) return;
        const menu = this.ref.current.querySelector('.menu.visible');
        if (!menu) return;
        const item = menu.querySelector('.item.selected');
        if (!item) return;

        const isOutOfUpperView = item.offsetTop < menu.scrollTop;
        const isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight;

        if (isOutOfUpperView) {
            menu.scrollTop = item.offsetTop;
        } else if (isOutOfLowerView) {
            // eslint-disable-next-line no-mixed-operators
            menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight;
        }
    }

    setOpenDirection = () => {
        if (!this.ref.current) return;

        const menu = this.ref.current.querySelector('.menu.visible');

        if (!menu) return;

        const dropdownRect = this.ref.current.getBoundingClientRect();
        const menuHeight = menu.clientHeight;
        const spaceAtTheBottom =
            document.documentElement.clientHeight - dropdownRect.top - dropdownRect.height - menuHeight;
        const spaceAtTheTop = dropdownRect.top - menuHeight;

        const upward = spaceAtTheBottom < 0 && spaceAtTheTop > spaceAtTheBottom;

        // set state only if there's a relevant difference
        if (!upward !== !this.state.upward) {
            this.trySetState({ upward });
        }
    }

    open = (e?: any) => {

        const { disabled, open, search } = this.props;

        if (disabled) return;
        if (search) this.searchRef.current.focus?.call(null);

        this.props.onOpen?.call(null, e, this.props);

        this.trySetState({ open: true });
        this.scrollSelectedItemIntoView();
    }

    close = (e?: any, callback = this.handleClose) => {
        const { open } = this.state;

        if (open) {
            this.props.onClose?.call(null, e, this.props);
            this.trySetState({ open: false }, callback);
        }
    }

    handleClose = () => {

        const hasSearchFocus = document.activeElement === this.searchRef.current;
        // https://github.com/Semantic-Org/Semantic-UI-React/issues/627
        // Blur the Dropdown on close so it is blurred after selecting an item.
        // This is to prevent it from re-opening when switching tabs after selecting an item.
        if (!hasSearchFocus && this.ref.current) {
            this.ref.current.blur();
        }

        const hasDropdownFocus = document.activeElement === this.ref.current;
        const hasFocus = hasSearchFocus || hasDropdownFocus;

        // We need to keep the virtual model in sync with the browser focus change
        // https://github.com/Semantic-Org/Semantic-UI-React/issues/692
        this.setState({ focus: hasFocus });
    }

    toggle = (e: any) => (this.state.open ? this.close(e) : this.open(e));

    // ----------------------------------------
    // Render
    // ----------------------------------------

    renderText = () => {

        const { multiple, placeholder, search, text } = this.props;
        const { searchQuery, value, open } = this.state;
        const hasValue = this.hasValue();

        const classes = getClassName(placeholder && !hasValue && 'default' as any, 'text', search && searchQuery && 'filtered' as any);
        let _text;

        if (text) {
            _text = text;
        } else if (open && !multiple) {
            _text = this.getSelectedItem()?.text;
        } else if (hasValue) {
            _text = this.getItemByValue(value as Value1)?.text;
        } else {
            _text = placeholder;
        }

        return (
            <div className={classes} role='alert' aria-live='polite' aria-atomic>
                {_text}
            </div>
        );
    }

    // renderSearchInput = () => {
    //     const { search, searchInput } = this.props;
    //     const { searchQuery } = this.state;

    //     return (
    //         search && DropdownSearchInput.create(searchInput, {
    //             defaultProps: {
    //                 ref: this.searchRef,
    //                 style: { width: this.computeSearchInputWidth() },
    //                 tabIndex: this.computeSearchInputTabIndex(),
    //                 value: searchQuery,
    //             },
    //             overrideProps: this.handleSearchInputOverrides,
    //         })
    //     );
    // }

    // renderSearchSizer = () => {
    //     const { search, multiple } = this.props;

    //     return search && multiple && <span className='sizer' ref={this.sizerRef} />;
    // }

    renderLabels = () => {

        const { multiple, renderLabel } = this.props;
        const { selectedLabel, value } = this.state;
        if (!multiple || !Array.isArray(value) || !value.length) return;

        const selectedItems = value.map(this.getItemByValue).filter(Boolean) as DropdownItemProps[];

        // if no item could be found for a given state value the selected item will be undefined
        // compact the selectedItems so we only have actual objects left
        return selectedItems.map((item, index) => {

            const defaultProps = {
                active: item.value === selectedLabel,
                as: 'a',
                key: item.key ?? item.value,
                onClick: this.handleLabelClick,
                onRemove: this.handleLabelRemove,
                value: item.value,
            } as any;

            return Label.create(renderLabel?.call(null, item, index, defaultProps), { defaultProps });
        });
    }

    renderOptions = () => {

        const { lazyLoad, multiple, search, noResultsMessage } = this.props;
        const { open, selectedIndex, value } = this.state;

        // lazy load, only render options when open
        if (lazyLoad && !open) return null;

        const options = this.getMenuOptions();

        if (noResultsMessage !== null && search && !options.length) {
            return <div className='message'>{noResultsMessage}</div>;
        }

        const isActive = multiple
            ? (optValue: Value1) => (value as ValueN).includes(optValue)
            : (optValue: Value1) => optValue === value;

        return options.map((opt, i) =>
            DropdownItem.create({
                active: isActive(opt.value!),
                onClick: this.handleItemClick,
                selected: selectedIndex === i,
                ...opt,
                key: opt.key ?? opt.value,
                // Needed for handling click events on disabled items
                style: { ...opt.style, pointerEvents: 'all' },
            }),
        );
    }

    renderMenu = () => {
        const { children, direction, header, search, multiple } = this.props;
        const { open } = this.state;

        const ariaOptions = search ? { 'aria-multiselectable': multiple, role: 'listbox' } : {};

        // single menu child
        if (Children.count(children)) {
            const menuChild = Children.only(children) as any;
            const className = getClassName(direction, { visible: open }, menuChild.props.className);

            return cloneElement(menuChild, { className, ...ariaOptions });
        }

        return (
            <DropdownMenu {...ariaOptions} direction={direction} open={open}>
                {DropdownHeader.create(header, { autoGenerateKey: false })}
                {this.renderOptions()}
            </DropdownMenu>
        );
    }

    render() {

        const {
            as: ElementType = 'div', additionLabel = 'Add', additionPosition = 'top', allowAdditions,
            basic, button, children, className, clearable, closeOnBlur = true, closeOnEscape = true, closeOnChange, compact, deburr = false,
            defaultOpen, defaultSearchQuery, defaultSelectedLabel, defaultUpward, defaultValue, direction, disabled, error, floating, fluid,
            header, icon = 'dropdown', inline, item, labeled, lazyLoad, loading, minCharacters = 1, multiple, noResultsMessage = 'No results found.',
            onAddItem, onBlur, onChange, onClick, onClose, onFocus, onLabelClick, onMouseDown, onOpen, onSearchChange, open, openOnFocus = true, options,
            placeholder, pointing, renderLabel = ({ text }) => text, scrolling, search, searchInput = 'text', searchQuery, selectOnBlur = true,
            selectOnNavigation = true, selectedLabel, selection, simple, tabIndex, text, trigger, value, upward, wrapSelection = true, ...rest
        } = this.props;

        // tslint:disable-next-line: object-shorthand-properties-first
        const classes = getClassName('ui', { 'active visible': this.state.open, disabled, error, loading, basic, button, compact, fluid, floating, inline, labeled, item, multiple, search, selection, simple, scrolling, upward: this.state.upward } as any, [Use.KeyOrValueKey, { pointing }], 'dropdown', className);

        const ariaOptions = search
            ? { role: 'combobox', 'aria-busy': loading, 'aria-disabled': disabled, 'aria-expanded': !!this.state.open }
            : { 'aria-multiselectable': multiple, role: 'listbox', 'aria-busy': loading, 'aria-disabled': disabled, 'aria-expanded': !!this.state.open };

        return (
            <ElementType
                ref={this.ref}
                {...rest}
                {...ariaOptions}
                className={classes}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
                tabIndex={search ? undefined : disabled ? -1 : tabIndex == null ? 0 : tabIndex}
            >
                {this.renderLabels()}
                {search && DropdownSearchInput.create(searchInput, {
                    defaultProps: { style: { width: this.computeSearchInputWidth() }, tabIndex: tabIndex != null ? tabIndex : disabled ? -1 : 0, value: this.state.searchQuery, ref: this.searchRef },
                    overrideProps: this.handleSearchInputOverrides,
                })}
                {search && multiple && <span className='sizer' ref={this.sizerRef} />}
                {trigger || this.renderText()}
                {Icon.create(icon, { overrideProps: this.handleIconOverrides, autoGenerateKey: false })}
                {this.renderMenu()}

                {this.state.open && <EventStack name='keydown' on={this.closeOnEscape} />}
                {this.state.open && <EventStack name='keydown' on={this.moveSelectionOnKeyDown} />}
                {this.state.open && <EventStack name='click' on={this.closeOnDocumentClick} />}
                {this.state.open && <EventStack name='keydown' on={this.selectItemOnEnter} />}

                {this.state.focus && <EventStack name='keydown' on={this.removeItemOnBackspace} />}
                {this.state.focus && !this.state.open && <EventStack name='keydown' on={this.openOnArrow} />}
                {this.state.focus && !this.state.open && <EventStack name='keydown' on={this.openOnSpace} />}
            </ElementType>
        );
    }
}

const getKeyAndValues = (options?: DropdownItemProps[]) => options?.map(({ key, value }) => ({ key, value }));
