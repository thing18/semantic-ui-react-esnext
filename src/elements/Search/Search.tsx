import keyboardKey from 'keyboard-key';
import React, { PureComponent } from 'react';

import { SemanticShorthandItem, eventStack, isBrowser, partitionHTMLProps, htmlInputAttrs, getClassName, Use } from '../../lib';
import { InputProps, Input } from '..';
import { SearchCategory, SearchCategoryProps } from './SearchCategory';
import { SearchResult, SearchResultProps } from './SearchResult';
import { SearchResults } from './SearchResults';

export interface SearchProps extends StrictSearchProps {
  [key: string]: any;
}

interface CategoryResult {
  name: string;
  results: SearchResultProps[];
  [index: string]: any;
}

export interface StrictSearchProps {
  /** An element type to render as (string or function). */
  as?: any;

  // ------------------------------------
  // Behavior
  // ------------------------------------

  /** Initial value of open. */
  defaultOpen?: boolean;

  /** Initial value. */
  defaultValue?: string;

  /** Shorthand for Icon. */
  icon?: any;

  /** Minimum characters to query for results. */
  minCharacters?: number;

  /** Additional text for "No Results" message with less emphasis. */
  noResultsDescription?: React.ReactNode;

  /** Message to display when there are no results. */
  noResultsMessage?: React.ReactNode;

  /** Controls whether or not the results menu is displayed. */
  open?: boolean;

  /**
   * One of:
   * - array of Search.Result props e.g. `{ title: '', description: '' }` or
   * - object of categories e.g. `{ name: '', results: [{ title: '', description: '' }]`
   */
  results?: SearchResultProps[] | CategoryResult[];

  /** Whether the search should automatically select the first result after searching. */
  selectFirstResult?: boolean;

  /** Whether a "no results" message should be shown if no results are found. */
  showNoResults?: boolean;

  /** Current value of the search input. Creates a controlled component. */
  value?: string;

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
  categoryLayoutRenderer?: (props: SearchCategoryProps) => React.ReactElement<any>;

  /**
   * Renders the SearchCategory contents.
   *
   * @param {object} props - The SearchCategory props object.
   * @returns {*} - Renderable SearchCategory contents.
   */
  categoryRenderer?: (props: SearchCategoryProps) => React.ReactElement<any>;

  /**
   * Renders the SearchResult contents.
   *
   * @param {object} props - The SearchResult props object.
   * @returns {*} - Renderable SearchResult contents.
   */
  resultRenderer?: (props: SearchResultProps) => React.ReactElement<any>;

  // ------------------------------------
  // Callbacks
  // ------------------------------------

  /**
   * Called on blur.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: (event: React.MouseEvent<HTMLElement>, data: SearchProps) => void;

  /**
   * Called on focus.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: (event: React.MouseEvent<HTMLElement>, data: SearchProps) => void;

  /**
   * Called on mousedown.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseDown?: (event: React.MouseEvent<HTMLElement>, data: SearchProps) => void;

  /**
   * Called when a result is selected.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onResultSelect?: (event: React.MouseEvent<HTMLDivElement>, data: SearchResultData) => void;

  /**
   * Called on search input change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props, includes current value of search input.
   */
  onSearchChange?: (event: React.MouseEvent<HTMLElement>, data: SearchProps) => void;

  /**
   * Called when the active selection index is changed.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onSelectionChange?: (event: React.MouseEvent<HTMLElement>, data: SearchResultData) => void;

  // ------------------------------------
  // Style
  // ------------------------------------

  /** A search can have its results aligned to its left or right container edge. */
  aligned?: string;

  /** A search can display results from remote content ordered by categories. */
  category?: boolean;

  /** Additional classes. */
  className?: string;

  /** A search can have its results take up the width of its container. */
  fluid?: boolean;

  /** Shorthand for input element. */
  input?: SemanticShorthandItem<InputProps>;

  /** A search can show a loading indicator. */
  loading?: boolean;

  /** A search can have different sizes. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';
}

export interface SearchResultData extends SearchProps {
  result: any;
}

// interface CSearch extends React.ComponentClass<SearchProps> {
//   Category: typeof SearchCategory;
//   Result: typeof SearchResult;
//   Results: typeof SearchResults;
// }

interface State {

  open: boolean;
  value: any;
  focus: boolean;
  selectedIndex: number;
  searchClasses: string;
  prevValue: any;
}

/**
 * A search module allows a user to query for results from a selection of data
 */
export class Search extends PureComponent<SearchProps, State> {

  static propTypes: any;

  static defaultProps = {
    icon: 'search',
    input: 'text',
    minCharacters: 1,
    noResultsMessage: 'No results found.',
    showNoResults: true,
  };

  // static autoControlledProps = ['open', 'value'];

  static Category = SearchCategory;
  static Result = SearchResult;
  static Results = SearchResults;

  isMouseDown: boolean;

  constructor(props: SearchProps) {
    super(props);

    this.state = {
      open: props.open ?? props.defaultOpen ?? false,
      value: props.value ?? props.defaultValue ?? '',
      focus: false,
      selectedIndex: props.selectFirstResult ? 0 : -1,
      searchClasses: '',
      prevValue: props.value ?? props.defaultValue ?? '',
    };

    this.isMouseDown = false;
  }

  // static getAutoControlledStateFromProps(props: SearchProps, state: State) {

  //   // We need to store a `prevValue` to compare as in `getDerivedStateFromProps` we don't have
  //   // prevState
  //   if (typeof state.prevValue !== 'undefined' && (state.prevValue === state.value)) {
  //     return { prevValue: state.value };
  //   }

  //   const selectedIndex = props.selectFirstResult ? 0 : -1;

  //   // tslint:disable-next-line: object-shorthand-properties-first
  //   return { prevValue: state.value, selectedIndex };
  // }

  static getDerivedStateFromProps(props: SearchProps, state: State) {

    // Solve the next state for autoControlledProps
    const newState = { ...state };
    if (props.open !== undefined) newState.open = props.open;
    if (props.value !== undefined) newState.value = props.value;

    // Due to the inheritance of the AutoControlledComponent we should call its
    // getAutoControlledStateFromProps() and merge it with the existing state

    const computedState = (typeof newState.prevValue !== 'undefined' && (newState.prevValue === newState.value))
      ? { prevValue: newState.value }
      : { prevValue: newState.value, selectedIndex: props.selectFirstResult ? 0 : -1 };

    // We should follow the idea of getDerivedStateFromProps() and return only modified state
    return { ...newState, ...computedState };
  }

  // shouldComponentUpdate(nextProps: SearchProps, nextState: State) {
  //   return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
  // }

  componentDidUpdate(prevProps: SearchProps, prevState: State) {

    // focused / blurred
    if (!prevState.focus && this.state.focus) {

      if (!this.isMouseDown) this.tryOpen();

      if (this.state.open) {
        eventStack.sub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
      }
    } else if (prevState.focus && !this.state.focus) {

      if (!this.isMouseDown) this.setState({ open: false });

      eventStack.unsub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
    }

    // opened / closed
    if (!prevState.open && this.state.open) {

      this.setState({ open: true });
      eventStack.sub('click', this.closeOnDocumentClick);
      eventStack.sub('keydown', [
        this.closeOnEscape,
        this.moveSelectionOnKeyDown,
        this.selectItemOnEnter,
      ]);
    } else if (prevState.open && !this.state.open) {

      this.setState({ open: false });
      eventStack.unsub('click', this.closeOnDocumentClick);
      eventStack.unsub('keydown', [
        this.closeOnEscape,
        this.moveSelectionOnKeyDown,
        this.selectItemOnEnter,
      ]);
    }
  }

  componentWillUnmount() {

    eventStack.unsub('click', this.closeOnDocumentClick);
    eventStack.unsub('keydown', [
      this.closeOnEscape,
      this.moveSelectionOnKeyDown,
      this.selectItemOnEnter,
    ]);
  }

  // ----------------------------------------
  // Document Event Handlers
  // ----------------------------------------

  handleResultSelect = (e: any, result: any) => this.props.onResultSelect?.call(null, e, { ...this.props, result });

  handleSelectionChange = (e: any) => this.props.onSelectionChange?.call(null, e, { ...this.props, result: this.getSelectedResult() });

  closeOnEscape = (e: any) => {
    if (keyboardKey.getCode(e) !== keyboardKey.Escape) return;
    e.preventDefault();
    this.setState({ open: false });
  }

  moveSelectionOnKeyDown = (e: any) => {

    switch (keyboardKey.getCode(e)) {
      case keyboardKey.ArrowDown:
        e.preventDefault();
        this.moveSelectionBy(e, 1);
        return;

      case keyboardKey.ArrowUp:
        e.preventDefault();
        this.moveSelectionBy(e, -1);
    }
  }

  selectItemOnEnter = (e: any) => {

    if (keyboardKey.getCode(e) !== keyboardKey.Enter) return;

    const result = this.getSelectedResult();

    // prevent selecting null if there was no selected item value
    if (!result) return;

    e.preventDefault();

    // notify the onResultSelect prop that the user is trying to change value
    this.setValue(result.title);
    this.handleResultSelect(e, result);
    this.setState({ open: false });
  }

  closeOnDocumentClick = () => this.setState({ open: false });

  // ----------------------------------------
  // Component Event Handlers
  // ----------------------------------------

  handleMouseDown = (e: any) => {

    this.isMouseDown = true;
    this.props.onMouseDown?.call(null, e, this.props);
    eventStack.sub('mouseup', this.handleDocumentMouseUp);
  }

  handleDocumentMouseUp = () => {

    this.isMouseDown = false;
    eventStack.unsub('mouseup', this.handleDocumentMouseUp);
  }

  handleInputClick = (e: any) => {

    // prevent closeOnDocumentClick()
    e.nativeEvent.stopImmediatePropagation();
    this.tryOpen();
  }

  handleItemClick = (e: any, { id }: any) => {

    const result = this.getSelectedResult(id);

    // prevent closeOnDocumentClick()
    e.nativeEvent.stopImmediatePropagation();

    // notify the onResultSelect prop that the user is trying to change value
    this.setValue(result.title);
    this.handleResultSelect(e, result);
    this.setState({ open: false });
  }

  // Heads up! We should prevent default to prevent blur events.
  // https://github.com/Semantic-Org/Semantic-UI-React/issues/3298
  handleItemMouseDown = (e: any) => e.preventDefault();

  handleFocus = (e: any) => {

    this.props.onFocus?.call(null, e, this.props);
    this.setState({ focus: true });
  }

  handleBlur = (e: any) => {

    this.props.onBlur?.call(null, e, this.props);
    this.setState({ focus: false });
  }

  handleSearchChange = (e: any) => {

    // prevent propagating to this.props.onChange()
    e.stopPropagation();
    const { minCharacters } = this.props;
    const { open } = this.state;
    const newQuery = e.target.value;

    this.props.onSearchChange?.call(null, e, { ...this.props, value: newQuery });

    // open search dropdown on search query
    if (newQuery.length < minCharacters!) {
      this.setState({ open: false });
    } else if (!open) {
      this.tryOpen(newQuery);
    }

    this.setValue(newQuery);
  }

  // ----------------------------------------
  // Getters
  // ----------------------------------------

  getFlattenedResults = () => {
    const { category, results } = this.props;

    return !category
      ? results as SearchResultProps[]
      : (results as CategoryResult[]).reduce((memo, categoryData) => memo.concat(categoryData.results), [] as SearchResultProps[]);
  }

  getSelectedResult = (index = this.state.selectedIndex) => this.getFlattenedResults()[index];

  // ----------------------------------------
  // Setters
  // ----------------------------------------

  setValue = (value: any) => this.setState({ value, selectedIndex: this.props.selectFirstResult ? 0 : -1 });

  moveSelectionBy = (e: any, offset: number) => {

    const { selectedIndex } = this.state;

    const results = this.getFlattenedResults();
    const lastIndex = results.length - 1;

    // next is after last, wrap to beginning
    // next is before first, wrap to end
    let nextIndex = selectedIndex + offset;
    if (nextIndex > lastIndex) nextIndex = 0;
    else if (nextIndex < 0) nextIndex = lastIndex;

    this.setState({ selectedIndex: nextIndex });
    this.scrollSelectedItemIntoView();
    this.handleSelectionChange(e);
  }

  // ----------------------------------------
  // Behavior
  // ----------------------------------------

  scrollSelectedItemIntoView = () => {

    // Do not access document when server side rendering
    if (!isBrowser()) return;

    const menu = document.querySelector('.ui.search.active.visible .results.visible');
    if (!menu) return;

    const item = menu.querySelector('.result.active') as HTMLElement;
    if (!item) return;

    const isOutOfUpperView = item.offsetTop < menu.scrollTop;
    const isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight;

    if (isOutOfUpperView) {
      menu.scrollTop = item.offsetTop;
    } else if (isOutOfLowerView) {
      menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight;
    }
  }

  // Open if the current value is greater than the minCharacters prop
  tryOpen = (currentValue = this.state.value) => {

    const { minCharacters } = this.props;
    if (currentValue.length < minCharacters!) return;

    this.setState({ open: true });
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  private renderNoResults = () => {
    const { noResultsDescription, noResultsMessage } = this.props;

    return (
      <div className='message empty'>
        <div className='header'>{noResultsMessage}</div>
        {noResultsDescription && <div className='description'>{noResultsDescription}</div>}
      </div>
    );
  }

  /**
   * Offset is needed for determining the active item for results within a
   * category. Since the index is reset to 0 for each new category, an offset
   * must be passed in.
   */
  private renderResult = ({ childKey, ...result }: SearchResultProps, index: number, _array: any, offset = 0) => {
    const { resultRenderer } = this.props;
    const { selectedIndex } = this.state;
    const offsetIndex = index + offset;

    return (
      <SearchResult
        key={childKey || result.id || result.title}
        active={selectedIndex === offsetIndex}
        onClick={this.handleItemClick}
        onMouseDown={this.handleItemMouseDown}
        renderer={resultRenderer as any}
        {...result}
        id={offsetIndex} // Used to lookup the result on item click
      />
    );
  }

  private renderCategories = () => {
    const { categoryLayoutRenderer, categoryRenderer, results: categories } = this.props;
    const { selectedIndex } = this.state;

    let count = 0;

    return (categories as CategoryResult[]).map(({ childKey, ...category }) => {

      const categoryProps = {
        key: childKey || category.name,
        active: (selectedIndex >= count && selectedIndex < count + category.results.length),
        layoutRenderer: categoryLayoutRenderer,
        renderer: categoryRenderer,
        ...category,
      };
      const renderFn = (item: any, index: number, array: any) => this.renderResult(item, index, array, count);

      count += category.results.length;

      return <SearchCategory {...categoryProps}>{category.results.map(renderFn) as any}</SearchCategory>;
    });
  }

  public render() {

    const { searchClasses, focus, open, value } = this.state;
    const {
      as: ElementType = 'div', defaultOpen, defaultValue, icon, minCharacters, noResultsDescription, noResultsMessage, open: _1,
      results, selectFirstResult, showNoResults, value: _2, categoryLayoutRenderer, categoryRenderer, resultRenderer, onBlur, onFocus,
      onMouseDown, onResultSelect, onSearchChange, onSelectionChange, aligned, category, className, fluid, input, loading,
      size, ...unhandled } = this.props;

    // Classes
    const classes = getClassName('ui', open && 'active visible' as any, size, searchClasses, { category, focus, fluid, loading }, [Use.ValueKey, { aligned }], 'search', className);

    const [htmlInputProps, rest] = partitionHTMLProps(unhandled, { htmlProps: htmlInputAttrs });

    let menuContent;
    if (!Array.isArray(results) || !results.length) {
      menuContent = showNoResults ? this.renderNoResults() : null;
    } else {
      menuContent = category ? this.renderCategories() : (results as SearchResultProps[]).map(this.renderResult);
    }

    return (
      <ElementType
        {...rest}
        className={classes}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseDown={this.handleMouseDown}
      >
        {
          Input.create(input, {
            autoGenerateKey: false,
            defaultProps: {
              ...htmlInputProps,
              icon,
              value,
              input: { className: 'prompt', tabIndex: '0', autoComplete: 'off' },
              onChange: this.handleSearchChange,
              onClick: this.handleInputClick,
            },
          })}
        {menuContent && <SearchResults className={open ? 'visible' : ''}>{menuContent}</SearchResults>}
      </ElementType>
    );
  }
}
