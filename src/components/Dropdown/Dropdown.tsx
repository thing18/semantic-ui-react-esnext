// import EventStack from '@semantic-ui-react/event-stack';
import keyboardKey from 'keyboard-key';
import React, { Children, cloneElement, createRef } from 'react';
import shallowEqual from 'shallowequal';

import { doesNodeContainClick, getClassName, Use, isEqualObj, unique, diffValues, isEmptyPrimitive, escapeRegExp, deburr as _deburr, ModernAutoControlledComponent, ModernAutoControlledComponentState } from '../../lib';
import { EventStack } from '../EventStack';
import { LabelProps, Label } from '../Label';
import { Icon, IconProps } from '../Icon';
import { DropdownDivider } from './DropdownDivider';
import { DropdownHeader } from './DropdownHeader';
import { DropdownItem, DropdownItemProps } from './DropdownItem';
import { DropdownMenu } from './DropdownMenu';
import { DropdownSearchInput } from './DropdownSearchInput';
import { getMenuOptions } from './lib/getMenuOptions';
import { getSelectedIndex } from './lib/getSelectedIndex';
import { Flag } from '../Flag';
import { Image } from '../Image';
import { DropdownText } from './DropdownText';
import { Ref } from '../Ref';

export interface DropdownProps extends StrictDropdownProps {
  [key: string]: any;
}

type Value1 = string | number | boolean;
type ValueN = Value1[];
type Value = Value1 | ValueN | undefined;

export interface StrictDropdownProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

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
  value?: string | number | boolean | (number | string | boolean)[];

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

interface DropdownState extends ModernAutoControlledComponentState {
  // isMouseDown: boolean;
  open: boolean;
  selectedIndex: number;
  value: Value;
  selectedLabel: number | string;
  searchQuery: string;
  upward: boolean;
  focus: boolean;
}

// const getKeyOrValue = (key: any, value: any) => key ?? value;
// const getKeyAndValues = (options?: any[]) => options ? options.map(({ key, value }) => ({ key, value })) : options;

function renderItemContent(item: DropdownItemProps) {

  const { flag, image, text } = item;

  // TODO: remove this in v2
  // This maintains compatibility with Shorthand API in v1 as this might be called in "Label.create()"
  // tslint:disable-next-line: triple-equals
  if (React.isValidElement(text) || (typeof text == 'function')) {
    return text;
  }

  return {
    content: (
      <>
        {Flag.create(flag)}
        {Image.create(image)}
        {text}
      </>
    ),
  };
}

/**
 * A dropdown allows a user to select a value from a series of options.
 * @see Form
 * @see Select
 * @see Menu
 */
export class Dropdown extends ModernAutoControlledComponent<DropdownProps, DropdownState> {

  static defaultProps: Partial<DropdownProps>;

  static autoControlledProps: (keyof DropdownProps)[];

  static Divider: typeof DropdownDivider;
  static Header: any;
  static Item: any;
  static Menu: any;
  static SearchInput: any;
  static Text: any;

  searchRef = createRef<HTMLInputElement>();
  sizerRef = createRef<HTMLDivElement>();
  ref = createRef<HTMLElement>();
  isMouseDown!: boolean;

  getInitialAutoControlledState() {
    return { focus: false, searchQuery: '' };
  }

  static getAutoControlledStateFromProps(nextProps: DropdownProps, computedState: any, prevState: any) {
    // These values are stored only for a comparison on next getAutoControlledStateFromProps()
    const derivedState = { __options: nextProps.options, __value: computedState.value } as any;

    // The selected index is only dependent:
    const shouldComputeSelectedIndex =
      // On value change
      !shallowEqual(prevState.__value, computedState.value) ||
      // On option keys/values, we only check those properties to avoid recursive performance impacts.
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/3000
      !_isEqual(nextProps.options as any, prevState.__options);

    if (shouldComputeSelectedIndex) {
      derivedState.selectedIndex = getSelectedIndex({
        additionLabel: nextProps.additionLabel,
        additionPosition: nextProps.additionPosition,
        allowAdditions: nextProps.allowAdditions,
        deburr: nextProps.deburr,
        multiple: nextProps.multiple,
        search: nextProps.search,
        selectedIndex: computedState.selectedIndex,

        value: computedState.value,
        options: nextProps.options,
        searchQuery: computedState.searchQuery,
      });
    }

    return derivedState;
  }

  componentDidMount() {

    if (this.state.open) this.open(null, false);
  }

  shouldComponentUpdate(nextProps: DropdownProps, nextState: DropdownState) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
  }

  componentDidUpdate(_prevProps: DropdownProps, prevState: DropdownState) {

    const { closeOnBlur, minCharacters, openOnFocus, search } = this.props;

    /* eslint-disable no-console */
    if (process.env.NODE_ENV !== 'production') {
      // in development, validate value type matches dropdown type
      const isNextValueArray = Array.isArray(this.props.value);
      const hasValue = 'value' in this.props;

      if (hasValue && this.props.multiple && !isNextValueArray) {
        console.error(
          'Dropdown `value` must be an array when `multiple` is set.' +
          ` Received type: \`${Object.prototype.toString.call(this.props.value)}\`.`,
        );
      } else if (hasValue && !this.props.multiple && isNextValueArray) {
        console.error(
          'Dropdown `value` must not be an array when `multiple` is not set.' +
          ' Either set `multiple={true}` or use a string or number value.',
        );
      }
    }
    /* eslint-enable no-console */

    // focused / blurred
    if (!prevState.focus && this.state.focus) {

      if (!this.isMouseDown) {
        const openable = !search || (search && minCharacters === 1 && !this.state.open);

        if (openOnFocus && openable) this.open();
      }
    } else if (prevState.focus && !this.state.focus) {

      if (!this.isMouseDown && closeOnBlur) {

        this.close();
      }
    }

    // opened / closed
    if (!prevState.open && this.state.open) {

      this.setOpenDirection();
      this.scrollSelectedItemIntoView();
    }

    if (prevState.selectedIndex !== this.state.selectedIndex) {
      this.scrollSelectedItemIntoView();
    }
  }

  // ----------------------------------------
  // Document Event Handlers
  // ----------------------------------------

  // onChange needs to receive a value
  // can't rely on props.value if we are controlled
  handleChange = (e: any, value: any) => this.props.onChange?.call(null, e, { ...this.props, value });

  closeOnChange = (e: any) => {
    const { closeOnChange, multiple } = this.props;
    const shouldClose = closeOnChange == null ? !multiple : closeOnChange;

    if (shouldClose) {
      this.close(e, () => void 0);
    }
  }

  closeOnEscape = (e: any) => {
    if (!this.props.closeOnEscape) return;
    if (keyboardKey.getCode(e) !== keyboardKey.Escape) return;
    e.preventDefault();
    this.close(e);
  }

  moveSelectionOnKeyDown = (e: any) => {

    const { multiple, selectOnNavigation } = this.props;
    const { open } = this.state;

    if (!open) {
      return;
    }

    let move: number;
    switch (keyboardKey.getCode(e)) {

      case keyboardKey.ArrowDown:
        move = 1;
        break;

      case keyboardKey.ArrowUp:
        move = -1;
        break;

      default:
        return;
    }

    e.preventDefault();
    const nextIndex = this.getSelectedIndexAfterMove(move);

    if (!multiple && selectOnNavigation) {
      this.makeSelectedItemActive(e, nextIndex!);
    }

    this.setState({ selectedIndex: nextIndex! });
  }

  openOnSpace = (e: any) => {

    if (keyboardKey.getCode(e) !== keyboardKey.Spacebar) return;

    e.preventDefault();
    this.open(e);
  }

  openOnArrow = (e: any) => {

    const { focus, open } = this.state;

    if (focus && !open) {
      const code = keyboardKey.getCode(e);

      if (code === keyboardKey.ArrowDown || code === keyboardKey.ArrowUp) {
        e.preventDefault();
        this.open(e);
      }
    }
  }

  makeSelectedItemActive = (e: any, selectedIndex: number) => {
    const { open, value } = this.state;
    const { multiple } = this.props;

    const item = this.getSelectedItem(selectedIndex);
    const selectedValue = item?.value;

    // prevent selecting null if there was no selected item value
    // prevent selecting duplicate items when the dropdown is closed
    if ((selectedValue == null) || !open) {
      return value;
    }

    // state value may be undefined
    const newValue = multiple ? _union(value as ValueN, selectedValue) : selectedValue;
    const valueHasChanged = multiple ? !!_difference(newValue as ValueN, value as ValueN).length : newValue !== value;

    if (valueHasChanged) {
      // notify the onChange prop that the user is trying to change value
      this.setState({ value: newValue });
      this.handleChange(e, newValue);

      // Heads up! This event handler should be called after `onChange`
      // Notify the onAddItem prop if this is a new value
      if (item['data-additional']) {
        this.props.onAddItem?.call(null, e, { ...this.props, value: selectedValue });
      }
    }

    return value;
  }

  selectItemOnEnter = (e: any) => {

    const { search } = this.props;
    const { open, selectedIndex } = this.state;

    if (!open) {
      return;
    }

    const shouldSelect =
      keyboardKey.getCode(e) === keyboardKey.Enter ||
      // https://github.com/Semantic-Org/Semantic-UI-React/pull/3766
      (!search && keyboardKey.getCode(e) === keyboardKey.Spacebar);

    if (!shouldSelect) {
      return;
    }

    e.preventDefault();

    const optionSize = getMenuOptions({
      value: this.state.value,
      options: this.props.options,
      searchQuery: this.state.searchQuery,

      additionLabel: this.props.additionLabel,
      additionPosition: this.props.additionPosition,
      allowAdditions: this.props.allowAdditions,
      deburr: this.props.deburr,
      multiple: this.props.multiple,
      search: this.props.search,
    }).length;

    if (search && optionSize === 0) return;

    const nextValue = this.makeSelectedItemActive(e, selectedIndex);

    // This is required as selected value may be the same
    this.setState({
      selectedIndex: getSelectedIndex({
        selectedIndex,

        additionLabel: this.props.additionLabel,
        additionPosition: this.props.additionPosition,
        allowAdditions: this.props.allowAdditions,
        deburr: this.props.deburr,
        multiple: this.props.multiple,
        search: this.props.search,

        value: nextValue,
        options: this.props.options,
        searchQuery: '',
      }),
    });

    this.closeOnChange(e);
    this.clearSearchQuery();

    if (search) {
      this.searchRef.current && this.searchRef.current.focus();
    }
  }

  removeItemOnBackspace = (e: any) => {

    const { multiple, search } = this.props;
    const { searchQuery, value } = this.state;

    if (keyboardKey.getCode(e) !== keyboardKey.Backspace) return;
    if (searchQuery || !search || !multiple || _isEmpty(value)) return;
    e.preventDefault();

    // remove most recent value
    const newValue = (value as ValueN).slice(0, -1);

    this.setState({ value: newValue });
    this.handleChange(e, newValue);
  }

  closeOnDocumentClick = (e: any) => {

    if (!this.props.closeOnBlur) return;

    // If event happened in the dropdown, ignore it
    if (this.ref.current && doesNodeContainClick(this.ref.current!, e)) return;

    this.close();
  }

  // ----------------------------------------
  // Component Event Handlers
  // ----------------------------------------

  handleMouseDown = (e: any) => {

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
      this.searchRef.current && this.searchRef.current.focus();
      return;
    }
    if (searchQuery.length >= minCharacters! || minCharacters === 1) {
      this.open(e);
      return;
    }
    this.searchRef.current && this.searchRef.current.focus();
  }

  handleIconClick = (e: any) => {

    const { clearable } = this.props;
    const hasValue = this.hasValue();

    this.props.onClick?.call(null, e, this.props);
    // prevent handleClick()
    e.stopPropagation();

    (clearable && hasValue) ? this.clearValue(e) : this.toggle(e);
  }

  handleItemClick = (e: any, item: DropdownItemProps) => {

    const { multiple, search } = this.props;
    const { value: currentValue } = this.state;
    const { value } = item;

    // prevent toggle() in handleClick()
    e.stopPropagation();

    // prevent closeOnDocumentClick() if multiple or item is disabled
    if (multiple || item.disabled) e.nativeEvent.stopImmediatePropagation();

    if (item.disabled) return;

    const isAdditionItem = item['data-additional'];
    const newValue = multiple ? Array.from(new Set([...currentValue as ValueN, value])) : value;
    const valueHasChanged = multiple
      ? !!(newValue as ValueN).filter(x => !(currentValue as ValueN).includes(x)).length
      : newValue !== currentValue;

    // notify the onChange prop that the user is trying to change value
    if (valueHasChanged) {
      this.setState({ value: newValue as any });
      this.handleChange(e, newValue);
    }

    this.clearSearchQuery();

    const target = (search) ? this.searchRef.current : this.ref.current;
    target && target.focus();

    this.closeOnChange(e);

    // Heads up! This event handler should be called after `onChange`
    // Notify the onAddItem prop if this is a new value
    if (isAdditionItem) {
      this.props.onAddItem?.call(null, e, { ...this.props, value });
    }
  }

  handleFocus = (e: any) => {

    const { focus } = this.state;

    if (focus) return;

    this.props.onFocus?.call(null, e, this.props);
    this.setState({ focus: true });
  }

  handleBlur = (e: any) => {

    // Heads up! Don't remove this.
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/1315
    const currentTarget = e.currentTarget;
    if (currentTarget && currentTarget.contains(document.activeElement)) return;

    const { closeOnBlur, multiple, selectOnBlur } = this.props;
    // do not "blur" when the mouse is down inside of the Dropdown
    if (this.isMouseDown) return;

    this.props.onBlur?.call(null, e, this.props);

    if (selectOnBlur && !multiple) {
      this.makeSelectedItemActive(e, this.state.selectedIndex);
      if (closeOnBlur) this.close();
    }

    this.setState({ focus: false });
    this.clearSearchQuery();
  }

  handleSearchChange = (e: any, { value }: any) => {

    // prevent propagating to this.props.onChange()
    e.stopPropagation();

    const { minCharacters } = this.props;
    const { open } = this.state;
    const newQuery = value;

    this.props.onSearchChange?.call(null, e, { ...this.props, searchQuery: newQuery });
    this.setState({ searchQuery: newQuery, selectedIndex: 0 });

    // open search dropdown on search query
    if (!open && newQuery.length >= minCharacters!) {
      this.open();
      return;
    }
    // close search dropdown if search query is too small
    if (open && minCharacters !== 1 && newQuery.length < minCharacters!) this.close();
  }

  handleKeyDown = (e: any) => {
    this.moveSelectionOnKeyDown(e);
    this.openOnArrow(e);
    this.selectItemOnEnter(e);

    this.props.onKeyDown?.call(null, e);
  }

  // ----------------------------------------
  // Getters
  // ----------------------------------------

  getSelectedItem = (selectedIndex: number) => {
    const options = getMenuOptions({
      value: this.state.value,
      options: this.props.options,
      searchQuery: this.state.searchQuery,

      additionLabel: this.props.additionLabel,
      additionPosition: this.props.additionPosition,
      allowAdditions: this.props.allowAdditions,
      deburr: this.props.deburr,
      multiple: this.props.multiple,
      search: this.props.search,
    });

    return options?.[selectedIndex];
  }

  getItemByValue = (value: any) => {
    const { options } = this.props;

    return options ? options.find(x => x.value === value) : undefined;
  }

  // getDropdownAriaOptions = () => {
  //   const { loading, disabled, search, multiple } = this.props;
  //   const { open } = this.state;
  //   const ariaOptions = {
  //     role: search ? 'combobox' : 'listbox',
  //     'aria-busy': loading,
  //     'aria-disabled': disabled,
  //     'aria-expanded': !!open,
  //   };
  //   if (ariaOptions.role === 'listbox') {
  //     ariaOptions['aria-multiselectable'] = multiple;
  //   }
  //   return ariaOptions;
  // }

  getDropdownMenuAriaOptions() {
    const { search, multiple } = this.props;
    const ariaOptions = {} as any;

    if (search) {
      ariaOptions['aria-multiselectable'] = multiple;
      ariaOptions.role = 'listbox';
    }
    return ariaOptions;
  }

  // ----------------------------------------
  // Setters
  // ----------------------------------------

  clearSearchQuery = () => {

    const { searchQuery } = this.state;
    if (searchQuery === undefined || searchQuery === '') return;

    this.setState({ searchQuery: '' });
  }

  handleLabelClick = (e: any, props: LabelProps) => {

    // prevent focusing search input on click
    e.stopPropagation();

    this.setState({ selectedLabel: props.value });
    this.props.onLabelClick?.call(null, e, props);
  }

  handleLabelRemove = (e: any, props: LabelProps) => {

    // prevent focusing search input on click
    e.stopPropagation();
    const { value } = this.state;
    const newValue = (value as ValueN).filter(x => x !== props.value);

    this.setState({ value: newValue });
    this.handleChange(e, newValue);
  }

  getSelectedIndexAfterMove = (offset: number, startIndex = this.state.selectedIndex): number | undefined => {

    const options = getMenuOptions({
      value: this.state.value,
      options: this.props.options,
      searchQuery: this.state.searchQuery,

      additionLabel: this.props.additionLabel,
      additionPosition: this.props.additionPosition,
      allowAdditions: this.props.allowAdditions,
      deburr: this.props.deburr,
      multiple: this.props.multiple,
      search: this.props.search,
    });

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
    } else if (nextIndex > lastIndex) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = lastIndex;
    }

    if (options[nextIndex].disabled) {
      return this.getSelectedIndexAfterMove(offset, nextIndex);
    }

    return nextIndex;
  }

  // ----------------------------------------
  // Overrides
  // ----------------------------------------

  handleIconOverrides = (pprops: any) => {
    const { clearable } = this.props;
    const classes = getClassName(clearable && this.hasValue() && 'clear', pprops.className);

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
    const { multiple } = this.props;
    const newValue = multiple ? [] : '';

    this.setState({ value: newValue });
    this.handleChange(e, newValue);
  }

  computeSearchInputTabIndex = () => {
    const { disabled, tabIndex } = this.props;

    if (tabIndex != null) return tabIndex;
    return disabled ? -1 : 0;
  }

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

  computeTabIndex = () => {
    const { disabled, search, tabIndex } = this.props;

    // don't set a root node tabIndex as the search input has its own tabIndex
    if (search) return undefined;
    if (disabled) return -1;
    return tabIndex == null ? 0 : tabIndex;
  }

  handleSearchInputOverrides = (pprops: any) => ({
    onChange: (e: any, iprops: any) => {
      pprops.onChange?.call(null, e, iprops);
      this.handleSearchChange(e, iprops);
    },
  })

  hasValue = () => {
    const { multiple } = this.props;
    const { value } = this.state;

    return multiple ? (value as ValueN).length > 0 : value != null && value !== '';
  }

  // ----------------------------------------
  // Behavior
  // ----------------------------------------

  scrollSelectedItemIntoView = () => {

    if (!this.ref.current) return;
    const menu = this.ref.current.querySelector('.menu.visible');
    if (!menu) return;
    const item = menu.querySelector<HTMLDivElement>('.item.selected');
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
      this.setState({ upward });
    }
  }

  open = (e = null, triggerSetState = true) => {
    const { disabled, search } = this.props;

    if (disabled) return;
    if (search) this.searchRef.current && this.searchRef.current.focus();

    this.props.onOpen?.call(null, e as any, this.props);

    if (triggerSetState) {
      this.setState({ open: true });
    }
    this.scrollSelectedItemIntoView();
  }

  close = (e?: any, callback = this.handleClose) => {

    if (this.state.open) {
      this.props.onClose?.call(null, e, this.props);
      this.setState({ open: false }, callback);
    }
  }

  handleClose = () => {

    const hasSearchFocus = document.activeElement === this.searchRef.current;
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/627
    // Blur the Dropdown on close so it is blurred after selecting an item.
    // This is to prevent it from re-opening when switching tabs after selecting an item.
    if (!hasSearchFocus && this.ref.current) {
      this.ref.current!.blur();
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

  renderText() {
    const { multiple, placeholder, search, text } = this.props;
    const { searchQuery, selectedIndex, value, open } = this.state;
    const hasValue = this.hasValue();

    const classes = getClassName(
      placeholder && !hasValue && 'default',
      'text',
      search && searchQuery && 'filtered',
    );
    let _text = placeholder;
    let selectedItem;

    if (text) {
      _text = text;
    } else if (open && !multiple) {
      selectedItem = this.getSelectedItem(selectedIndex);
    } else if (hasValue) {
      selectedItem = this.getItemByValue(value);
    }

    return DropdownText.create(selectedItem ? renderItemContent(selectedItem) : _text, { defaultProps: { className: classes } });
  }

  renderSearchInput = () => {
    const { search, searchInput } = this.props;
    const { searchQuery } = this.state;

    return (
      search && (
        // <Ref innerRef={this.searchRef}>
        // {
        DropdownSearchInput.create(searchInput, {
          defaultProps: {
            style: { width: this.computeSearchInputWidth() },
            tabIndex: this.computeSearchInputTabIndex(),
            value: searchQuery,
            ref: this.searchRef,
          },
          overrideProps: this.handleSearchInputOverrides,
        })
        // }
        // </Ref>
      )
    );
  }

  renderSearchSizer = () => {
    const { search, multiple } = this.props;

    return search && multiple && <span className='sizer' ref={this.sizerRef as any} />;
  }

  renderLabels() {

    const { multiple, renderLabel } = this.props;
    const { selectedLabel, value } = this.state;
    if (!multiple || _isEmpty(value)) {
      return;
    }
    const selectedItems = (value as ValueN).map(this.getItemByValue);

    // if no item could be found for a given state value the selected item will be undefined
    // compact the selectedItems so we only have actual objects left
    return selectedItems.filter(Boolean).map((item, index) => {
      const defaultProps: LabelProps = {
        active: item!.value === selectedLabel,
        as: 'a',
        key: item!.key ?? item!.value,
        onClick: this.handleLabelClick,
        onRemove: this.handleLabelRemove,
        value: item!.value,
      };

      return Label.create(renderLabel!(item!, index, defaultProps), { defaultProps });
    });
  }

  renderOptions() {
    const { lazyLoad, multiple, search, noResultsMessage } = this.props;
    const { open, selectedIndex, value } = this.state;

    // lazy load, only render options when open
    if (lazyLoad && !open) return null;

    const options = getMenuOptions({
      value: this.state.value,
      options: this.props.options,
      searchQuery: this.state.searchQuery,

      additionLabel: this.props.additionLabel,
      additionPosition: this.props.additionPosition,
      allowAdditions: this.props.allowAdditions,
      deburr: this.props.deburr,
      multiple: this.props.multiple,
      search: this.props.search,
    });

    if (noResultsMessage !== null && search && _isEmpty(options)) {
      return <div className='message'>{noResultsMessage}</div>;
    }

    const isActive = multiple
      ? (optValue: any) => (value as ValueN).includes(optValue)
      : (optValue: any) => optValue === value;

    return options.map((opt, i) =>
      DropdownItem.create({
        active: isActive(opt.value),
        onClick: this.handleItemClick,
        selected: selectedIndex === i,
        ...opt,
        key: opt.key ?? opt.value,
        // Needed for handling click events on disabled items
        style: { ...opt.style, pointerEvents: 'all' },
      }),
    );
  }

  renderMenu() {
    const { children, direction, header } = this.props;
    const { open } = this.state;
    const ariaOptions = this.getDropdownMenuAriaOptions();

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

    const { ElementType, className, rest, ariaOptions, open, focus, icon, trigger } = dropdownRenderProps(this.props, this.state);

    return (
      // <Ref innerRef={this.ref}>
      <ElementType
        ref={this.ref}
        {...rest}
        {...ariaOptions}
        className={className}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        tabIndex={this.computeTabIndex()}
      >
        {this.renderLabels()}
        {this.renderSearchInput()}
        {this.renderSearchSizer()}
        {trigger || this.renderText()}
        {Icon.create(icon, { overrideProps: this.handleIconOverrides, autoGenerateKey: false })}
        {this.renderMenu()}

        {open && <EventStack name='keydown' on={this.closeOnEscape} />}
        {open && <EventStack name='click' on={this.closeOnDocumentClick} />}

        {focus && <EventStack name='keydown' on={this.removeItemOnBackspace} />}
        {focus && !open && <EventStack name='keydown' on={this.openOnSpace} />}
      </ElementType>
      // </Ref>
    );
  }
}

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
  renderLabel: renderItemContent,
  searchInput: 'text',
  selectOnBlur: true,
  selectOnNavigation: true,
  wrapSelection: true,
};

Dropdown.autoControlledProps = ['open', 'searchQuery', 'selectedLabel', 'value', 'upward'];

Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
Dropdown.SearchInput = DropdownSearchInput;
Dropdown.Text = DropdownText;

const dropdownRenderProps = (props: DropdownProps, state: DropdownState) => {

  const {
    as, basic, button, className, compact, disabled, error, fluid, floating, icon, inline, item, labeled, loading, multiple,
    pointing, search, selection, scrolling, simple, trigger, additionLabel, additionPosition, allowAdditions, children, clearable,
    closeOnBlur, closeOnChange, closeOnEscape, deburr, defaultOpen, defaultSearchQuery, defaultSelectedLabel, defaultUpward, defaultValue,
    direction, header, lazyLoad, minCharacters, noResultsMessage, onAddItem, onBlur, onChange, onClick, onClose, onFocus, onLabelClick, onMouseDown,
    onOpen, onSearchChange, open, openOnFocus, options, placeholder, renderLabel, searchInput, searchQuery, selectOnBlur, selectOnNavigation,
    selectedLabel, tabIndex, text, value, upward, wrapSelection,
    ...rest } = props;

  // Classes
  const classes = getClassName(
    'ui',
    // tslint:disable-next-line: object-shorthand-properties-first
    { 'active visible': state.open, disabled, error, loading, basic, button, compact, fluid, floating, inline, labeled, item, multiple, search, selection, simple, scrolling, upward: state.upward },
    [Use.KeyOrValueKey, { pointing }],
    'dropdown', className,
  );

  const ariaOptions: any = {
    role: search ? 'combobox' : 'listbox',
    'aria-busy': loading,
    'aria-disabled': disabled,
    'aria-expanded': !!state.open,
  };

  if (ariaOptions.role === 'listbox') {
    ariaOptions['aria-multiselectable'] = multiple;
  }

  // tslint:disable-next-line: object-shorthand-properties-first
  return { ElementType: as ?? 'div', rest, className: classes, ariaOptions, icon, trigger, focus: state.focus, open: state.open };
};

const _union = (arr: any[], val: any) => Array.from(new Set([...arr, val]));

const _difference = (arr1: any[], arr2: any[]) => arr1.filter(x => !arr2.includes(x));

// tslint:disable-next-line: triple-equals
const _isEmpty = (value: any) => Array.isArray(value) ? !value.length : typeof value == 'object' ? !Object.keys(value).length : true;

type KV = { key: any; value: any; };

// tslint:disable-next-line: triple-equals
const _isEqual = (arr1?: KV[], arr2?: KV[]) => arr1 == arr2 || (arr1?.length === arr2?.length && arr1!.every(({ key, value }, index) => arr2![index].key === key && arr2![index].value === value));
