import EventStack from '@semantic-ui-react/event-stack';
import keyboardKey from 'keyboard-key';
import React, { Children, cloneElement, useRef, useState, useEffect, useReducer, useMemo } from 'react';
// import shallowEqual from 'shallowequal'

import { LabelProps, Label, Icon, IconProps } from '..';
import { DropdownDivider } from './DropdownDivider';
import { DropdownHeader } from './DropdownHeader';
import { DropdownItem, DropdownItemProps } from './DropdownItem';
import { DropdownMenu } from './DropdownMenu';
import { DropdownSearchInput } from './DropdownSearchInput';
import { doesNodeContainClick, getClassName, Use } from '../../lib';

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

interface CDropdown extends React.FC<DropdownProps> {
  Divider: typeof DropdownDivider;
  Header: typeof DropdownHeader;
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
  SearchInput: typeof DropdownSearchInput;
}

const getKeyOrValue = (key: string, value: any) => key == null ? value : key;

interface State {
  isMouseDown: boolean;
  open: boolean;
  selectedIndex: number;
  value: Value;
  selectedLabel: number | string;
  searchQuery: string;
  upward: boolean;
  focus: boolean;
}

const reducer = (prev: State, state: Partial<State>) => ({ ...prev, ...state });

interface C {
  handleLabelClick: any;
  handleLabelRemove: any;

  clearValue: (e: any) => void;
  handleChange: (e: any, value: any) => void;
  closeOnChange: (e: any) => void;
  closeOnEscape: (e: any) => void;
  moveSelectionOnKeyDown: (e: any) => void;
  openOnSpace: (e: any) => void;
  openOnArrow: (e: any) => void;
  makeSelectedItemActive: (e: any) => void;
  selectItemOnEnter: (e: any) => void;
  removeItemOnBackspace: (e: any) => void;
  closeOnDocumentClick: (e: any) => void;
  handleMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
  handleDocumentMouseUp: () => void;
  handleClick: (e: React.KeyboardEvent<HTMLElement>) => void;
  handleIconClick: (e: any) => void;
  handleItemClick: (e: any, item: DropdownItemProps) => void;
  handleFocus: (e: React.SyntheticEvent<HTMLElement>) => void;
  handleBlur: (e: any) => void;
  handleSearchChange: (e: any, d: DropdownItemProps) => void;

  getMenuOptions: (value?: Value, options?: DropdownItemProps[], searchQuery?: string) => DropdownItemProps[];
  getSelectedItem: () => DropdownItemProps;
  getEnabledIndices: (givenOptions: DropdownItemProps[]) => number[];
  getItemByValue: (value: Value1) => DropdownItemProps;
  getMenuItemIndexByValue: (value: Value1, givenOptions: DropdownItemProps[]) => number;

  clearSearchQuery: (value?: Value) => void;
  setSelectedIndex: (value?: Value, options?: DropdownItemProps[], searchQuery?: string) => void;
  moveSelectionBy: (offset: number, startIndex?: number) => void;
  scrollSelectedItemIntoView: () => void;
  setOpenDirection: () => void;
  open: (e?: any) => void;
  close: (e?: any, callback?: any) => void;
  handleClose: () => void;
  toggle: (e: any) => void;
  hasValue: () => boolean;
}

/**
 * A dropdown allows a user to select a value from a series of options.
 * @see Form
 * @see Select
 * @see Menu
 */
export const Dropdown: CDropdown = props => {

  const {
    as: ElementType = 'div', additionLabel = 'Add', additionPosition = 'top', allowAdditions,
    basic, button, children, className, clearable, closeOnBlur = true, closeOnEscape = true, closeOnChange, compact, deburr = false,
    defaultOpen, defaultSearchQuery, defaultSelectedLabel, defaultUpward, defaultValue, direction, disabled, error, floating, fluid,
    header, icon = 'dropdown', inline, item, labeled, lazyLoad, loading, minCharacters = 1, multiple, noResultsMessage = 'No results found.',
    onAddItem, onBlur, onChange, onClick, onClose, onFocus, onLabelClick, onMouseDown, onOpen, onSearchChange, open, openOnFocus = true, options,
    placeholder, pointing, renderLabel = ({ text }) => text, scrolling, search, searchInput = 'text', searchQuery, selectOnBlur = true,
    selectOnNavigation = true, selectedLabel, selection, simple, tabIndex, text, trigger, value, upward, wrapSelection = true, ...rest
  } = props;

  const searchRef = useRef<any>();
  const sizerRef = useRef<any>();
  const ref = useRef<any>();
  const [state, dispatch] = useReducer(reducer, { focus: false, upward: upward ?? defaultUpward ?? false, searchQuery: searchQuery ?? defaultSearchQuery ?? '', isMouseDown: false, open: open ?? defaultOpen ?? false, selectedIndex: -1, value: value ?? defaultValue, selectedLabel: selectedLabel ?? defaultSelectedLabel ?? '' });
  const c: C = useMemo<C>(() => ({

    clearValue: (e: any) => {

      const newValue = multiple ? [] : '';

      dispatch({ value: newValue });
      c.setSelectedIndex(newValue);
      c.handleChange(e, newValue);
    },

    handleChange: (e: any, value: any) => onChange?.call(null, e, { ...props, value }),

    closeOnChange: (e: any) => {

      if (!closeOnChange ? !multiple : closeOnChange) c.close(e, () => void 0);
    },

    closeOnEscape: (e: any) => {

      if (!closeOnEscape || (keyboardKey.getCode(e) !== keyboardKey.Escape)) return;

      e.preventDefault();
      c.close(e);
    },

    moveSelectionOnKeyDown: (e: any) => {

      switch (keyboardKey.getCode(e)) {

        case (keyboardKey.ArrowDown):
          e.preventDefault();
          c.moveSelectionBy(1);
          break;

        case (keyboardKey.ArrowUp):
          e.preventDefault();
          c.moveSelectionBy(-1);
          break;

        default:
          return;
      }

      if (!multiple && selectOnNavigation) c.makeSelectedItemActive(e);
    },

    openOnSpace: (e: any) => {

      if (keyboardKey.getCode(e) !== keyboardKey.Spacebar) return;

      e.preventDefault();
      c.open(e);
    },

    openOnArrow: (e: any) => {

      const code = keyboardKey.getCode(e);
      if ((![keyboardKey.ArrowDown, keyboardKey.ArrowUp].includes(code as any)) || state.open) return;

      e.preventDefault();
      c.open(e);
    },

    makeSelectedItemActive: (e: any) => {

      const item = c.getSelectedItem() as DropdownItemProps;
      const selectedItemValue = item.value;

      // prevent selecting null if there was no selected item value
      // prevent selecting duplicate items when the dropdown is closed
      if (selectedItemValue == null || !state.open) return;

      // state value may be undefined
      const newValue: Value = multiple ? union(state.value, selectedItemValue) : selectedItemValue;
      const valueHasChanged = multiple ? diffValues(newValue as ValueN, state.value as ValueN).length : newValue !== state.value;

      if (valueHasChanged) {
        // notify the onChange prop that the user is trying to change value
        dispatch({ value: newValue });
        c.setSelectedIndex(newValue);
        c.handleChange(e, newValue);

        // Heads up! This event handler should be called after `onChange`
        // Notify the onAddItem prop if this is a new value
        if (item['data-additional']) {
          onAddItem?.call(null, e, { ...props, value: selectedItemValue });
        }
      }
    },

    selectItemOnEnter: (e: any) => {

      const shouldSelect =
        keyboardKey.getCode(e) === keyboardKey.Enter ||
        // https://github.com/Semantic-Org/Semantic-UI-React/pull/3766
        (!search && keyboardKey.getCode(e) === keyboardKey.Spacebar);

      if (!shouldSelect) return;
      e.preventDefault();

      const optionSize = c.getMenuOptions()?.length ?? 0;
      if (search && optionSize === 0) return;

      c.makeSelectedItemActive(e);
      c.closeOnChange(e);
      c.clearSearchQuery(e);
      if (search) searchRef.current?.focus();
    },

    removeItemOnBackspace: (e: any) => {

      if (keyboardKey.getCode(e) !== keyboardKey.Backspace) return;
      if (state.searchQuery || !search || !multiple || isEmptyValue(state.value)) return;
      e.preventDefault();

      // remove most recent value
      const newValue = (state.value as ValueN).slice(0, -1);

      dispatch({ value: newValue });
      c.setSelectedIndex(newValue);
      c.handleChange(e, newValue);
    },

    closeOnDocumentClick: (e: any) => {

      if (!closeOnBlur) return;

      // If event happened in the dropdown, ignore it
      if (ref.current && doesNodeContainClick(ref.current, e)) return;

      c.close();
    },

    // ----------------------------------------
    // Component Event Handlers
    // ----------------------------------------

    handleMouseDown: (e: React.MouseEvent<HTMLElement>) => {

      dispatch({ isMouseDown: true });
      onMouseDown?.call(null, e, props);
      document.addEventListener('mouseup', c.handleDocumentMouseUp);
    },

    handleDocumentMouseUp: () => {

      dispatch({ isMouseDown: false });
      document.removeEventListener('mouseup', c.handleDocumentMouseUp);
    },

    handleClick: (e: React.KeyboardEvent<HTMLElement>) => {

      onClick?.call(null, e, props);
      // prevent closeOnDocumentClick()
      e.stopPropagation();

      if (!search) return c.toggle(e);

      if (state.open) {
        searchRef.current?.focus();
        return;
      }

      if (state.searchQuery.length >= minCharacters || minCharacters === 1) {
        c.open(e);
        return;
      }

      searchRef.current?.focus();
    },

    handleIconClick: (e: any) => {

      const hasValue = c.hasValue();

      onClick?.call(null, e, props);
      // prevent handleClick()
      e.stopPropagation();

      (clearable && hasValue) ? c.clearValue(e) : c.toggle(e);
    },

    handleItemClick: (e: any, item: DropdownItemProps) => {

      // prevent toggle() in handleClick()
      e.stopPropagation();
      // prevent closeOnDocumentClick() if multiple or item is disabled
      if (multiple || item.disabled) e.nativeEvent.stopImmediatePropagation();
      if (item.disabled) return;

      const isAdditionItem = item['data-additional'];
      const newValue = multiple ? union(state.value, item.value) : item.value;
      const valueHasChanged = multiple ? !!diffValues(newValue as ValueN, state.value as ValueN).length : newValue !== state.value;

      // notify the onChange prop that the user is trying to change value
      if (valueHasChanged) {
        dispatch({ value: newValue });
        c.setSelectedIndex(item.value);

        c.handleChange(e, newValue);
      }

      c.clearSearchQuery(item.value);

      if (search) {
        searchRef.current?.focus();
      } else {
        ref.current?.focus();
      }

      c.closeOnChange(e);

      // Heads up! This event handler should be called after `onChange`
      // Notify the onAddItem prop if this is a new value
      if (isAdditionItem) onAddItem?.call(null, e, { ...props, value: item.value });
    },

    handleFocus: (e: React.SyntheticEvent<HTMLElement>) => {

      if (state.focus) return;

      onFocus?.call(null, e, props);
      dispatch({ focus: true });
    },

    handleBlur: (e: any) => {

      // Heads up! Don't remove this.
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/1315
      const currentTarget = e?.currentTarget;
      if (currentTarget && currentTarget.contains(document.activeElement)) return;

      // do not "blur" when the mouse is down inside of the Dropdown
      if (state.isMouseDown) return;

      onBlur?.call(null, e, props);

      if (selectOnBlur && !multiple) {
        c.makeSelectedItemActive(e);
        if (closeOnBlur) c.close();
      }

      dispatch({ focus: false });
      c.clearSearchQuery();
    },

    handleSearchChange: (e: any, { value }: DropdownItemProps) => {

      // prevent propagating to onChange()
      e.stopPropagation();

      const newQuery = value as string;

      onSearchChange?.call(null, e, { ...props, searchQuery: newQuery });
      dispatch({ searchQuery: newQuery, selectedIndex: 0 });

      // open search dropdown on search query
      if (!state.open && newQuery.length >= minCharacters) {
        c.open();
        return;
      }
      // close search dropdown if search query is too small
      if (state.open && minCharacters !== 1 && newQuery.length < minCharacters) c.close();
    },

    // ----------------------------------------
    // Getters
    // ----------------------------------------

    // const __getKeyAndValues = (options: DropdownItemProps[]) => options ? options.map(({ key, value }) => ({ key, value })) : options;

    // There are times when we need to calculate the options based on a value
    // that hasn't yet been persisted to state.
    getMenuOptions: (value = state.value, options = props.options, searchQuery = state.searchQuery) => {

      let filteredOptions = options ?? [];

      // filter out active options
      if (multiple) {
        filteredOptions = filteredOptions.filter((opt) => (value as ValueN).includes(opt.value!));
      }

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
    },

    getSelectedItem: () => c.getMenuOptions()[state.selectedIndex],

    getEnabledIndices: (givenOptions: DropdownItemProps[]) => {
      const options = givenOptions || c.getMenuOptions();

      return options.reduce(
        (memo, item, index) => {
          if (!item.disabled) memo.push(index);
          return memo;
        },
        [] as number[],
      );
    },

    getItemByValue: (value: Value1) => options?.find(x => x.value === value)!,

    getMenuItemIndexByValue: (value: Value1, givenOptions: DropdownItemProps[]) => {
      const options = givenOptions || c.getMenuOptions();

      return options.findIndex(x => x.value === value);
    },

    // ----------------------------------------
    // Setters
    // ----------------------------------------

    clearSearchQuery: (value?: Value) => {

      if (state.searchQuery === undefined || state.searchQuery === '') return;

      dispatch({ searchQuery: '' });
      c.setSelectedIndex(value, undefined, '');
    },

    setSelectedIndex: (value = state.value, optionsProps = options, searchQuery = state.searchQuery) => {

      const options = c.getMenuOptions(value, optionsProps, searchQuery);
      const enabledIndicies = c.getEnabledIndices(options);

      let newSelectedIndex;

      // update the selected index
      if (!state.selectedIndex || state.selectedIndex < 0) {
        const firstIndex = enabledIndicies[0];

        // Select the currently active item, if none, use the first item.
        // Multiple selects remove active items from the list,
        // their initial selected index should be 0.
        newSelectedIndex = multiple
          ? firstIndex
          : c.getMenuItemIndexByValue(value as Value1, options) || enabledIndicies[0];
      } else if (multiple) {
        // multiple selects remove options from the menu as they are made active
        // keep the selected index within range of the remaining items
        if (state.selectedIndex >= options.length - 1) {
          newSelectedIndex = enabledIndicies[enabledIndicies.length - 1];
        }
      } else {
        const activeIndex = c.getMenuItemIndexByValue(value as Value1, options);

        // regular selects can only have one active item
        // set the selected index to the currently active item
        newSelectedIndex = enabledIndicies.includes(activeIndex) ? activeIndex : undefined;
      }

      if (!newSelectedIndex || newSelectedIndex < 0) newSelectedIndex = enabledIndicies[0];

      dispatch({ selectedIndex: newSelectedIndex });
    },

    handleLabelClick: (e: any, p: LabelProps) => {

      // prevent focusing search input on click
      e.stopPropagation();

      dispatch({ selectedLabel: p.value });
      onLabelClick?.call(null, e, p);
    },

    handleLabelRemove: (e: any, p: LabelProps) => {

      // prevent focusing search input on click
      e.stopPropagation();
      const newValue = (state.value as ValueN).filter(x => x !== p.value);

      dispatch({ value: newValue });
      c.setSelectedIndex(newValue);
      c.handleChange(e, newValue);
    },

    moveSelectionBy: (offset: number, startIndex = state.selectedIndex) => {

      const options = c.getMenuOptions();

      // Prevent infinite loop
      // TODO: remove left part of condition after children API will be removed
      if (options === undefined || options.every(x => x.disabled)) return;

      const lastIndex = options.length - 1;
      const { wrapSelection } = props;
      // next is after last, wrap to beginning
      // next is before first, wrap to end
      let nextIndex = startIndex + offset;

      // if 'wrapSelection' is set to false and selection is after last or before first, it just does not change
      if (!wrapSelection && (nextIndex > lastIndex || nextIndex < 0)) {
        nextIndex = startIndex;
      } else if (nextIndex > lastIndex) nextIndex = 0;
      else if (nextIndex < 0) nextIndex = lastIndex;

      if (options[nextIndex].disabled) {
        c.moveSelectionBy(offset, nextIndex);
        return;
      }

      dispatch({ selectedIndex: nextIndex });
      c.scrollSelectedItemIntoView();
    },

    scrollSelectedItemIntoView: () => {

      if (!ref.current) return;

      const menu = ref.current.querySelector('.menu.visible');
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
    },

    setOpenDirection: () => {
      if (!ref.current) return;

      const menu = ref.current.querySelector('.menu.visible');
      if (!menu) return;

      const dropdownRect = ref.current.getBoundingClientRect();
      const menuHeight = menu.clientHeight;
      const spaceAtTheBottom = document.documentElement.clientHeight - dropdownRect.top - dropdownRect.height - menuHeight;
      const spaceAtTheTop = dropdownRect.top - menuHeight;

      const upward = spaceAtTheBottom < 0 && spaceAtTheTop > spaceAtTheBottom;

      // set state only if there's a relevant difference
      if (!upward !== !state.upward) {
        dispatch({ upward });
      }
    },

    open: (e?: any) => {

      if (disabled) return;
      if (search) searchRef.current?.focus();

      onOpen?.call(null, e, props);

      dispatch({ open: true });
      c.scrollSelectedItemIntoView();
    },

    close: (e?: any, callback = c.handleClose) => {

      if (state.open) {
        onClose?.call(null, e, props);
        dispatch({ open: false });
        callback();
      }
    },

    handleClose: () => {

      const hasSearchFocus = document.activeElement === searchRef.current;
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/627
      // Blur the Dropdown on close so it is blurred after selecting an item.
      // This is to prevent it from re-opening when switching tabs after selecting an item.
      if (!hasSearchFocus && ref.current) ref.current.blur();

      const hasDropdownFocus = document.activeElement === ref.current;
      const hasFocus = hasSearchFocus || hasDropdownFocus;

      // We need to keep the virtual model in sync with the browser focus change
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/692
      dispatch({ focus: hasFocus });
    },

    toggle: (e: any) => state.open ? c.close(e) : c.open(e),

    hasValue: () => multiple ? !(Array.isArray(state.value) && state.value.length) : state.value != null && state.value !== '',

  }), []);

  useEffect(
    () => {
      dispatch({ value: state.value });
      c.setSelectedIndex(state.value, options);

      if (state.focus) {

        if (!state.isMouseDown) {
          const openable = !search || (search && minCharacters === 1 && !state.open);

          if (openOnFocus && openable) c.open();
        }

      } else {

        if (!state.isMouseDown && closeOnBlur) c.close();
      }

      if (state.open) {
        c.setOpenDirection();
        c.scrollSelectedItemIntoView();
        c.open();
      }
    },
    [value, options, open],
  );

  const __handleIconOverrides = (pprops: IconProps) => {

    const classes = getClassName(clearable && c.hasValue() && 'clear' as any, pprops.className);

    return {
      className: classes,
      onClick: (e: any) => {
        pprops.onClick?.call(null, e, pprops);
        c.handleIconClick(e);
      },
    };
  };

  const __computeSearchInputWidth = () => {

    if (sizerRef.current && state.searchQuery) {
      // resize the search input, temporarily show the sizer so we can measure it

      sizerRef.current.style.display = 'inline';
      sizerRef.current.textContent = state.searchQuery;
      const searchWidth = Math.ceil(sizerRef.current.getBoundingClientRect().width);
      sizerRef.current.style.removeProperty('display');

      return searchWidth;
    }
  };

  const __handleSearchInputOverrides = ({ onChange }: any) => ({
    onChange: (e: any, inputProps: any) => {
      onChange?.call(null, e, inputProps);
      c.handleSearchChange(e, inputProps);
    },
  });

  const ariaOptions = search
    ? { role: 'combobox', 'aria-busy': loading, 'aria-disabled': disabled, 'aria-expanded': !!state.open }
    : { 'aria-multiselectable': multiple, role: 'listbox', 'aria-busy': loading, 'aria-disabled': disabled, 'aria-expanded': !!state.open };

  // ----------------------------------------
  // Render
  // ----------------------------------------

  const renderText = () => {

    const hasValue = c.hasValue();

    const classes = getClassName(placeholder && !hasValue && 'default' as any, 'text', search && state.searchQuery && 'filtered' as any);
    let _text = placeholder;

    if (text) {
      _text = text;
    } else if (state.open && !multiple) {
      _text = c.getSelectedItem()?.text as string;
    } else if (hasValue) {
      _text = c.getItemByValue(state.value as any)?.text as string;
    }

    return (
      <div className={classes} role='alert' aria-live='polite' aria-atomic>
        {_text}
      </div>
    );
  };

  const renderLabels = () => {

    if (!multiple || !Array.isArray(state.value) || !state.value.length) return;

    const selectedItems = state.value.map(c.getItemByValue).filter(Boolean) as DropdownItemProps[];

    // if no item could be found for a given state value the selected item will be undefined
    // compact the selectedItems so we only have actual objects left
    return selectedItems.map((item, index) => {

      const defaultProps = {
        active: item.value === state.selectedLabel,
        as: 'a',
        key: getKeyOrValue(item.key, item.value),
        onClick: c.handleLabelClick,
        onRemove: c.handleLabelRemove,
        value: item.value,
      };

      return Label.create(renderLabel(item, index, defaultProps), { defaultProps });
    });
  };

  const renderOptions = () => {

    if (lazyLoad && !state.open) return null;

    const options = c.getMenuOptions() as DropdownItemProps[];

    if (noResultsMessage !== null && search && !(Array.isArray(options) && options!.length)) {
      return <div className='message'>{noResultsMessage}</div>;
    }

    const isActive = multiple
      ? (optValue: Value1) => (state.value as ValueN).includes(optValue)
      : (optValue: Value1) => optValue === state.value;

    return options.map((opt, i) =>
      DropdownItem.create({
        active: isActive(opt.value!),
        onClick: c.handleItemClick,
        selected: state.selectedIndex === i,
        ...opt,
        key: getKeyOrValue(opt.key, opt.value),
        // Needed for handling click events on disabled items
        style: { ...opt.style, pointerEvents: 'all' },
      }),
    );
  };

  const renderMenu = () => {

    const menuAriaOptions = search ? { 'aria-multiselectable': multiple, role: 'listbox' } : {};

    // single menu child
    if (Children.count(children)) {
      const menuChild = Children.only(children) as any;
      const className = getClassName(direction, { visible: state.open }, menuChild.props.className);

      return cloneElement(menuChild, { className, ...menuAriaOptions });
    }

    return (
      <DropdownMenu {...menuAriaOptions} direction={direction} open={state.open}>
        {DropdownHeader.create(header, { autoGenerateKey: false })}
        {renderOptions()}
      </DropdownMenu>
    );
  };

  // Classes
  // TODO: consider augmentation to render Dropdowns as Button/Menu, solves icon/link item issues https://github.com/Semantic-Org/Semantic-UI-React/issues/401#issuecomment-240487229
  // TODO: the icon class is only required when a dropdown is a button
  // useKeyOnly(icon, 'icon'),
  // tslint:disable-next-line: object-shorthand-properties-first
  const classes = getClassName('ui', { 'active visible': state.open, disabled, error, loading, basic, button, compact, fluid, floating, inline, labeled, item, multiple, search, selection, simple, scrolling, upward: state.upward } as any, [Use.KeyOrValueKey, { pointing }], 'dropdown', className);

  return (
    <ElementType
      ref={ref}
      {...rest}
      {...ariaOptions}
      className={classes}
      onBlur={c.handleBlur}
      onClick={c.handleClick}
      onMouseDown={c.handleMouseDown}
      onFocus={c.handleFocus}
      onChange={c.handleChange}
      tabIndex={search ? undefined : disabled ? -1 : tabIndex == null ? 0 : tabIndex}
    >
      {renderLabels()}
      {search && DropdownSearchInput.create(searchInput, {
        defaultProps: { style: { width: __computeSearchInputWidth() }, tabIndex: tabIndex != null ? tabIndex : disabled ? -1 : 0, value: state.searchQuery, ref: searchRef },
        overrideProps: __handleSearchInputOverrides,
      })}
      {search && multiple && <span className='sizer' ref={sizerRef} />}
      {trigger || renderText()}
      {Icon.create(icon, { overrideProps: __handleIconOverrides, autoGenerateKey: false })}
      {renderMenu()}

      {state.open && <EventStack name='keydown' on={c.closeOnEscape} />}
      {state.open && <EventStack name='keydown' on={c.moveSelectionOnKeyDown} />}
      {state.open && <EventStack name='click' on={c.closeOnDocumentClick} />}
      {state.open && <EventStack name='keydown' on={c.selectItemOnEnter} />}

      {state.focus && <EventStack name='keydown' on={c.removeItemOnBackspace} />}
      {state.focus && !state.open && <EventStack name='keydown' on={c.openOnArrow} />}
      {state.focus && !state.open && <EventStack name='keydown' on={c.openOnSpace} />}
    </ElementType>
  );
};

Dropdown.defaultProps = {
  additionLabel: 'Add ',
  additionPosition: 'top',
  closeOnBlur: true,
  closeOnEscape: true,
  deburr: false,
  icon: 'dropdown',
  minCharacters: 1,
  noResultsMessage: 'No results found.',
  openOnFocus: true,
  renderLabel: ({ text }) => text,
  searchInput: 'text',
  selectOnBlur: true,
  selectOnNavigation: true,
  wrapSelection: true,
};

Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
Dropdown.SearchInput = DropdownSearchInput;

// tslint:disable-next-line: triple-equals
const isEmptyValue = (value: Value) => ((Array.isArray(value) || typeof value == 'string') && !value.length) || value == null;
const union = (...args: any[]) => Array.from(new Set(args.flat()));
const diffValues = (newValues: ValueN, oldValues: ValueN) => newValues.filter(x => !oldValues.includes(x));
const _deburr = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const escapeRegExp = (s: string) => s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
