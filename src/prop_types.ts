// import _ from 'lodash/fp';
import _memoize from 'lodash/fp/memoize';
import _flow from 'lodash/fp/flow';
import _map from 'lodash/fp/map';
import _min from 'lodash/fp/min';
import _sum from 'lodash/fp/sum';
import _sortBy from 'lodash/fp/sortBy';
import _take from 'lodash/fp/take';
import _compact from 'lodash/fp/compact';
import _keys from 'lodash/fp/keys';
import _isNil from 'lodash/fp/isNil';
import _isFunction from 'lodash/fp/isFunction';
import _pick from 'lodash/fp/pick';
import _trim from 'lodash/fp/trim';
import _difference from 'lodash/fp/difference';
import _isObject from 'lodash/fp/isObject';
import _isPlainObject from 'lodash/fp/isPlainObject';

import _without from 'lodash/without';
import _uniq from 'lodash/uniq';

import leven from './lib/leven';
import PropTypes from 'prop-types';

import { numberToWordMap } from './lib';
import {
  Image, ImageGroup,
  Icon, IconGroup,
  Container,
  Divider,
  Flag,
  Header,
  HeaderContent,
  HeaderSubheader,
  Input,
  List, ListList, ListItem, ListContent, ListDescription, ListHeader, ListIcon,
  Loader,
  Placeholder, PlaceholderHeader, PlaceholderImage, PlaceholderLine, PlaceholderParagraph,
  Reveal, RevealContent,
  Segment, SegmentGroup, SegmentInline,
  Step, StepContent, StepDescription, StepGroup, StepTitle,
  Label, LabelDetail, LabelGroup,
  Button, ButtonContent, ButtonGroup, ButtonOr,
  Dropdown,
  Table, TableRow, TableCell, TableHeaderCell, TableHeader, TableFooter, TableBody,
  MessageList, MessageItem, MessageHeader, MessageContent, Message,
  MenuMenu, MenuHeader, MenuItem, Menu,
  GridRow, GridColumn, Grid,
  FormTextArea, FormSelect, FormRadio, FormInput, FormGroup, FormField, FormDropdown, FormCheckbox, FormButton, Form,
  BreadcrumbSection, BreadcrumbDivider, Breadcrumb,
  TextArea,
  Rail,
  Checkbox,
  Dimmer, DimmerDimmable, DimmerInner,
  DropdownMenu, DropdownItem, DropdownHeader, DropdownSearchInput, DropdownDivider,
  Search, SearchResults, SearchResult, SearchCategoryLayout, SearchCategory,
  Tab, TabPane,
  Embed,
  Modal, ModalActions, ModalContent, ModalDescription, ModalHeader,
  Progress,
  Rating, RatingIcon,
  SidebarPusher, SidebarPushable, Sidebar,
  Sticky,
  Transition, TransitionGroup,
  TransitionablePortal,
  Select,
  Responsive,
  Radio,
  PaginationItem,
  Pagination,
  Portal, PortalInner,
  Accordion, AccordionAccordion, AccordionContent, AccordionPanel, AccordionTitle,
  Confirm,
  MountNode,
  Visibility,
  PopupContent, Popup, PopupHeader,
  StatisticValue, StatisticLabel, StatisticGroup, Statistic,
  ItemMeta, ItemImage, ItemHeader, ItemGroup, ItemExtra, ItemDescription, ItemContent, Item,
  FeedUser, FeedSummary, FeedMeta, FeedLike, FeedLabel, FeedExtra, FeedEvent, FeedDate, FeedContent, Feed,
  CommentText, CommentMetadata, CommentGroup, CommentContent, CommentAvatar, CommentAuthor, CommentActions, CommentAction, Comment,
  CardMeta, CardHeader, CardGroup, CardDescription, CardContent, Card,
  Advertisement,
} from './components';
import { positions } from './components/Popup/lib/positions';

const typeOf = (v: any) => Object.prototype.toString.call(v);

/**
 * Ensure a prop is a valid DOM node.
 */
const domNode = (props: { [x: string]: any; }, propName: string | number) => {
  // skip if prop is undefined
  if (props[propName] === undefined) return;
  // short circle for SSR env
  if (typeof Element === 'undefined') return;
  // skip if prop is valid
  if (props[propName] instanceof Element) return;

  return new Error(`Invalid prop "${propName}" supplied, expected a DOM node.`);
};

/**
 * Similar to PropTypes.oneOf but shows closest matches.
 * Word order is ignored allowing `left chevron` to match `chevron left`.
 * Useful for very large lists of options (e.g. Icon name, Flag name, etc.)
 * @param {string[]} suggestions An array of allowed values.
 */
const suggest = (suggestions: string[]) => {
  if (!Array.isArray(suggestions)) {
    throw new Error('Invalid argument supplied to suggest, expected an instance of array.');
  }

  /* eslint-disable max-nested-callbacks */
  const findBestSuggestions = _memoize((str) => {
    const propValueWords = str.split(' ');

    return _flow(
      _map((suggestion: string) => {
        const suggestionWords = suggestion.split(' ');

        const propValueScore = _flow(
          _map((x: string) => _map((y) => leven(x, y), suggestionWords)),
          _map(_min),
          _sum,
        )(propValueWords);

        const suggestionScore = _flow(
          _map((x: string) => _map((y) => leven(x, y), propValueWords)),
          _map(_min),
          _sum,
        )(suggestionWords);

        return { suggestion, score: propValueScore + suggestionScore };
      }),
      _sortBy(['score', 'suggestion']),
      _take(3),
    )(suggestions);
  });
  /* eslint-enable max-nested-callbacks */

  // Convert the suggestions list into a hash map for O(n) lookup times. Ensure
  // the words in each key are sorted alphabetically so that we have a consistent
  // way of looking up a value in the map, i.e. we can sort the words in the
  // incoming propValue and look that up without having to check all permutations.
  const suggestionsLookup = suggestions.reduce((acc, key) => {
    acc[
      key
        .split(' ')
        .sort()
        .join(' ')
    ] = true;
    return acc;
  }, {} as any);

  return (props: any, propName: string, componentName: string) => {
    const propValue = props[propName];

    // skip if prop is undefined or is included in the suggestions
    if (!propValue || suggestionsLookup[propValue]) return;

    // check if the words were correct but ordered differently.
    // Since we're matching for classNames we need to allow any word order
    // to pass validation, e.g. `left chevron` vs `chevron left`.
    const propValueSorted = propValue
      .split(' ')
      .sort()
      .join(' ');
    if (suggestionsLookup[propValueSorted]) return;

    // find best suggestions
    const bestMatches = findBestSuggestions(propValue);

    // skip if a match scored 0
    if (bestMatches.some((x: any) => x.score === 0)) return;

    return new Error(
      [
        `Invalid prop \`${propName}\` of value \`${propValue}\` supplied to \`${componentName}\`.`,
        `\n\nInstead of \`${propValue}\`, did you mean:`,
        bestMatches.map((x: any) => `\n  - ${x.suggestion}`).join(''),
        '\n',
      ].join(''),
    );
  };
};

/**
 * Disallow other props from being defined with this prop.
 * @param {string[]} disallowedProps An array of props that cannot be used with this prop.
 */
const disallow = (disallowedProps: string[]) => (props: any, propName: string, componentName: string) => {
  if (!Array.isArray(disallowedProps)) {
    throw new Error(
      [
        'Invalid argument supplied to disallow, expected an instance of array.',
        ` See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(''),
    );
  }

  // skip if prop is undefined
  if (_isNil(props[propName]) || props[propName] === false) return;

  // find disallowed props with values
  const disallowed = disallowedProps.reduce((acc, disallowedProp) => {
    if (!_isNil(props[disallowedProp]) && props[disallowedProp] !== false) {
      return [...acc, disallowedProp];
    }
    return acc;
  }, [] as any);

  if (disallowed.length > 0) {
    return new Error(
      [
        `Prop \`${propName}\` in \`${componentName}\` conflicts with props: \`${disallowed.join(
          '`, `',
        )}\`.`,
        'They cannot be defined together, choose one or the other.',
      ].join(' '),
    );
  }
};

/**
 * Ensure a prop adherers to multiple prop type validators.
 * @param {any[]} validators An array of propType functions.
 */
const every = (validators: any[]) => (props: any, propName: any, componentName: any, ...rest: any) => {
  if (!Array.isArray(validators)) {
    throw new Error(
      [
        'Invalid argument supplied to every, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    );
  }

  const errors = _flow(
    _map((validator) => {
      if (typeof validator !== 'function') {
        throw new Error(
          `every() argument "validators" should contain functions, found: ${typeOf(validator)}.`,
        );
      }
      return validator(props, propName, componentName, ...rest);
    }),
    _compact,
  )(validators);

  // we can only return one error at a time
  return errors[0];
};

/**
 * Ensure a prop adherers to at least one of the given prop type validators.
 * @param {any[]} validators An array of propType functions.
 */
const some = (validators: any[]) => (props: any, propName: any, componentName: any, ...rest: any) => {
  if (!Array.isArray(validators)) {
    throw new Error(
      [
        'Invalid argument supplied to some, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    );
  }

  const errors = _compact<any>(_map<any>(validators, (validator: any) => {
    if (!_isFunction(validator)) {
      throw new Error(`some() argument "validators" should contain functions, found: ${typeOf(validator)}.`);
    }
    return validator(props, propName, componentName, ...rest) as any;
  }) as any) as any;

  // fail only if all validators failed
  if (errors.length === validators.length) {
    const error = new Error('One of these validators must pass:');
    error.message += `\n${(_map(errors, (err: any, i: number) => `[${i + 1}]: ${err.message}`) as any).join('\n')}`;
    return error;
  }
};

/**
 * Ensure a validator passes only when a component has a given propsShape.
 * @param {object} propsShape An object describing the prop shape.
 * @param {function} validator A propType function.
 */
const givenProps = (propsShape: any, validator: Function) => (props: any, propName: any, componentName: any, ...rest: any) => {
  if (!_isPlainObject(propsShape)) {
    throw new Error(
      [
        'Invalid argument supplied to givenProps, expected an object.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    );
  }

  if (typeof validator !== 'function') {
    throw new Error(
      [
        'Invalid argument supplied to givenProps, expected a function.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    );
  }

  const shouldValidate = _keys(propsShape).every((key: any) => {
    const val = propsShape[key];
    // require propShape validators to pass or prop values to match
    return typeof val === 'function'
      ? !val(props, key, componentName, ...rest)
      : val === props[propName];
  });

  if (!shouldValidate) return;

  const error = validator(props, propName, componentName, ...rest);

  if (error) {
    // poor mans shallow pretty print, prevents JSON circular reference errors
    const prettyProps = `{ ${_keys(_pick(_keys(propsShape), props))
      .map((key) => {
        const val = props[key];
        let renderedValue = val;
        if (typeof val === 'string') renderedValue = `"${val}"`;
        else if (Array.isArray(val)) renderedValue = `[${val.join(', ')}]`;
        else if (_isObject(val)) renderedValue = '{...}';

        return `${key}: ${renderedValue}`;
      })
      .join(', ')} }`;

    error.message = `Given props ${prettyProps}: ${error.message}`;
    return error;
  }
};

/**
 * Define prop dependencies by requiring other props.
 * @param {string[]} requiredProps An array of required prop names.
 */
const demand = (requiredProps: string[]) => (props: any, propName: any, componentName: any) => {
  if (!Array.isArray(requiredProps)) {
    throw new Error(
      [
        'Invalid `requiredProps` argument supplied to require, expected an instance of array.',
        ` See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(''),
    );
  }

  // skip if prop is undefined
  if (props[propName] === undefined) return;

  const missingRequired = requiredProps.filter((requiredProp) => props[requiredProp] === undefined);
  if (missingRequired.length > 0) {
    return new Error(
      `\`${propName}\` prop in \`${componentName}\` requires props: \`${missingRequired.join(
        '`, `',
      )}\`.`,
    );
  }
};

/**
 * Ensure an multiple prop contains a string with only possible values.
 * @param {string[]} possible An array of possible values to prop.
 */
const multipleProp = (possible: string[]) => (props: any, propName: any, componentName: any) => {
  if (!Array.isArray(possible)) {
    throw new Error(
      [
        'Invalid argument supplied to some, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    );
  }

  const propValue = props[propName];

  // skip if prop is undefined
  if (_isNil(propValue) || propValue === false) return;

  const values = propValue
    .replace('large screen', 'large-screen')
    .replace(/ vertically/g, '-vertically')
    .split(' ')
    .map((val: any) => _trim(val).replace('-', ' '));
  const invalid = _difference(values, possible) as any;

  // fail only if there are invalid values
  if (invalid.length > 0) {
    return new Error(
      `\`${propName}\` prop in \`${componentName}\` has invalid values: \`${invalid.join(
        '`, `',
      )}\`.`,
    );
  }
};

/**
 * Ensure a component can render as a node passed as a prop value in place of children.
 */
const contentShorthand = (props: any, pname: any, cname: any, ...args: any[]) => every([disallow(['children']), PropTypes.node])(props, pname, cname, ...args);

/**
 * Item shorthand is a description of a component that can be a literal,
 * a props object, or an element.
 */
const itemShorthand = (props: any, pname: any, cname: any, ...args: any[]) =>
  every([
    disallow(['children']),
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.object])),
    ]),
  ])(props, pname, cname, ...args);

/**
 * Collection shorthand ensures a prop is an array of item shorthand.
 */
const collectionShorthand = (props: any, pname: any, cname: any, ...args: any[]) => every([disallow(['children']), PropTypes.arrayOf(itemShorthand)])(props, pname, cname, ...args);

/**
 * Show a deprecated warning for component props with a help message and optional validator.
 * @param {string} help A help message to display with the deprecation warning.
 * @param {function} [validator] A propType function.
 */
const deprecate = (help: string, validator: any) => (props: any, propName: any, componentName: any, ...args: any) => {
  if (typeof help !== 'string') {
    throw new Error(
      [
        'Invalid `help` argument supplied to deprecate, expected a string.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    );
  }

  // skip if prop is undefined
  if (props[propName] === undefined) return;

  // deprecation error and help
  const error = new Error(`The \`${propName}\` prop in \`${componentName}\` is deprecated.`);
  if (help) error.message += ` ${help}`;

  // add optional validation error message
  if (validator) {
    if (typeof validator === 'function') {
      const validationError = validator(props, propName, componentName, ...args);
      if (validationError) {
        error.message = `${error.message} ${validationError.message}`;
      }
    } else {
      throw new Error(
        [
          'Invalid argument supplied to deprecate, expected a function.',
          `See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(' '),
      );
    }
  }

  return error;
};

/** A checker that matches the React.RefObject type. */
const refObject = PropTypes.shape({
  current: PropTypes.object,
});

/** A checker that matches the React.Ref type. */
const ref = PropTypes.oneOfType([PropTypes.func, refObject]);

const COLORS = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
];
const FLOATS = ['left', 'right'];
const SIZES = ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'];
const TEXT_ALIGNMENTS = ['left', 'center', 'right', 'justified'];
const VERTICAL_ALIGNMENTS = ['bottom', 'middle', 'top'];

const VISIBILITY = ['mobile', 'tablet', 'computer', 'large screen', 'widescreen'];

const WIDTHS = [
  ...Object.keys(numberToWordMap),
  ...Object.keys(numberToWordMap).map(Number),
  ...Object.values(numberToWordMap),
];

const DIRECTIONAL_TRANSITIONS = [
  'browse',
  'browse right',
  'drop',
  'fade',
  'fade up',
  'fade down',
  'fade left',
  'fade right',
  'fly up',
  'fly down',
  'fly left',
  'fly right',
  'horizontal flip',
  'vertical flip',
  'scale',
  'slide up',
  'slide down',
  'slide left',
  'slide right',
  'swing up',
  'swing down',
  'swing left',
  'swing right',
  'zoom',
];
const STATIC_TRANSITIONS = ['jiggle', 'flash', 'shake', 'pulse', 'tada', 'bounce', 'glow'];
const TRANSITIONS = [...DIRECTIONAL_TRANSITIONS, ...STATIC_TRANSITIONS];

// Generated from:
// https://github.com/Semantic-Org/Semantic-UI/blob/master/dist/components/icon.css
const ACCESSIBILITY = [
  'american sign language interpreting',
  'assistive listening systems',
  'audio description',
  'blind',
  'braille',
  'closed captioning',
  'closed captioning outline',
  'deaf',
  'low vision',
  'phone volume',
  'question circle',
  'question circle outline',
  'sign language',
  'tty',
  'universal access',
  'wheelchair',
];
const ARROWS = [
  'angle double down',
  'angle double left',
  'angle double right',
  'angle double up',
  'angle down',
  'angle left',
  'angle right',
  'angle up',
  'arrow alternate circle down',
  'arrow alternate circle down outline',
  'arrow alternate circle left',
  'arrow alternate circle left outline',
  'arrow alternate circle right',
  'arrow alternate circle right outline',
  'arrow alternate circle up',
  'arrow alternate circle up outline',
  'arrow circle down',
  'arrow circle left',
  'arrow circle right',
  'arrow circle up',
  'arrow down',
  'arrow left',
  'arrow right',
  'arrow up',
  'arrows alternate',
  'arrows alternate horizontal',
  'arrows alternate vertical',
  'caret down',
  'caret left',
  'caret right',
  'caret square down',
  'caret square down outline',
  'caret square left',
  'caret square left outline',
  'caret square right',
  'caret square right outline',
  'caret square up',
  'caret square up outline',
  'caret up',
  'cart arrow down',
  'chart line',
  'chevron circle down',
  'chevron circle left',
  'chevron circle right',
  'chevron circle up',
  'chevron down',
  'chevron left',
  'chevron right',
  'chevron up',
  'cloud download',
  'cloud upload',
  'download',
  'exchange',
  'expand arrows alternate',
  'external alternate',
  'external square alternate',
  'hand point down',
  'hand point down outline',
  'hand point left',
  'hand point left outline',
  'hand point right',
  'hand point right outline',
  'hand point up',
  'hand point up outline',
  'hand pointer',
  'hand pointer outline',
  'history',
  'level down alternate',
  'level up alternate',
  'location arrow',
  'long arrow alternate down',
  'long arrow alternate left',
  'long arrow alternate right',
  'long arrow alternate up',
  'mouse pointer',
  'play',
  'random',
  'recycle',
  'redo',
  'redo alternate',
  'reply',
  'reply all',
  'retweet',
  'share',
  'share square',
  'share square outline',
  'sign-in',
  'sign-out',
  'sign-in alternate',
  'sign-out alternate',
  'sort',
  'sort alphabet down',
  'sort alphabet up',
  'sort amount down',
  'sort amount up',
  'sort down',
  'sort numeric down',
  'sort numeric up',
  'sort up',
  'sync',
  'sync alternate',
  'text height',
  'text width',
  'undo',
  'undo alternate',
  'upload',
  'zoom-in',
  'zoom-out',
];
const AUDIO_VIDEO = [
  'audio description',
  'backward',
  'circle',
  'circle outline',
  'closed captioning',
  'closed captioning outline',
  'compress',
  'eject',
  'expand',
  'expand arrows alternate',
  'fast backward',
  'fast forward',
  'file audio',
  'file audio outline',
  'file video',
  'file video outline',
  'film',
  'forward',
  'headphones',
  'microphone',
  'microphone slash',
  'music',
  'pause',
  'pause circle',
  'pause circle outline',
  'phone volume',
  'play',
  'play circle',
  'play circle outline',
  'podcast',
  'random',
  'redo',
  'redo alternate',
  'rss',
  'rss square',
  'step backward',
  'step forward',
  'stop',
  'stop circle',
  'stop circle outline',
  'sync',
  'sync alternate',
  'undo',
  'undo alternate',
  'video',
  'volume down',
  'volume off',
  'volume up',
];
const BUSINESS = [
  'address book',
  'address book outline',
  'address card',
  'address card outline',
  'archive',
  'balance scale',
  'birthday cake',
  'book',
  'briefcase',
  'building',
  'building outline',
  'bullhorn',
  'bullseye',
  'calculator',
  'calendar',
  'calendar outline',
  'calendar alternate',
  'calendar alternate outline',
  'certificate',
  'chart area',
  'chart bar',
  'chart bar outline',
  'chart line',
  'chart pie',
  'clipboard',
  'clipboard outline',
  'coffee',
  'columns',
  'compass',
  'compass outline',
  'copy',
  'copy outline',
  'copyright',
  'copyright outline',
  'cut',
  'edit',
  'edit outline',
  'envelope',
  'envelope outline',
  'envelope open',
  'envelope open outline',
  'envelope square',
  'eraser',
  'fax',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'globe',
  'industry',
  'paperclip',
  'paste',
  'pen square',
  'pencil alternate',
  'percent',
  'phone',
  'phone square',
  'phone volume',
  'registered',
  'registered outline',
  'save',
  'save outline',
  'sitemap',
  'sticky note',
  'sticky note outline',
  'suitcase',
  'table',
  'tag',
  'tags',
  'tasks',
  'thumbtack',
  'trademark',
];
const CHESS = [
  'chess',
  'chess bishop',
  'chess board',
  'chess king',
  'chess knight',
  'chess pawn',
  'chess queen',
  'chess rook',
  'square full',
];
const CODE = [
  'archive',
  'barcode',
  'bath',
  'bug',
  'code',
  'code branch',
  'coffee',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'file code',
  'file code outline',
  'filter',
  'fire extinguisher',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'keyboard',
  'keyboard outline',
  'microchip',
  'qrcode',
  'shield alternate',
  'sitemap',
  'terminal',
  'user secret',
  'window close',
  'window close outline',
  'window maximize',
  'window maximize outline',
  'window minimize',
  'window minimize outline',
  'window restore',
  'window restore outline',
];
const COMMUNICATION = [
  'address book',
  'address book outline',
  'address card',
  'address card outline',
  'american sign language interpreting',
  'assistive listening systems',
  'at',
  'bell',
  'bell outline',
  'bell slash',
  'bell slash outline',
  'bullhorn',
  'comment',
  'comment outline',
  'comment alternate',
  'comment alternate outline',
  'comments',
  'comments outline',
  'envelope',
  'envelope outline',
  'envelope open',
  'envelope open outline',
  'envelope square',
  'fax',
  'inbox',
  'language',
  'microphone',
  'microphone slash',
  'mobile',
  'mobile alternate',
  'paper plane',
  'paper plane outline',
  'phone',
  'phone square',
  'phone volume',
  'rss',
  'rss square',
  'tty',
  'wifi',
];
const COMPUTERS = [
  'desktop',
  'download',
  'hdd',
  'hdd outline',
  'headphones',
  'keyboard',
  'keyboard outline',
  'laptop',
  'microchip',
  'mobile',
  'mobile alternate',
  'plug',
  'power off',
  'print',
  'save',
  'save outline',
  'server',
  'tablet',
  'tablet alternate',
  'tv',
  'upload',
];
const CURRENCY = [
  'dollar sign',
  'euro sign',
  'lira sign',
  'money bill alternate',
  'money bill alternate outline',
  'pound sign',
  'ruble sign',
  'rupee sign',
  'shekel sign',
  'won sign',
  'yen sign',
];
const DATE_TIME = [
  'bell',
  'bell outline',
  'bell slash',
  'bell slash outline',
  'calendar',
  'calendar outline',
  'calendar alternate',
  'calendar alternate outline',
  'calendar check',
  'calendar check outline',
  'calendar minus',
  'calendar minus outline',
  'calendar plus',
  'calendar plus outline',
  'calendar times',
  'calendar times outline',
  'clock',
  'clock outline',
  'hourglass',
  'hourglass outline',
  'hourglass end',
  'hourglass half',
  'hourglass start',
  'stopwatch',
];
const DESIGN = [
  'adjust',
  'clone',
  'clone outline',
  'copy',
  'copy outline',
  'crop',
  'crosshairs',
  'cut',
  'edit',
  'edit outline',
  'eraser',
  'eye',
  'eye dropper',
  'eye slash',
  'eye slash outline',
  'object group',
  'object group outline',
  'object ungroup',
  'object ungroup outline',
  'paint brush',
  'paste',
  'pencil alternate',
  'save',
  'save outline',
  'tint',
];
const EDITORS = [
  'align center',
  'align justify',
  'align left',
  'align right',
  'bold',
  'clipboard',
  'clipboard outline',
  'clone',
  'clone outline',
  'columns',
  'copy',
  'copy outline',
  'cut',
  'edit',
  'edit outline',
  'eraser',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'font',
  'heading',
  'i cursor',
  'indent',
  'italic',
  'linkify',
  'list',
  'list alternate',
  'list alternate outline',
  'list ol',
  'list ul',
  'outdent',
  'paper plane',
  'paper plane outline',
  'paperclip',
  'paragraph',
  'paste',
  'pencil alternate',
  'print',
  'quote left',
  'quote right',
  'redo',
  'redo alternate',
  'reply',
  'reply all',
  'share',
  'strikethrough',
  'subscript',
  'superscript',
  'sync',
  'sync alternate',
  'table',
  'tasks',
  'text height',
  'text width',
  'th',
  'th large',
  'th list',
  'trash',
  'trash alternate',
  'trash alternate outline',
  'underline',
  'undo',
  'undo alternate',
  'unlink',
];
const FILES = [
  'archive',
  'clone',
  'clone outline',
  'copy',
  'copy outline',
  'cut',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'file archive',
  'file archive outline',
  'file audio',
  'file audio outline',
  'file code',
  'file code outline',
  'file excel',
  'file excel outline',
  'file image',
  'file image outline',
  'file pdf',
  'file pdf outline',
  'file powerpoint',
  'file powerpoint outline',
  'file video',
  'file video outline',
  'file word',
  'file word outline',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'paste',
  'save',
  'save outline',
  'sticky note',
  'sticky note outline',
];
const GENDERS = [
  'genderless',
  'mars',
  'mars double',
  'mars stroke',
  'mars stroke horizontal',
  'mars stroke vertical',
  'mercury',
  'neuter',
  'transgender',
  'transgender alternate',
  'venus',
  'venus double',
  'venus mars',
];
const HANDS_GESTURES = [
  'hand lizard',
  'hand lizard outline',
  'hand paper',
  'hand paper outline',
  'hand peace',
  'hand peace outline',
  'hand point down',
  'hand point down outline',
  'hand point left',
  'hand point left outline',
  'hand point right',
  'hand point right outline',
  'hand point up',
  'hand point up outline',
  'hand pointer',
  'hand pointer outline',
  'hand rock',
  'hand rock outline',
  'hand scissors',
  'hand scissors outline',
  'hand spock',
  'hand spock outline',
  'handshake',
  'handshake outline',
  'thumbs down',
  'thumbs down outline',
  'thumbs up',
  'thumbs up outline',
];
const HEALTH = [
  'ambulance',
  'h square',
  'heart',
  'heart outline',
  'heartbeat',
  'hospital',
  'hospital outline',
  'medkit',
  'plus square',
  'plus square outline',
  'stethoscope',
  'user md',
  'wheelchair',
];
const IMAGES = [
  'adjust',
  'bolt',
  'camera',
  'camera retro',
  'clone',
  'clone outline',
  'compress',
  'expand',
  'eye',
  'eye dropper',
  'eye slash',
  'eye slash outline',
  'file image',
  'file image outline',
  'film',
  'id badge',
  'id badge outline',
  'id card',
  'id card outline',
  'image',
  'image outline',
  'images',
  'images outline',
  'sliders horizontal',
  'tint',
];
const INTERFACES = [
  'ban',
  'barcode',
  'bars',
  'beer',
  'bell',
  'bell outline',
  'bell slash',
  'bell slash outline',
  'bug',
  'bullhorn',
  'bullseye',
  'calculator',
  'calendar',
  'calendar outline',
  'calendar alternate',
  'calendar alternate outline',
  'calendar check',
  'calendar check outline',
  'calendar minus',
  'calendar minus outline',
  'calendar plus',
  'calendar plus outline',
  'calendar times',
  'calendar times outline',
  'certificate',
  'check',
  'check circle',
  'check circle outline',
  'check square',
  'check square outline',
  'circle',
  'circle outline',
  'clipboard',
  'clipboard outline',
  'clone',
  'clone outline',
  'cloud',
  'cloud download',
  'cloud upload',
  'coffee',
  'cog',
  'cogs',
  'copy',
  'copy outline',
  'cut',
  'database',
  'dot circle',
  'dot circle outline',
  'download',
  'edit',
  'edit outline',
  'ellipsis horizontal',
  'ellipsis vertical',
  'envelope',
  'envelope outline',
  'envelope open',
  'envelope open outline',
  'eraser',
  'exclamation',
  'exclamation circle',
  'exclamation triangle',
  'external alternate',
  'external square alternate',
  'eye',
  'eye slash',
  'eye slash outline',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'filter',
  'flag',
  'flag outline',
  'flag checkered',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'frown',
  'frown outline',
  'hashtag',
  'heart',
  'heart outline',
  'history',
  'home',
  'i cursor',
  'info',
  'info circle',
  'language',
  'magic',
  'meh',
  'meh outline',
  'microphone',
  'microphone slash',
  'minus',
  'minus circle',
  'minus square',
  'minus square outline',
  'paste',
  'pencil alternate',
  'plus',
  'plus circle',
  'plus square',
  'plus square outline',
  'qrcode',
  'question',
  'question circle',
  'question circle outline',
  'quote left',
  'quote right',
  'redo',
  'redo alternate',
  'reply',
  'reply all',
  'rss',
  'rss square',
  'save',
  'save outline',
  'search',
  'search minus',
  'search plus',
  'share',
  'share alternate',
  'share alternate square',
  'share square',
  'share square outline',
  'shield alternate',
  'sign-in',
  'sign-out',
  'signal',
  'sitemap',
  'sliders horizontal',
  'smile',
  'smile outline',
  'sort',
  'sort alphabet down',
  'sort alphabet up',
  'sort amount down',
  'sort amount up',
  'sort down',
  'sort numeric down',
  'sort numeric up',
  'sort up',
  'star',
  'star outline',
  'star half',
  'star half outline',
  'sync',
  'sync alternate',
  'thumbs down',
  'thumbs down outline',
  'thumbs up',
  'thumbs up outline',
  'times',
  'times circle',
  'times circle outline',
  'toggle off',
  'toggle on',
  'trash',
  'trash alternate',
  'trash alternate outline',
  'trophy',
  'undo',
  'undo alternate',
  'upload',
  'user',
  'user outline',
  'user circle',
  'user circle outline',
  'wifi',
];
const LOGISTICS = [
  'box',
  'boxes',
  'clipboard check',
  'clipboard list',
  'dolly',
  'dolly flatbed',
  'pallet',
  'shipping fast',
  'truck',
  'warehouse',
];
const MAPS = [
  'ambulance',
  'anchor',
  'balance scale',
  'bath',
  'bed',
  'beer',
  'bell',
  'bell outline',
  'bell slash',
  'bell slash outline',
  'bicycle',
  'binoculars',
  'birthday cake',
  'blind',
  'bomb',
  'book',
  'bookmark',
  'bookmark outline',
  'briefcase',
  'building',
  'building outline',
  'car',
  'coffee',
  'crosshairs',
  'dollar sign',
  'eye',
  'eye slash',
  'eye slash outline',
  'fighter jet',
  'fire',
  'fire extinguisher',
  'flag',
  'flag outline',
  'flag checkered',
  'flask',
  'gamepad',
  'gavel',
  'gift',
  'glass martini',
  'globe',
  'graduation cap',
  'h square',
  'heart',
  'heart outline',
  'heartbeat',
  'home',
  'hospital',
  'hospital outline',
  'image',
  'image outline',
  'images',
  'images outline',
  'industry',
  'info',
  'info circle',
  'key',
  'leaf',
  'lemon',
  'lemon outline',
  'life ring',
  'life ring outline',
  'lightbulb',
  'lightbulb outline',
  'location arrow',
  'low vision',
  'magnet',
  'male',
  'map',
  'map outline',
  'map marker',
  'map marker alternate',
  'map pin',
  'map signs',
  'medkit',
  'money bill alternate',
  'money bill alternate outline',
  'motorcycle',
  'music',
  'newspaper',
  'newspaper outline',
  'paw',
  'phone',
  'phone square',
  'phone volume',
  'plane',
  'plug',
  'plus',
  'plus square',
  'plus square outline',
  'print',
  'recycle',
  'road',
  'rocket',
  'search',
  'search minus',
  'search plus',
  'ship',
  'shopping bag',
  'shopping basket',
  'shopping cart',
  'shower',
  'street view',
  'subway',
  'suitcase',
  'tag',
  'tags',
  'taxi',
  'thumbtack',
  'ticket alternate',
  'tint',
  'train',
  'tree',
  'trophy',
  'truck',
  'tty',
  'umbrella',
  'university',
  'utensil spoon',
  'utensils',
  'wheelchair',
  'wifi',
  'wrench',
];
const MEDICAL = [
  'ambulance',
  'band aid',
  'dna',
  'first aid',
  'heart',
  'heart outline',
  'heartbeat',
  'hospital',
  'hospital outline',
  'hospital symbol',
  'pills',
  'plus',
  'stethoscope',
  'syringe',
  'thermometer',
  'user md',
  'weight',
];
const OBJECTS = [
  'ambulance',
  'anchor',
  'archive',
  'balance scale',
  'bath',
  'bed',
  'beer',
  'bell',
  'bell outline',
  'bicycle',
  'binoculars',
  'birthday cake',
  'bomb',
  'book',
  'bookmark',
  'bookmark outline',
  'briefcase',
  'bug',
  'building',
  'building outline',
  'bullhorn',
  'bullseye',
  'bus',
  'calculator',
  'calendar',
  'calendar outline',
  'calendar alternate',
  'calendar alternate outline',
  'camera',
  'camera retro',
  'car',
  'clipboard',
  'clipboard outline',
  'cloud',
  'coffee',
  'cog',
  'cogs',
  'compass',
  'compass outline',
  'copy',
  'copy outline',
  'cube',
  'cubes',
  'cut',
  'envelope',
  'envelope outline',
  'envelope open',
  'envelope open outline',
  'eraser',
  'eye',
  'eye dropper',
  'fax',
  'fighter jet',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'film',
  'fire',
  'fire extinguisher',
  'flag',
  'flag outline',
  'flag checkered',
  'flask',
  'futbol',
  'futbol outline',
  'gamepad',
  'gavel',
  'gem',
  'gem outline',
  'gift',
  'glass martini',
  'globe',
  'graduation cap',
  'hdd',
  'hdd outline',
  'headphones',
  'heart',
  'heart outline',
  'home',
  'hospital',
  'hospital outline',
  'hourglass',
  'hourglass outline',
  'image',
  'image outline',
  'images',
  'images outline',
  'industry',
  'key',
  'keyboard',
  'keyboard outline',
  'laptop',
  'leaf',
  'lemon',
  'lemon outline',
  'life ring',
  'life ring outline',
  'lightbulb',
  'lightbulb outline',
  'lock',
  'lock open',
  'magic',
  'magnet',
  'map',
  'map outline',
  'map marker',
  'map marker alternate',
  'map pin',
  'map signs',
  'medkit',
  'microchip',
  'microphone',
  'mobile',
  'mobile alternate',
  'money bill alternate',
  'money bill alternate outline',
  'moon',
  'moon outline',
  'motorcycle',
  'newspaper',
  'newspaper outline',
  'paint brush',
  'paper plane',
  'paper plane outline',
  'paperclip',
  'paste',
  'paw',
  'pencil alternate',
  'phone',
  'plane',
  'plug',
  'print',
  'puzzle piece',
  'road',
  'rocket',
  'save',
  'save outline',
  'search',
  'shield alternate',
  'shopping bag',
  'shopping basket',
  'shopping cart',
  'shower',
  'snowflake',
  'snowflake outline',
  'space shuttle',
  'star',
  'star outline',
  'sticky note',
  'sticky note outline',
  'stopwatch',
  'subway',
  'suitcase',
  'sun',
  'sun outline',
  'tablet',
  'tablet alternate',
  'tachometer alternate',
  'tag',
  'tags',
  'taxi',
  'thumbtack',
  'ticket alternate',
  'train',
  'trash',
  'trash alternate',
  'trash alternate outline',
  'tree',
  'trophy',
  'truck',
  'tv',
  'umbrella',
  'university',
  'unlock',
  'unlock alternate',
  'utensil spoon',
  'utensils',
  'wheelchair',
  'wrench',
];
const PAYMENTS_SHOPPING = [
  'bell',
  'bell outline',
  'bookmark',
  'bookmark outline',
  'bullhorn',
  'camera',
  'camera retro',
  'cart arrow down',
  'cart plus',
  'certificate',
  'credit card',
  'credit card outline',
  'gem',
  'gem outline',
  'gift',
  'handshake',
  'handshake outline',
  'heart',
  'heart outline',
  'key',
  'shopping bag',
  'shopping basket',
  'shopping cart',
  'star',
  'star outline',
  'tag',
  'tags',
  'thumbs down',
  'thumbs down outline',
  'thumbs up',
  'thumbs up outline',
  'trophy',
];
const SHAPES = [
  'bookmark',
  'bookmark outline',
  'calendar',
  'calendar outline',
  'certificate',
  'circle',
  'circle outline',
  'cloud',
  'comment',
  'comment outline',
  'file',
  'file outline',
  'folder',
  'folder outline',
  'heart',
  'heart outline',
  'map marker',
  'play',
  'square',
  'square outline',
  'star',
  'star outline',
];
const SPINNERS = [
  'asterisk',
  'certificate',
  'circle notch',
  'cog',
  'compass',
  'compass outline',
  'crosshairs',
  'life ring',
  'life ring outline',
  'snowflake',
  'snowflake outline',
  'spinner',
  'sun',
  'sun outline',
  'sync',
];
const SPORTS = [
  'baseball ball',
  'basketball ball',
  'bowling ball',
  'football ball',
  'futbol',
  'futbol outline',
  'golf ball',
  'hockey puck',
  'quidditch',
  'table tennis',
  'volleyball ball',
];
const STATUS = [
  'ban',
  'battery empty',
  'battery full',
  'battery half',
  'battery quarter',
  'battery three quarters',
  'bell',
  'bell outline',
  'bell slash',
  'bell slash outline',
  'calendar',
  'calendar outline',
  'calendar alternate',
  'calendar alternate outline',
  'calendar check',
  'calendar check outline',
  'calendar minus',
  'calendar minus outline',
  'calendar plus',
  'calendar plus outline',
  'calendar times',
  'calendar times outline',
  'cart arrow down',
  'cart plus',
  'exclamation',
  'exclamation circle',
  'exclamation triangle',
  'eye',
  'eye slash',
  'eye slash outline',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'info',
  'info circle',
  'lock',
  'lock open',
  'minus',
  'minus circle',
  'minus square',
  'minus square outline',
  'plus',
  'plus circle',
  'plus square',
  'plus square outline',
  'question',
  'question circle',
  'question circle outline',
  'shield alternate',
  'shopping cart',
  'sign in alternate',
  'sign out alternate',
  'thermometer empty',
  'thermometer full',
  'thermometer half',
  'thermometer quarter',
  'thermometer three quarters',
  'thumbs down',
  'thumbs down outline',
  'thumbs up',
  'thumbs up outline',
  'toggle off',
  'toggle on',
  'unlock',
  'unlock alternate',
];
const USERS_PEOPLE = [
  'address book',
  'address book outline',
  'address card',
  'address card outline',
  'bed',
  'blind',
  'child',
  'female',
  'frown',
  'frown outline',
  'id badge',
  'id badge outline',
  'id card',
  'id card outline',
  'male',
  'meh',
  'meh outline',
  'power off',
  'smile',
  'smile outline',
  'street view',
  'user',
  'user outline',
  'user circle',
  'user circle outline',
  'user md',
  'user plus',
  'user secret',
  'user times',
  'users',
  'wheelchair',
];
const VEHICLES = [
  'ambulance',
  'bicycle',
  'bus',
  'car',
  'fighter jet',
  'motorcycle',
  'paper plane',
  'paper plane outline',
  'plane',
  'rocket',
  'ship',
  'shopping cart',
  'space shuttle',
  'subway',
  'taxi',
  'train',
  'truck',
  'wheelchair',
];
const WRITING = [
  'archive',
  'book',
  'bookmark',
  'bookmark outline',
  'edit',
  'edit outline',
  'envelope',
  'envelope outline',
  'envelope open',
  'envelope open outline',
  'eraser',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'keyboard',
  'keyboard outline',
  'newspaper',
  'newspaper outline',
  'paper plane',
  'paper plane outline',
  'paperclip',
  'paragraph',
  'pen square',
  'pencil alternate',
  'quote left',
  'quote right',
  'sticky note',
  'sticky note outline',
  'thumbtack',
];
const BRANDS = [
  '500px',
  'accessible',
  'accusoft',
  'adn',
  'adversal',
  'affiliatetheme',
  'algolia',
  'amazon',
  'amazon pay',
  'amilia',
  'android',
  'angellist',
  'angrycreative',
  'angular',
  'app store',
  'app store ios',
  'apper',
  'apple',
  'apple pay',
  'asymmetrik',
  'audible',
  'autoprefixer',
  'avianex',
  'aviato',
  'aws',
  'bandcamp',
  'behance',
  'behance square',
  'bimobject',
  'bitbucket',
  'bitcoin',
  'bity',
  'black tie',
  'blackberry',
  'blogger',
  'blogger b',
  'bluetooth',
  'bluetooth b',
  'btc',
  'buromobelexperte',
  'buysellads',
  'cc amazon pay',
  'cc amex',
  'cc apple pay',
  'cc diners club',
  'cc discover',
  'cc jcb',
  'cc mastercard',
  'cc paypal',
  'cc stripe',
  'cc visa',
  'centercode',
  'chrome',
  'cloudscale',
  'cloudsmith',
  'cloudversify',
  'codepen',
  'codiepie',
  'connectdevelop',
  'contao',
  'cpanel',
  'creative commons',
  'css3',
  'css3 alternate',
  'cuttlefish',
  'd and d',
  'dashcube',
  'delicious',
  'deploydog',
  'deskpro',
  'deviantart',
  'digg',
  'digital ocean',
  'discord',
  'discourse',
  'dochub',
  'docker',
  'draft2digital',
  'dribbble',
  'dribbble square',
  'dropbox',
  'drupal',
  'dyalog',
  'earlybirds',
  'edge',
  'elementor',
  'ember',
  'empire',
  'envira',
  'erlang',
  'ethereum',
  'etsy',
  'expeditedssl',
  'facebook',
  'facebook f',
  'facebook messenger',
  'facebook square',
  'firefox',
  'first order',
  'firstdraft',
  'flickr',
  'flipboard',
  'fly',
  'font awesome',
  'font awesome alternate',
  'font awesome flag',
  'fonticons',
  'fonticons fi',
  'fort awesome',
  'fort awesome alternate',
  'forumbee',
  'foursquare',
  'free code camp',
  'freebsd',
  'get pocket',
  'gg',
  'gg circle',
  'git',
  'git square',
  'github',
  'github alternate',
  'github square',
  'gitkraken',
  'gitlab',
  'gitter',
  'glide',
  'glide g',
  'gofore',
  'goodreads',
  'goodreads g',
  'google',
  'google drive',
  'google play',
  'google plus',
  'google plus g',
  'google plus square',
  'google wallet',
  'gratipay',
  'grav',
  'gripfire',
  'grunt',
  'gulp',
  'hacker news',
  'hacker news square',
  'hips',
  'hire a helper',
  'hooli',
  'hotjar',
  'houzz',
  'html5',
  'hubspot',
  'imdb',
  'instagram',
  'internet explorer',
  'ioxhost',
  'itunes',
  'itunes note',
  'jenkins',
  'joget',
  'joomla',
  'js',
  'js square',
  'jsfiddle',
  'keycdn',
  'kickstarter',
  'kickstarter k',
  'korvue',
  'laravel',
  'lastfm',
  'lastfm square',
  'leanpub',
  'less',
  'linechat',
  'linkedin',
  'linkedin alternate',
  'linode',
  'linux',
  'lyft',
  'magento',
  'maxcdn',
  'medapps',
  'medium',
  'medium m',
  'medrt',
  'meetup',
  'microsoft',
  'mix',
  'mixcloud',
  'mizuni',
  'modx',
  'monero',
  'napster',
  'nintendo switch',
  'node',
  'node js',
  'npm',
  'ns8',
  'nutritionix',
  'odnoklassniki',
  'odnoklassniki square',
  'opencart',
  'openid',
  'opera',
  'optin monster',
  'osi',
  'page4',
  'pagelines',
  'palfed',
  'patreon',
  'paypal',
  'periscope',
  'phabricator',
  'phoenix framework',
  'php',
  'pied piper',
  'pied piper alternate',
  'pied piper pp',
  'pinterest',
  'pinterest p',
  'pinterest square',
  'playstation',
  'product hunt',
  'pushed',
  'python',
  'qq',
  'quinscape',
  'quora',
  'ravelry',
  'react',
  'rebel',
  'redriver',
  'reddit',
  'reddit alien',
  'reddit square',
  'rendact',
  'renren',
  'replyd',
  'resolving',
  'rocketchat',
  'rockrms',
  'safari',
  'sass',
  'schlix',
  'scribd',
  'searchengin',
  'sellcast',
  'sellsy',
  'servicestack',
  'shirtsinbulk',
  'simplybuilt',
  'sistrix',
  'skyatlas',
  'skype',
  'slack',
  'slack hash',
  'slideshare',
  'snapchat',
  'snapchat ghost',
  'snapchat square',
  'soundcloud',
  'speakap',
  'spotify',
  'stack exchange',
  'stack overflow',
  'staylinked',
  'steam',
  'steam square',
  'steam symbol',
  'sticker mule',
  'strava',
  'stripe',
  'stripe s',
  'studiovinari',
  'stumbleupon',
  'stumbleupon circle',
  'superpowers',
  'supple',
  'telegram',
  'telegram plane',
  'tencent weibo',
  'themeisle',
  'trello',
  'tripadvisor',
  'tumblr',
  'tumblr square',
  'twitch',
  'twitter',
  'twitter square',
  'typo3',
  'uber',
  'uikit',
  'uniregistry',
  'untappd',
  'usb',
  'ussunnah',
  'vaadin',
  'viacoin',
  'viadeo',
  'viadeo square',
  'viber',
  'vimeo',
  'vimeo square',
  'vimeo v',
  'vine',
  'vk',
  'vnv',
  'vuejs',
  'wechat',
  'weibo',
  'weixin',
  'whatsapp',
  'whatsapp square',
  'whmcs',
  'wikipedia w',
  'windows',
  'wordpress',
  'wordpress simple',
  'wpbeginner',
  'wpexplorer',
  'wpforms',
  'xbox',
  'xing',
  'xing square',
  'y combinator',
  'yahoo',
  'yandex',
  'yandex international',
  'yelp',
  'yoast',
  'youtube',
  'youtube square',
];

const ICONS = _uniq([
  ...ACCESSIBILITY,
  ...ARROWS,
  ...AUDIO_VIDEO,
  ...BUSINESS,
  ...CHESS,
  ...CODE,
  ...COMMUNICATION,
  ...COMPUTERS,
  ...CURRENCY,
  ...DATE_TIME,
  ...DESIGN,
  ...EDITORS,
  ...FILES,
  ...GENDERS,
  ...HANDS_GESTURES,
  ...HEALTH,
  ...IMAGES,
  ...INTERFACES,
  ...LOGISTICS,
  ...MAPS,
  ...MEDICAL,
  ...OBJECTS,
  ...PAYMENTS_SHOPPING,
  ...SHAPES,
  ...SPINNERS,
  ...SPORTS,
  ...STATUS,
  ...USERS_PEOPLE,
  ...VEHICLES,
  ...WRITING,
  ...BRANDS,
]);

const ICON_ALIASES = [
  'chess rock',
  'ordered list',
  'unordered list',
  'user doctor',
  'shield',
  'puzzle',
  'add circle',
  'add square',
  'add to calendar',
  'add to cart',
  'add user',
  'add',
  'alarm mute',
  'alarm',
  'ald',
  'als',
  'announcement',
  'area chart',
  'area graph',
  'arrow down cart',
  'asexual',
  'asl interpreting',
  'asl',
  'assistive listening devices',
  'attach',
  'attention',
  'balance',
  'bar',
  'bathtub',
  'battery four',
  'battery high',
  'battery low',
  'battery one',
  'battery three',
  'battery two',
  'battery zero',
  'birthday',
  'block layout',
  'bluetooth alternative',
  'broken chain',
  'browser',
  'call square',
  'call',
  'cancel',
  'cart',
  'cc',
  'chain',
  'chat',
  'checked calendar',
  'checkmark',
  'circle notched',
  'close',
  'cny',
  'cocktail',
  'commenting',
  'computer',
  'configure',
  'content',
  'deafness',
  'delete calendar',
  'delete',
  'detective',
  'discussions',
  'doctor',
  'dollar',
  'dont',
  'drivers license',
  'dropdown',
  'emergency',
  'envira gallery',
  'erase',
  'eur',
  'euro',
  'eyedropper',
  'factory',
  'favorite',
  'feed',
  'female homosexual',
  'file text',
  'file text outline',
  'find',
  'first aid',
  'fork',
  'game',
  'gay',
  'gbp',
  'google plus circle',
  'google plus official',
  'grab',
  'graduation',
  'grid layout',
  'group',
  'h',
  'hand victory',
  'handicap',
  'hard of hearing',
  'header',
  'help circle',
  'help',
  'heterosexual',
  'hide',
  'hotel',
  'hourglass four',
  'hourglass full',
  'hourglass one',
  'hourglass three',
  'hourglass two',
  'idea',
  'ils',
  'in cart',
  'inr',
  'intergender',
  'intersex',
  'jpy',
  'krw',
  'lab',
  'law',
  'legal',
  'lesbian',
  'lightning',
  'like',
  'line graph',
  'linkedin square',
  'linkify',
  'lira',
  'list layout',
  'magnify',
  'mail forward',
  'mail outline',
  'mail square',
  'mail',
  'male homosexual',
  'man',
  'marker',
  'mars alternate',
  'mars horizontal',
  'mars vertical',
  'microsoft edge',
  'military',
  'ms edge',
  'mute',
  'new pied piper',
  'non binary transgender',
  'numbered list',
  'options',
  'other gender horizontal',
  'other gender vertical',
  'other gender',
  'payment',
  'paypal card',
  'pencil square',
  'photo',
  'picture',
  'pie chart',
  'pie graph',
  'pied piper hat',
  'pin',
  'plus cart',
  'point',
  'pointing down',
  'pointing left',
  'pointing right',
  'pointing up',
  'pound',
  'power cord',
  'power',
  'privacy',
  'r circle',
  'rain',
  'record',
  'refresh',
  'remove circle',
  'remove from calendar',
  'remove user',
  'remove',
  'repeat',
  'rmb',
  'rouble',
  'rub',
  'ruble',
  'rupee',
  's15',
  'selected radio',
  'send',
  'setting',
  'settings',
  'shekel',
  'sheqel',
  'shipping',
  'shop',
  'shuffle',
  'shutdown',
  'sidebar',
  'signing',
  'signup',
  'sliders',
  'soccer',
  'sort alphabet ascending',
  'sort alphabet descending',
  'sort ascending',
  'sort content ascending',
  'sort content descending',
  'sort descending',
  'sort numeric ascending',
  'sort numeric descending',
  'sound',
  'spy',
  'stripe card',
  'student',
  'talk',
  'target',
  'teletype',
  'television',
  'text cursor',
  'text telephone',
  'theme',
  'thermometer',
  'thumb tack',
  'time',
  'tm',
  'toggle down',
  'toggle left',
  'toggle right',
  'toggle up',
  'translate',
  'travel',
  'treatment',
  'triangle down',
  'triangle left',
  'triangle right',
  'triangle up',
  'try',
  'unhide',
  'unlinkify',
  'unmute',
  'usd',
  'user cancel',
  'user close',
  'user delete',
  'user x',
  'vcard',
  'video camera',
  'video play',
  'volume control phone',
  'wait',
  'warning circle',
  'warning sign',
  'warning',
  'wi-fi',
  'winner',
  'wizard',
  'woman',
  'won',
  'wordpress beginner',
  'wordpress forms',
  'world',
  'write square',
  'x',
  'yen',
  'zip',
  'zoom in',
  'zoom out',
  'zoom',
  'bitbucket square',
  'checkmark box',
  'circle thin',
  'cloud download',
  'cloud upload',
  'compose',
  'conversation',
  'credit card alternative',
  'currency',
  'dashboard',
  'diamond',
  'disk',
  'exchange',
  'external share',
  'external square',
  'external',
  'facebook official',
  'food',
  'hourglass zero',
  'level down',
  'level up',
  'log out',
  'meanpath',
  'money',
  'move',
  'pencil',
  'protect',
  'radio',
  'remove bookmark',
  'resize horizontal',
  'resize vertical',
  'sign in',
  'sign out',
  'spoon',
  'star half empty',
  'star half full',
  'ticket',
  'times rectangle',
  'write',
  'youtube play',
];

const ICONS_AND_ALIASES = _uniq([...ICONS, ...ICON_ALIASES]);

// Some icon names are not part of icons.css.
// These are only valid as children of other components.
// Their CSS rules are defined by a specific component's CSS.
// We don't want to show name warnings for those usages so we add them as valid names here.
const COMPONENT_CONTEXT_SPECIFIC_ICONS = [
  'left dropdown', // nested dropdown menu direction icon
];
const ALL_ICONS_IN_ALL_CONTEXTS = _uniq([
  ...ICONS_AND_ALIASES,
  ...COMPONENT_CONTEXT_SPECIFIC_ICONS,
]);

TableRow.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A row can be active or selected by a user. */
  active: PropTypes.bool,

  /** An element type to render as (string or function). */
  cellAs: PropTypes.elementType,

  /** Shorthand array of props for TableCell. */
  cells: collectionShorthand,

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
  textAlign: PropTypes.oneOf(_without(TEXT_ALIGNMENTS, 'justified')) as any,

  /** A table row can adjust its vertical alignment. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any) as any,

  /** A row may warn a user. */
  warning: PropTypes.bool,
};

TableCell.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A cell can be active or selected by a user. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A cell can be collapsing so that it only uses as much space as required. */
  collapsing: PropTypes.bool,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A cell can be disabled. */
  disabled: PropTypes.bool,

  /** A cell may call attention to an error or a negative value. */
  error: PropTypes.bool,

  /** Add an Icon by name, props object, or pass an <Icon /> */
  icon: itemShorthand,

  /** A cell may let a user know whether a value is bad. */
  negative: PropTypes.bool,

  /** A cell may let a user know whether a value is good. */
  positive: PropTypes.bool,

  /** A cell can be selectable. */
  selectable: PropTypes.bool,

  /** A cell can specify that its contents should remain on a single line and not wrap. */
  singleLine: PropTypes.bool,

  /** A table cell can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(TEXT_ALIGNMENTS, 'justified')) as any,

  /** A table cell can adjust its text alignment. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any) as any,

  /** A cell may warn a user. */
  warning: PropTypes.bool,

  /** A table can specify the width of individual columns independently. */
  width: PropTypes.oneOf(WIDTHS as any) as any,
};

TableHeaderCell.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Additional classes. */
  className: PropTypes.string,

  /** A header cell can be sorted in ascending or descending order. */
  sorted: PropTypes.oneOf(['ascending', 'descending']),
};

TableHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A definition table can have a full width header or footer, filling in the gap left by the first column. */
  fullWidth: PropTypes.bool,
};

TableFooter.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,
};

TableBody.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,
};

Table.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

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
  color: PropTypes.oneOf(COLORS as any) as any,

  /** A table can specify its column count to divide its content evenly. */
  columns: PropTypes.oneOf(WIDTHS as any) as any,

  /** A table may sometimes need to be more compact to make more rows visible at a time. */
  compact: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

  /** A table may be formatted to emphasize a first column that defines a rows content. */
  definition: PropTypes.bool,

  /**
   * A table can use fixed a special faster form of table rendering that does not resize table cells based on content
   */
  fixed: PropTypes.bool,

  /** Shorthand for a TableRow to be placed within Table.Footer. */
  footerRow: itemShorthand,

  /** Shorthand for a TableRow to be placed within Table.Header. */
  headerRow: every([
    disallow(['headerRows']),
    itemShorthand,
  ]),

  /** Shorthand for multiple TableRows to be placed within Table.Header. */
  headerRows: every([
    disallow(['headerRow']),
    collectionShorthand,
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
  renderBodyRow: every([
    disallow(['children']),
    demand(['tableData']),
    PropTypes.func,
  ]),

  /** A table can have its rows appear selectable. */
  selectable: PropTypes.bool,

  /** A table can specify that its cell contents should remain on a single line and not wrap. */
  singleLine: PropTypes.bool,

  /** A table can also be small or large. */
  size: PropTypes.oneOf(_without(SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive')) as any,

  /** A table may allow a user to sort contents by clicking on a table header. */
  sortable: PropTypes.bool,

  /** A table can specify how it stacks table content responsively. */
  stackable: PropTypes.bool,

  /** A table can stripe alternate rows of content with a darker color to increase contrast. */
  striped: PropTypes.bool,

  /** A table can be formatted to display complex structured data. */
  structured: PropTypes.bool,

  /** Data to be passed to the renderBodyRow function. */
  tableData: every([
    disallow(['children']),
    demand(['renderBodyRow']),
    PropTypes.array,
  ]),

  /** A table can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(TEXT_ALIGNMENTS, 'justified')) as any,

  /** A table can specify how it stacks table content responsively. */
  unstackable: PropTypes.bool,

  /** A table can adjust its text alignment. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any) as any,
};

MessageList.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand Message.Items. */
  items: collectionShorthand,
};

MessageItem.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

MessageHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

MessageContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

Message.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A message can be formatted to attach itself to other content. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['bottom', 'top'])]) as any,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A message can be formatted to be different colors. */
  color: PropTypes.oneOf(COLORS as any),

  /** A message can only take up the width of its content. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A message may be formatted to display a negative message. Same as `negative`. */
  error: PropTypes.bool,

  /** A message can float above content that it is related to. */
  floating: PropTypes.bool,

  /** Shorthand for MessageHeader. */
  header: itemShorthand,

  /** A message can be hidden. */
  hidden: PropTypes.bool,

  /** A message can contain an icon. */
  icon: PropTypes.oneOfType([itemShorthand, PropTypes.bool]),

  /** A message may be formatted to display information. */
  info: PropTypes.bool,

  /** Array shorthand items for the MessageList. Mutually exclusive with children. */
  list: collectionShorthand,

  /** A message may be formatted to display a negative message. Same as `error`. */
  negative: PropTypes.bool,

  /**
   * A message that the user can choose to hide.
   * Called when the user clicks the "x" icon. This also adds the "x" icon.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onDismiss: PropTypes.func,

  /** A message may be formatted to display a positive message.  Same as `success`. */
  positive: PropTypes.bool,

  /** A message can have different sizes. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')) as any,

  /** A message may be formatted to display a positive message.  Same as `positive`. */
  success: PropTypes.bool,

  /** A message can be set to visible to force itself to be shown. */
  visible: PropTypes.bool,

  /** A message may be formatted to display warning messages. */
  warning: PropTypes.bool,
};

MenuMenu.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A sub menu can take left or right position. */
  position: PropTypes.oneOf(['left', 'right']),
};

MenuHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

MenuItem.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A menu item can be active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Additional colors can be specified. */
  color: PropTypes.oneOf(COLORS as any),

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A menu item can be disabled. */
  disabled: PropTypes.bool,

  /** A menu item or menu can remove element padding, vertically or horizontally. */
  fitted: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['horizontally', 'vertically'])]) as any,

  /** A menu item may include a header or may itself be a header. */
  header: PropTypes.bool,

  /** MenuItem can be only icon. */
  icon: PropTypes.oneOfType([PropTypes.bool, itemShorthand]) as any,

  /** MenuItem index inside Menu. */
  index: PropTypes.number,

  /** A menu item can be link. */
  link: PropTypes.bool,

  /** Internal name of the MenuItem. */
  name: PropTypes.string,

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** A menu item can take left or right position. */
  position: PropTypes.oneOf(['left', 'right']),
};

Menu.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Index of the currently active item. */
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** A menu may be attached to other content segments. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]) as any,

  /** A menu item or menu can have no borders. */
  borderless: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Additional colors can be specified. */
  color: PropTypes.oneOf(COLORS as any),

  /** A menu can take up only the space necessary to fit its content. */
  compact: PropTypes.bool,

  /** Initial activeIndex value. */
  defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** A menu can be fixed to a side of its context. */
  fixed: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),

  /** A menu can be floated. */
  floated: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]) as any,

  /** A vertical menu may take the size of its container. */
  fluid: PropTypes.bool,

  /** A menu may have just icons (bool) or labeled icons. */
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['labeled'])]) as any,

  /** A menu may have its colors inverted to show greater contrast. */
  inverted: PropTypes.bool,

  /** Shorthand array of props for Menu. */
  items: collectionShorthand,

  /**
   * onClick handler for MenuItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick: every([disallow(['children']), PropTypes.func]),

  /** A pagination menu is specially formatted to present links to pages of content. */
  pagination: PropTypes.bool,

  /** A menu can point to show its relationship to nearby content. */
  pointing: PropTypes.bool,

  /** A menu can adjust its appearance to de-emphasize its contents. */
  secondary: PropTypes.bool,

  /** A menu can vary in size. */
  size: PropTypes.oneOf(_without(SIZES, 'medium', 'big')) as any,

  /** A menu can stack at mobile resolutions. */
  stackable: PropTypes.bool,

  /** A menu can be formatted to show tabs of information. */
  tabular: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]) as any,

  /** A menu can be formatted for text content. */
  text: PropTypes.bool,

  /** A vertical menu displays elements vertically. */
  vertical: PropTypes.bool,

  /** A menu can have its items divided evenly. */
  widths: PropTypes.oneOf(WIDTHS as any),
};

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
  color: PropTypes.oneOf(COLORS as any),

  /** Represents column count per line in Row. */
  columns: PropTypes.oneOf([...WIDTHS as any, 'equal']),

  /** A row can have dividers between its columns. */
  divided: PropTypes.bool,

  /** A row can appear only for a specific device, or screen sizes. */
  only: multipleProp(VISIBILITY) as any,

  /** A row can specify that its columns should reverse order at different device sizes. */
  reversed: multipleProp([
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
  textAlign: PropTypes.oneOf(TEXT_ALIGNMENTS as any),

  /** A row can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any),
};

GridColumn.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A grid column can be colored. */
  color: PropTypes.oneOf(COLORS as any),

  /** A column can specify a width for a computer. */
  computer: every([
    disallow(['width']),
    PropTypes.oneOf(WIDTHS as any),
  ]),

  /** A column can sit flush against the left or right edge of a row. */
  floated: PropTypes.oneOf(FLOATS as any),

  /** A column can specify a width for a large screen device. */
  largeScreen: every([
    disallow(['width']),
    PropTypes.oneOf(WIDTHS as any),
  ]),

  /** A column can specify a width for a mobile device. */
  mobile: every([disallow(['width']), PropTypes.oneOf(WIDTHS as any)]),

  /** A column can appear only for a specific device, or screen sizes. */
  only: multipleProp(VISIBILITY) as any,

  /** A column can stretch its contents to take up the entire grid or row height. */
  stretched: PropTypes.bool,

  /** A column can specify a width for a tablet device. */
  tablet: every([disallow(['width']), PropTypes.oneOf(WIDTHS as any)]),

  /** A column can specify its text alignment. */
  textAlign: PropTypes.oneOf(TEXT_ALIGNMENTS as any),

  /** A column can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any),

  /** A column can specify a width for a wide screen device. */
  widescreen: every([
    disallow(['width']),
    PropTypes.oneOf(WIDTHS as any),
  ]),

  /** Represents width of column. */
  width: every([
    disallow(['computer', 'largeScreen', 'mobile', 'tablet', 'widescreen']),
    PropTypes.oneOf(WIDTHS as any),
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
  columns: PropTypes.oneOf([...WIDTHS as any, 'equal']),

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
  reversed: multipleProp([
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
  textAlign: PropTypes.oneOf(TEXT_ALIGNMENTS as any),

  /** A grid can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any),
};

FormTextArea.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A FormField control prop. */
  control: FormField.propTypes!.control,
};

FormSelect.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A FormField control prop. */
  control: FormField.propTypes!.control,

  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: PropTypes.arrayOf(PropTypes.shape(Dropdown!.Item!.propTypes!)).isRequired as any,
};

FormRadio.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A FormField control prop. */
  control: FormField.propTypes!.control,
};

FormInput.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A FormField control prop. */
  control: FormField.propTypes!.control,
};

FormGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Fields can show related choices. */
  grouped: every([disallow(['inline']), PropTypes.bool]),

  /** Multiple fields may be inline in a row. */
  inline: every([disallow(['grouped']), PropTypes.bool]),

  /** A form group can prevent itself from stacking on mobile. */
  unstackable: PropTypes.bool,

  /** Fields Groups can specify their width in grid columns or automatically divide fields to be equal width. */
  widths: PropTypes.oneOf([...WIDTHS as any, 'equal']),
};

FormField.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /**
   * A form control component (i.e. Dropdown) or HTML tagName (i.e. 'input').
   * Extra FormField props are passed to the control component.
   * Mutually exclusive with children.
   */
  control: some([
    PropTypes.func,
    PropTypes.oneOf(['button', 'input', 'select', 'textarea']),
  ]) as any,

  /** Individual fields may be disabled. */
  disabled: PropTypes.bool,

  /** Individual fields may display an error state along with a message. */
  error: PropTypes.oneOfType([PropTypes.bool, itemShorthand]) as any,

  /** The id of the control */
  id: PropTypes.string,

  /** A field can have its label next to instead of above it. */
  inline: PropTypes.bool,

  // Heads Up!
  // Do not disallow children with `label` shorthand
  // The `control` might accept a `label` prop and `children`
  /** Mutually exclusive with children. */
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),

  /** A field can show that input is mandatory. */
  required: PropTypes.bool,

  /** Passed to the control component (i.e. <input type='password' />) */
  type: every([
    demand(['control']),
    // don't strictly validate HTML types
    // a control might be passed that uses a `type` prop with unknown values
    // let the control validate if for us
  ]),

  /** A field can specify its width in grid columns */
  width: PropTypes.oneOf(WIDTHS as any),
};

FormDropdown.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A FormField control prop. */
  control: FormField.propTypes!.control,
};

FormCheckbox.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A FormField control prop. */
  control: FormField.propTypes!.control,
};

FormButton.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A FormField control prop. */
  control: FormField.propTypes!.control,
};

Form.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** The HTML form action */
  action: PropTypes.string,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Automatically show any error Message children. */
  error: PropTypes.bool,

  /** A form can have its color inverted for contrast. */
  inverted: PropTypes.bool,

  /** Automatically show a loading indicator. */
  loading: PropTypes.bool,

  /** The HTML form submit handler. */
  onSubmit: PropTypes.func,

  /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
  reply: PropTypes.bool,

  /** A form can vary in size. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')),

  /** Automatically show any success Message children. */
  success: PropTypes.bool,

  /** A form can prevent itself from stacking on mobile. */
  unstackable: PropTypes.bool,

  /** Automatically show any warning Message children. */
  warning: PropTypes.bool,

  /** Forms can automatically divide fields to be equal width. */
  widths: PropTypes.oneOf(['equal']),
};

BreadcrumbSection.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Style as the currently active section. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: every([disallow(['link']), PropTypes.string]),

  /** Render as an `a` tag instead of a `div`. */
  link: every([disallow(['href']), PropTypes.bool]),

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,
};

BreadcrumbDivider.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Render as an `Icon` component with `divider` class instead of a `div`. */
  icon: itemShorthand,
};

Breadcrumb.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content of the Breadcrumb.Divider. */
  divider: every([
    disallow(['icon']),
    contentShorthand,
  ]),

  /** For use with the sections prop. Render as an `Icon` component with `divider` class instead of a `div` in
   *  Breadcrumb.Divider. */
  icon: every([
    disallow(['divider']),
    itemShorthand,
  ]),

  /** Shorthand array of props for Breadcrumb.Section. */
  sections: collectionShorthand,

  /** Size of Breadcrumb. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')) as any,
};

TextArea.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /**
   * Called on change.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onChange: PropTypes.func,

  /**
   * Called on input.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onInput: PropTypes.func,

  /** Indicates row count for a TextArea. */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The value of the textarea. */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Rail.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A rail can appear attached to the main viewport. */
  attached: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A rail can appear closer to the main viewport. */
  close: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A rail can create a division between itself and a container. */
  dividing: PropTypes.bool,

  /** A rail can attach itself to the inside of a container. */
  internal: PropTypes.bool,

  /** A rail can be presented on the left or right side of a container. */
  position: PropTypes.oneOf(FLOATS as any).isRequired as any,

  /** A rail can have different sizes. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')) as any,
};

Visibility.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Context which visibility should attach onscroll events. */
  context: PropTypes.object,

  /**
   * When set to true a callback will occur anytime an element passes a condition not just immediately after the
   * threshold is met.
   */
  continuous: PropTypes.bool,

  /** Fires callbacks immediately after mount. */
  fireOnMount: PropTypes.bool,

  /**
   * Element's bottom edge has passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassed: PropTypes.func,

  /**
   * Element's bottom edge has not passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassedReverse: PropTypes.func,

  /**
   * Element's bottom edge has passed bottom of screen
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisible: PropTypes.func,

  /**
   * Element's bottom edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisibleReverse: PropTypes.func,

  /**
   * Value that context should be adjusted in pixels. Useful for making content appear below content fixed to the
   * page.
   */
  offset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  ]),

  /** When set to false a callback will occur each time an element passes the threshold for a condition. */
  once: PropTypes.bool,

  /** Element is not visible on the screen. */
  onPassed: PropTypes.object,

  /**
   * Any part of an element is visible on screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassing: PropTypes.func,

  /**
   * Element's top has not passed top of screen but bottom has.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassingReverse: PropTypes.func,

  /**
   * Element is not visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOffScreen: PropTypes.func,

  /**
   * Element is visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOnScreen: PropTypes.func,

  /**
   * Element's top edge has passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassed: PropTypes.func,

  /**
   * Element's top edge has not passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassedReverse: PropTypes.func,

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisible: PropTypes.func,

  /**
   * Element's top edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisibleReverse: PropTypes.func,

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUpdate: PropTypes.func,

  /**
   * Allows to choose the mode of the position calculations:
   * - `events` - (default) update and fire callbacks only on scroll/resize events
   * - `repaint` - update and fire callbacks on browser repaint (animation frames)
   */
  updateOn: PropTypes.oneOf(['events', 'repaint']),
};

Checkbox.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Whether or not checkbox is checked. */
  checked: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** The initial value of checked. */
  defaultChecked: PropTypes.bool,

  /** Whether or not checkbox is indeterminate. */
  defaultIndeterminate: PropTypes.bool,

  /** A checkbox can appear disabled and be unable to change states */
  disabled: PropTypes.bool,

  /** Removes padding for a label. Auto applied when there is no label. */
  fitted: PropTypes.bool,

  /** A unique identifier. */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

  /** Whether or not checkbox is indeterminate. */
  indeterminate: PropTypes.bool,

  /** The text of the associated label element. */
  label: itemShorthand,

  /** The HTML input name. */
  name: PropTypes.string,

  /**
   * Called when the user attempts to change the checked state.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed checked/indeterminate state.
   */
  onChange: PropTypes.func,

  /**
   * Called when the checkbox or label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onClick: PropTypes.func,

  /**
   * Called when the user presses down on the mouse.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onMouseDown: PropTypes.func,

  /**
   * Called when the user releases the mouse.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onMouseUp: PropTypes.func,

  /** Format as a radio element. This means it is an exclusive option. */
  radio: every([PropTypes.bool, disallow(['slider', 'toggle'])]),

  /** A checkbox can be read-only and unable to change states. */
  readOnly: PropTypes.bool,

  /** Format to emphasize the current selection state. */
  slider: every([PropTypes.bool, disallow(['radio', 'toggle'])]),

  /** A checkbox can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

  /** Format to show an on or off choice. */
  toggle: every([PropTypes.bool, disallow(['radio', 'slider'])]),

  /** HTML input type, either checkbox or radio. */
  type: PropTypes.oneOf(['checkbox', 'radio']),

  /** The HTML input value. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DimmerInner.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An active dimmer will dim its parent container. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A disabled dimmer cannot be activated */
  disabled: PropTypes.bool,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Handles click outside Dimmer's content, but inside Dimmer area.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClickOutside: PropTypes.func,

  /** A dimmer can be formatted to have its colors inverted. */
  inverted: PropTypes.bool,

  /** A dimmer can be formatted to be fixed to the page. */
  page: PropTypes.bool,

  /** A dimmer can be controlled with simple prop. */
  simple: PropTypes.bool,

  /** A dimmer can have its content top or bottom aligned. */
  verticalAlign: PropTypes.oneOf(['bottom', 'top']),
};

DimmerDimmable.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A dimmable element can blur its contents. */
  blurring: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Controls whether or not the dim is displayed. */
  dimmed: PropTypes.bool,
};

Dimmer.propTypes = {
  /** An active dimmer will dim its parent container. */
  active: PropTypes.bool,

  /** A dimmer can be formatted to be fixed to the page. */
  page: PropTypes.bool,
};

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
  allowAdditions: every([
    demand(['options', 'selection', 'search']),
    PropTypes.bool,
  ]),

  /** A Dropdown can reduce its complexity. */
  basic: PropTypes.bool,

  /** Format the Dropdown to appear as a button. */
  button: PropTypes.bool,

  /** Primary content. */
  children: every([
    disallow(['options', 'selection']),
    givenProps(
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
  defaultSelectedLabel: every([
    demand(['multiple']),
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
  options: every([
    disallow(['children']),
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
  selectedLabel: every([
    demand(['multiple']),
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ]),

  /** A dropdown can be used to select between choices in a form. */
  selection: every([
    disallow(['children']),
    demand(['options']),
    PropTypes.bool,
  ]),

  /** A simple dropdown can open without Javascript. */
  simple: PropTypes.bool,

  /** A dropdown can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The text displayed in the dropdown, usually for the active item. */
  text: PropTypes.string,

  /** Custom element to trigger the menu to become visible. Takes place of 'text'. */
  trigger: every([
    disallow(['selection', 'text']),
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
  content: contentShorthand,

  /** Shorthand for Icon. */
  icon: itemShorthand,
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
  content: contentShorthand,

  /** Additional text with less emphasis. */
  description: itemShorthand,

  /** A dropdown item can be disabled. */
  disabled: PropTypes.bool,

  /** Shorthand for Flag. */
  flag: itemShorthand,

  /** Shorthand for Icon. */
  icon: itemShorthand,

  /** Shorthand for Image. */
  image: itemShorthand,

  /** Shorthand for Label. */
  label: itemShorthand,

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
  text: contentShorthand,

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
  content: contentShorthand,

  /** A dropdown menu can open to the left or to the right. */
  direction: PropTypes.oneOf(['left', 'right']),

  /** Whether or not the dropdown menu is displayed. */
  open: PropTypes.bool,

  /** A dropdown menu can scroll. */
  scrolling: PropTypes.bool,
};

SearchResults.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

SearchResult.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** The item currently selected by keyboard shortcut. */
  active: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

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
  content: contentShorthand,

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
  input: itemShorthand,

  /** A search can show a loading indicator. */
  loading: PropTypes.bool,

  /** A search can have different sizes. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')),
};

TabPane.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A tab pane can be active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A Tab.Pane can display a loading indicator. */
  loading: PropTypes.bool,
};

Tab.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** The initial activeIndex. */
  defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Index of the currently active tab. */
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Shorthand props for the Menu.
   * tabular, if true, will derive final value from `menuPosition`, otherwise set 'left' or 'right' explicitly.
   */
  menu: PropTypes.object,

  /** Align vertical menu */
  menuPosition: PropTypes.oneOf(['left', 'right']),

  /** Shorthand props for the Grid. */
  grid: PropTypes.object,

  /**
   * Called on tab change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed new activeIndex.
   * @param {object} data.activeIndex - The new proposed activeIndex.
   */
  onTabChange: PropTypes.func,

  /**
   * Array of objects describing each Menu.Item and Tab.Pane:
   * { menuItem: 'Home', render: () => <Tab.Pane /> }
   * or
   * { menuItem: 'Home', pane: 'Welcome' }
   */
  panes: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: itemShorthand,
      pane: itemShorthand,
      render: PropTypes.func,
    }) as any,
  ),

  /** A Tab can render only active pane. */
  renderActiveOnly: PropTypes.bool,
};

AccordionTitle.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Whether or not the title is in the open state. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Shorthand for Icon. */
  icon: itemShorthand,

  /** AccordionTitle index inside Accordion. */
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,
};

AccordionPanel.propTypes = {
  /** Whether or not the title is in the open state. */
  active: PropTypes.bool,

  /** A shorthand for Accordion.Content. */
  content: itemShorthand,

  /** A panel index. */
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onTitleClick: PropTypes.func,

  /** A shorthand for Accordion.Title. */
  title: itemShorthand,
};

AccordionContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Whether or not the content is visible. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};
AccordionAccordion.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Index of the currently active panel. */
  activeIndex: every([
    disallow(['children']),
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  ]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Initial activeIndex value. */
  defaultActiveIndex: every([
    disallow(['children']),
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  ]),

  /** Only allow one panel open at a time. */
  exclusive: PropTypes.bool,

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onTitleClick: every([disallow(['children']), PropTypes.func]),

  /** Shorthand array of props for Accordion. */
  panels: every([
    disallow(['children']),
    PropTypes.arrayOf(
      PropTypes.shape({
        content: itemShorthand,
        title: itemShorthand,
      }),
    ),
  ]),
};

Accordion.propTypes = {
  /** Additional classes. */
  className: PropTypes.string,

  /** Format to take up the width of its container. */
  fluid: PropTypes.bool,

  /** Format for dark backgrounds. */
  inverted: PropTypes.bool,

  /** Adds some basic styling to accordion panels. */
  styled: PropTypes.bool,
};

Embed.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An embed can be active. */
  active: PropTypes.bool,

  /** An embed can specify an alternative aspect ratio. */
  aspectRatio: PropTypes.oneOf(['4:3', '16:9', '21:9']),

  /** Setting to true or false will force autoplay. */
  autoplay: every([demand(['source']), PropTypes.bool]),

  /** Whether to show networks branded UI like title cards, or after video calls to action. */
  brandedUI: every([demand(['source']), PropTypes.bool]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Specifies a default chrome color with Vimeo or YouTube. */
  color: every([demand(['source']), PropTypes.string]),

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Initial value of active. */
  defaultActive: PropTypes.bool,

  /** Whether to prefer HD content. */
  hd: every([demand(['source']), PropTypes.bool]),

  /** Specifies an icon to use with placeholder content. */
  icon: itemShorthand,

  /** Specifies an id for source. */
  id: every([demand(['source']), PropTypes.string]),

  /** Shorthand for HTML iframe. */
  iframe: every([
    demand(['source']),
    itemShorthand,
  ]),

  /**
   * Сalled on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick: PropTypes.func,

  /** A placeholder image for embed. */
  placeholder: PropTypes.string,

  /** Specifies a source to use. */
  source: every([
    disallow(['sourceUrl']),
    PropTypes.oneOf(['youtube', 'vimeo']),
  ]),

  /** Specifies a url to use for embed. */
  url: every([disallow(['source']), PropTypes.string]),
};

ModalHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

ModalDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

ModalContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A modal can contain image content. */
  image: PropTypes.bool,

  /** A modal can use the entire size of the screen. */
  scrolling: PropTypes.bool,
};

ModalActions.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Array of shorthand buttons. */
  actions: collectionShorthand,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /**
   * Action onClick handler when using shorthand `actions`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props from the clicked action.
   */
  onActionClick: every([disallow(['children']), PropTypes.func]),
};

Modal.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Shorthand for Modal.Actions. Typically an array of button shorthand. */
  actions: itemShorthand,

  /** A modal can reduce its complexity */
  basic: PropTypes.bool,

  /** A modal can be vertically centered in the viewport */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for the close icon. Closes the modal on click. */
  closeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.bool]),

  /** Whether or not the Modal should close when the dimmer is clicked. */
  closeOnDimmerClick: PropTypes.bool,

  /** Whether or not the Modal should close when the document is clicked. */
  closeOnDocumentClick: PropTypes.bool,

  /** Simple text content for the Modal. */
  content: itemShorthand,

  /** Initial value of open. */
  defaultOpen: PropTypes.bool,

  /** A Modal can appear in a dimmer. */
  dimmer: PropTypes.oneOf([true, 'inverted', 'blurring']),

  /** Event pool namespace that is used to handle component events */
  eventPool: PropTypes.string,

  /** Modal displayed above the content in bold. */
  header: itemShorthand,

  /** The node where the modal should mount. Defaults to document.body. */
  mountNode: PropTypes.any,

  /**
   * Action onClick handler when using shorthand `actions`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onActionClick: PropTypes.func,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: PropTypes.func,

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: PropTypes.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: PropTypes.func,

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: PropTypes.func,

  /** Controls whether or not the Modal is displayed. */
  open: PropTypes.bool,

  /** A modal can vary in size */
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),

  /** Custom styles. */
  style: PropTypes.object,

  /** Element to be rendered in-place where the portal is defined. */
  trigger: PropTypes.node,

  /**
   * NOTE: Any unhandled props that are defined in Portal are passed-through
   * to the wrapping Portal.
   */
};

Progress.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A progress bar can show activity. */
  active: PropTypes.bool,

  /** A progress bar can attach to and show the progress of an element (i.e. Card or Segment). */
  attached: PropTypes.oneOf(['top', 'bottom']),

  /** Whether success state should automatically trigger when progress completes. */
  autoSuccess: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A progress bar can have different colors. */
  color: PropTypes.oneOf(COLORS as any),

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A progress bar be disabled. */
  disabled: PropTypes.bool,

  /** A progress bar can show a error state. */
  error: PropTypes.bool,

  /** An indicating progress bar visually indicates the current level of progress of a task. */
  indicating: PropTypes.bool,

  /** A progress bar can have its colors inverted. */
  inverted: PropTypes.bool,

  /** Can be set to either to display progress as percent or ratio. */
  label: itemShorthand,

  /** Current percent complete. */
  percent: every([
    disallow(['total', 'value']),
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ]),

  /** Decimal point precision for calculated progress. */
  precision: PropTypes.number,

  /** A progress bar can contain a text value indicating current progress. */
  progress: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['percent', 'ratio', 'value'])]) as any,

  /** A progress bar can vary in size. */
  size: PropTypes.oneOf(_without(SIZES, 'mini', 'huge', 'massive')) as any,

  /** A progress bar can show a success state. */
  success: PropTypes.bool,

  /** For use with value. Together, these will calculate the percent. Mutually excludes percent. */
  total: every([
    demand(['value']),
    disallow(['percent']),
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ]),

  /** For use with total. Together, these will calculate the percent. Mutually excludes percent. */
  value: every([
    disallow(['percent']),
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ]),

  /** A progress bar can show a warning state. */
  warning: PropTypes.bool,
};

RatingIcon.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Indicates activity of an icon. */
  active: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** An index of icon inside Rating. */
  index: PropTypes.number,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Called on keyup.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onKeyUp: PropTypes.func,

  /**
   * Called on mouseenter.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseEnter: PropTypes.func,

  /** Indicates selection of an icon. */
  selected: PropTypes.bool,
};

Rating.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Additional classes. */
  className: PropTypes.string,

  /**
   * You can clear the rating by clicking on the current start rating.
   * By default a rating will be only clearable if there is 1 icon.
   * Setting to `true`/`false` will allow or disallow a user to clear their rating.
   */
  clearable: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['auto'])]) as any,

  /** The initial rating value. */
  defaultRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

  /** You can disable or enable interactive rating.  Makes a read-only rating. */
  disabled: PropTypes.bool,

  /** A rating can use a set of star or heart icons. */
  icon: PropTypes.oneOf(['star', 'heart']),

  /** The total number of icons. */
  maxRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

  /**
   * Called after user selects a new rating.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onRate: PropTypes.func,

  /** The current number of active icons. */
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

  /** A progress bar can vary in size. */
  size: PropTypes.oneOf(_without(SIZES, 'medium', 'big')) as any,
};

SidebarPusher.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Controls whether or not the dim is displayed. */
  dimmed: PropTypes.bool,
};

SidebarPushable.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

Sidebar.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Animation style. */
  animation: PropTypes.oneOf([
    'overlay',
    'push',
    'scale down',
    'uncover',
    'slide out',
    'slide along',
  ]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Direction the sidebar should appear on. */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * Called before a sidebar begins to animate out.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onHide: PropTypes.func,

  /**
   * Called after a sidebar has finished animating out.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onHidden: PropTypes.func,

  /**
   * Called when a sidebar has finished animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onShow: PropTypes.func,

  /**
   * Called when a sidebar begins animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onVisible: PropTypes.func,

  /** A sidebar can handle clicks on the passed element. */
  target: PropTypes.oneOfType([domNode as any, refObject]),

  /** Controls whether or not the sidebar is visible on the page. */
  visible: PropTypes.bool,

  /** Sidebar width. */
  width: PropTypes.oneOf(['very thin', 'thin', 'wide', 'very wide']),
};

Sticky.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A Sticky can be active. */
  active: PropTypes.bool,

  /** Offset in pixels from the bottom of the screen when fixing element to viewport. */
  bottomOffset: PropTypes.number,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Context which sticky element should stick to. */
  context: PropTypes.oneOfType([domNode as any, refObject]),

  /** Offset in pixels from the top of the screen when fixing element to viewport. */
  offset: PropTypes.number,

  /**
   * Callback when element is bound to bottom of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBottom: PropTypes.func,

  /**
   * Callback when element is fixed to page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onStick: PropTypes.func,

  /**
   * Callback when element is bound to top of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onTop: PropTypes.func,

  /**
   * Callback when element is unfixed from page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onUnstick: PropTypes.func,

  /** Whether element should be "pushed" by the viewport, attaching to the bottom of the screen when scrolling up. */
  pushing: PropTypes.bool,

  /** Context which sticky should attach onscroll events. */
  scrollContext: PropTypes.oneOfType([domNode as any, refObject]) as any,

  /** Custom style for sticky element. */
  styleElement: PropTypes.object,
};

TransitionGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Named animation event to used. Must be defined in CSS. */
  animation: PropTypes.oneOfType([PropTypes.oneOf(TRANSITIONS), PropTypes.string]),

  /** Primary content. */
  children: PropTypes.node,

  /** Whether it is directional animation event or not. Use it only for custom transitions. */
  directional: PropTypes.bool,

  /** Duration of the CSS transition animation in milliseconds. */
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      hide: PropTypes.number.isRequired,
      show: PropTypes.number.isRequired,
    }),
    PropTypes.string,
  ]),
};

Transition.propTypes = {
  /** Named animation event to used. Must be defined in CSS. */
  animation: PropTypes.oneOfType([PropTypes.oneOf(TRANSITIONS), PropTypes.string]),

  /** Primary content. */
  children: PropTypes.element.isRequired,

  /** Whether it is directional animation event or not. Use it only for custom transitions. */
  directional: PropTypes.bool,

  /** Duration of the CSS transition animation in milliseconds. */
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      hide: PropTypes.number,
      show: PropTypes.number,
    }),
    PropTypes.string,
  ]),

  /** Show the component; triggers the enter or exit animation. */
  visible: PropTypes.bool,

  /** Wait until the first "enter" transition to mount the component (add it to the DOM). */
  mountOnShow: PropTypes.bool,

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onComplete: PropTypes.func,

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onHide: PropTypes.func,

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onShow: PropTypes.func,

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onStart: PropTypes.func,

  /** React's key of the element. */
  reactKey: PropTypes.string,

  /** Run the enter animation when the component mounts, if it is initially shown. */
  transitionOnMount: PropTypes.bool,

  /** Unmount the component (remove it from the DOM) when it is not shown. */
  unmountOnHide: PropTypes.bool,
};

TransitionablePortal.propTypes = {
  /** Primary content. */
  children: PropTypes.node.isRequired,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onClose: PropTypes.func,

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with transition status and internal state.
   */
  onHide: PropTypes.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onOpen: PropTypes.func,

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with transition status and internal state.
   */
  onStart: PropTypes.func,

  /** Controls whether or not the portal is displayed. */
  open: PropTypes.bool,

  /** Transition props. */
  transition: PropTypes.object,
};

Select.propTypes = {
  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: PropTypes.arrayOf(PropTypes.shape(DropdownItem.propTypes)).isRequired as any,
};

Responsive.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Fires callbacks immediately after mount. */
  fireOnMount: PropTypes.bool,

  /**
   * Called to get width of screen. Defaults to using `window.innerWidth` when in a browser;
   * otherwise, assumes a width of 0.
   */
  getWidth: PropTypes.func,

  /** The maximum width at which content will be displayed. */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The minimum width at which content will be displayed. */
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Called on update.
   *
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onUpdate: PropTypes.func,
};

Radio.propTypes = {
  /** Format to emphasize the current selection state. */
  slider: Checkbox.propTypes.slider,

  /** Format to show an on or off choice. */
  toggle: Checkbox.propTypes.toggle,

  /** HTML input type, either checkbox or radio. */
  type: Checkbox.propTypes.type,
};

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
  ellipsisItem: itemShorthand,

  /** A shorthand for PaginationItem. */
  firstItem: itemShorthand,

  /** A shorthand for PaginationItem. */
  lastItem: itemShorthand,

  /** A shorthand for PaginationItem. */
  nextItem: itemShorthand,

  /** A shorthand for PaginationItem. */
  pageItem: itemShorthand,

  /** A shorthand for PaginationItem. */
  prevItem: itemShorthand,

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

PortalInner.propTypes = {
  /** Primary content. */
  children: PropTypes.node.isRequired,

  /** Called with a ref to the inner node. */
  innerRef: ref as any,

  /** The node where the portal should mount. */
  mountNode: PropTypes.any,

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: PropTypes.func,

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: PropTypes.func,
};

Portal.propTypes = {
  /** Primary content. */
  children: PropTypes.node.isRequired,

  /** Controls whether or not the portal should close when the document is clicked. */
  closeOnDocumentClick: PropTypes.bool,

  /** Controls whether or not the portal should close when escape is pressed is displayed. */
  closeOnEscape: PropTypes.bool,

  /**
   * Controls whether or not the portal should close when mousing out of the portal.
   * NOTE: This will prevent `closeOnTriggerMouseLeave` when mousing over the
   * gap from the trigger to the portal.
   */
  closeOnPortalMouseLeave: PropTypes.bool,

  /** Controls whether or not the portal should close on blur of the trigger. */
  closeOnTriggerBlur: PropTypes.bool,

  /** Controls whether or not the portal should close on click of the trigger. */
  closeOnTriggerClick: PropTypes.bool,

  /** Controls whether or not the portal should close when mousing out of the trigger. */
  closeOnTriggerMouseLeave: PropTypes.bool,

  /** Initial value of open. */
  defaultOpen: PropTypes.bool,

  /** Event pool namespace that is used to handle component events */
  eventPool: PropTypes.string,

  /** The node where the portal should mount. */
  mountNode: PropTypes.any,

  /** Milliseconds to wait before opening on mouse over */
  mouseEnterDelay: PropTypes.number,

  /** Milliseconds to wait before closing on mouse leave */
  mouseLeaveDelay: PropTypes.number,

  /**
   * Called when a close event happens
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: PropTypes.func,

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: PropTypes.func,

  /**
   * Called when an open event happens
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: PropTypes.func,

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: PropTypes.func,

  /** Controls whether or not the portal is displayed. */
  open: PropTypes.bool,

  /** Controls whether or not the portal should open when the trigger is clicked. */
  openOnTriggerClick: PropTypes.bool,

  /** Controls whether or not the portal should open on focus of the trigger. */
  openOnTriggerFocus: PropTypes.bool,

  /** Controls whether or not the portal should open when mousing over the trigger. */
  openOnTriggerMouseEnter: PropTypes.bool,

  /** Element to be rendered in-place where the portal is defined. */
  trigger: PropTypes.node,

  /** Called with a ref to the trigger node. */
  triggerRef: ref,
};

Confirm.propTypes = {
  /** The cancel button text. */
  cancelButton: itemShorthand,

  /** The OK button text. */
  confirmButton: itemShorthand,

  /** The ModalContent text. */
  content: itemShorthand,

  /** The ModalHeader text. */
  header: itemShorthand,

  /**
   * Called when the Modal is closed without clicking confirm.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onCancel: PropTypes.func,

  /**
   * Called when the OK button is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onConfirm: PropTypes.func,

  /** Whether or not the modal is visible. */
  open: PropTypes.bool,

  /** A Confirm can vary in size */
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),
};

MountNode.propTypes = {
  /** Additional classes. */
  className: PropTypes.string,

  /** The DOM node where we will apply class names. Defaults to document.body. */
  node: PropTypes.oneOfType([domNode as any, refObject]),
};

PopupHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

PopupContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** The content of the Popup */
  children: PropTypes.node,

  /** Classes to add to the Popup content className. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

Popup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Display the popup without the pointing arrow. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Simple text content for the popover. */
  content: itemShorthand,

  /** Existing element the pop-up should be bound to. */
  context: PropTypes.oneOfType([PropTypes.object, refObject]),

  /** A disabled popup only renders its trigger. */
  disabled: PropTypes.bool,

  /** A flowing Popup has no maximum width and continues to flow to fit its content. */
  flowing: PropTypes.bool,

  /** Takes up the entire width of its offset container. */
  // TODO: implement the Popup fluid layout
  // fluid: PropTypes.bool,

  /** Header displayed above the content in bold. */
  header: itemShorthand,

  /** Hide the Popup when scrolling the window. */
  hideOnScroll: PropTypes.bool,

  /** Whether the popup should not close on hover. */
  hoverable: PropTypes.bool,

  /** Invert the colors of the Popup. */
  inverted: PropTypes.bool,

  /** Offset values in px unit to apply to rendered popup. The basic offset accepts an
   * array with two numbers in the form [skidding, distance].
   *
   * The first number, skidding, displaces the popper along the reference element.
   *
   * The second number, distance, displaces the popper away from, or toward, the
   * reference element in the direction of its placement. A positive number displaces
   * it further away, while a negative number lets it overlap the reference.
   */
  offset: PropTypes.arrayOf(PropTypes.number),

  /** Events triggering the popup. */
  on: PropTypes.oneOfType([
    PropTypes.oneOf(['hover', 'click', 'focus']),
    PropTypes.arrayOf(PropTypes.oneOf(['hover', 'click', 'focus'])),
  ]),

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: PropTypes.func,

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: PropTypes.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: PropTypes.func,

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: PropTypes.func,

  /** Disables automatic repositioning of the component, it will always be placed according to the position value. */
  pinned: PropTypes.bool,

  /** Position for the popover. */
  position: PropTypes.oneOf(positions),

  /** Tells `Popper.js` to use the `position: fixed` strategy to position the popover. */
  positionFixed: PropTypes.bool,

  /** An object containing custom settings for the Popper.js modifiers. */
  popperModifiers: PropTypes.array,

  /** A popup can have dependencies which update will schedule a position update. */
  popperDependencies: PropTypes.array,

  /** Popup size. */
  size: PropTypes.oneOf(_without(SIZES, 'medium', 'big', 'massive')),

  /** Custom Popup style. */
  style: PropTypes.object,

  /** Element to be rendered in-place where the popup is defined. */
  trigger: PropTypes.node,

  /** Popup width. */
  wide: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),
};

StatisticValue.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Format the value with smaller font size to fit nicely beside number values. */
  text: PropTypes.bool,
};

StatisticLabel.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

StatisticGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A statistic group can be formatted to be different colors. */
  color: PropTypes.oneOf(COLORS as any),

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A statistic group can present its measurement horizontally. */
  horizontal: PropTypes.bool,

  /** A statistic group can be formatted to fit on a dark background. */
  inverted: PropTypes.bool,

  /** Array of props for Statistic. */
  items: collectionShorthand,

  /** A statistic group can vary in size. */
  size: PropTypes.oneOf(_without(SIZES, 'big', 'massive', 'medium')) as any,

  /** A statistic group can have its items divided evenly. */
  widths: PropTypes.oneOf(WIDTHS as any),
};

Statistic.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A statistic can be formatted to be different colors. */
  color: PropTypes.oneOf(COLORS as any),

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A statistic can sit to the left or right of other content. */
  floated: PropTypes.oneOf(FLOATS as any),

  /** A statistic can present its measurement horizontally. */
  horizontal: PropTypes.bool,

  /** A statistic can be formatted to fit on a dark background. */
  inverted: PropTypes.bool,

  /** Label content of the Statistic. */
  label: contentShorthand,

  /** A statistic can vary in size. */
  size: PropTypes.oneOf(_without(SIZES, 'big', 'massive', 'medium')) as any,

  /** Format the StatisticValue with smaller font size to fit nicely beside number values. */
  text: PropTypes.bool,

  /** Value content of the Statistic. */
  value: contentShorthand,
};

ItemMeta.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

// ItemImage.propTypes = {
//   /** An image may appear at different sizes. */
//   size: Image.propTypes.size,
// }
ItemHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

ItemGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Items can be divided to better distinguish between grouped content. */
  divided: PropTypes.bool,

  /** Shorthand array of props for Item. */
  items: collectionShorthand,

  /** An item can be formatted so that the entire contents link to another page. */
  link: PropTypes.bool,

  /** A group of items can relax its padding to provide more negative space. */
  relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

  /** Prevent items from stacking on mobile. */
  unstackable: PropTypes.bool,
};

ItemExtra.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

ItemDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

ItemContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Shorthand for ItemDescription component. */
  description: itemShorthand,

  /** Shorthand for ItemExtra component. */
  extra: itemShorthand,

  /** Shorthand for ItemHeader component. */
  header: itemShorthand,

  /** Shorthand for ItemMeta component. */
  meta: itemShorthand,

  /** Content can specify its vertical alignment. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any),
};

Item.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for ItemContent component. */
  content: contentShorthand,

  /** Shorthand for ItemDescription component. */
  description: itemShorthand,

  /** Shorthand for ItemExtra component. */
  extra: itemShorthand,

  /** Shorthand for ItemHeader component. */
  header: itemShorthand,

  /** Shorthand for ItemImage component. */
  image: itemShorthand,

  /** Shorthand for ItemMeta component. */
  meta: itemShorthand,
};

FeedUser.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

FeedSummary.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Shorthand for FeedDate. */
  date: itemShorthand,

  /** Shorthand for FeedUser. */
  user: itemShorthand,
};

FeedMeta.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Shorthand for FeedLike. */
  like: itemShorthand,
};

FeedLike.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Shorthand for icon. Mutually exclusive with children. */
  icon: itemShorthand,
};

FeedLabel.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** An event can contain icon label. */
  icon: itemShorthand,

  /** An event can contain image label. */
  image: itemShorthand,
};

FeedExtra.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** An event can contain additional information like a set of images. */
  images: every([
    disallow(['text']),
    PropTypes.oneOfType([PropTypes.bool, collectionShorthand]),
  ]),

  /** An event can contain additional text information. */
  text: PropTypes.bool,
};

FeedEvent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for FeedContent. */
  content: itemShorthand,

  /** Shorthand for FeedDate. */
  date: itemShorthand,

  /** Shorthand for FeedExtra with images. */
  extraImages: itemShorthand,

  /** Shorthand for FeedExtra with content. */
  extraText: itemShorthand,

  /** An event can contain icon label. */
  icon: itemShorthand,

  /** An event can contain image label. */
  image: itemShorthand,

  /** Shorthand for FeedMeta. */
  meta: itemShorthand,

  /** Shorthand for FeedSummary. */
  summary: itemShorthand,
};

FeedDate.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

FeedContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** An event can contain a date. */
  date: itemShorthand,

  /** Shorthand for FeedExtra with images. */
  extraImages: FeedExtra.propTypes.images,

  /** Shorthand for FeedExtra with text. */
  extraText: itemShorthand,

  /** Shorthand for FeedMeta. */
  meta: itemShorthand,

  /** Shorthand for FeedSummary. */
  summary: itemShorthand,
};

Feed.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand array of props for FeedEvent. */
  events: collectionShorthand,

  /** A feed can have different sizes. */
  size: PropTypes.oneOf(_without(SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive')) as any,
};

CommentText.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

CommentMetadata.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

CommentGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Comments can be collapsed, or hidden from view. */
  collapsed: PropTypes.bool,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Comments can hide extra information unless a user shows intent to interact with a comment. */
  minimal: PropTypes.bool,

  /** Comments can have different sizes. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')) as any,

  /** A comment list can be threaded to showing the relationship between conversations. */
  threaded: PropTypes.bool,
};

CommentContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

CommentAvatar.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Additional classes. */
  className: PropTypes.string,

  /** Specifies the URL of the image. */
  src: PropTypes.string,
};

CommentAuthor.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

CommentActions.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

CommentAction.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Style as the currently active action. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

Comment.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Comment can be collapsed, or hidden from view. */
  collapsed: PropTypes.bool,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

CardMeta.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A card meta can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(TEXT_ALIGNMENTS, 'justified')) as any,
};

CardHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A card header can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(TEXT_ALIGNMENTS, 'justified')) as any,
};

CardGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A group of cards can center itself inside its container. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A group of cards can double its column width for mobile. */
  doubling: PropTypes.bool,

  /** Shorthand array of props for Card. */
  items: collectionShorthand,

  /** A group of cards can set how many cards should exist in a row. */
  itemsPerRow: PropTypes.oneOf(WIDTHS as any),

  /** A group of cards can automatically stack rows to a single columns on mobile devices. */
  stackable: PropTypes.bool,

  /** A card group can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(TEXT_ALIGNMENTS, 'justified')) as any,
};

//
CardDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A card content can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(TEXT_ALIGNMENTS, 'justified')) as any,
};

CardContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Shorthand for CardDescription. */
  description: itemShorthand,

  /** A card can contain extra content meant to be formatted separately from the main content. */
  extra: PropTypes.bool,

  /** Shorthand for CardHeader. */
  header: itemShorthand,

  /** Shorthand for CardMeta. */
  meta: itemShorthand,

  /** A card content can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_without(TEXT_ALIGNMENTS, 'justified')) as any,
};

Card.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A Card can center itself inside its container. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A Card can be formatted to display different colors. */
  color: PropTypes.oneOf(COLORS as any),

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Shorthand for CardDescription. */
  description: itemShorthand,

  /** Shorthand for primary content of CardContent. */
  extra: contentShorthand,

  /** A Card can be formatted to take up the width of its container. */
  fluid: PropTypes.bool,

  /** Shorthand for CardHeader. */
  header: itemShorthand,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: PropTypes.string,

  /** A card can contain an Image component. */
  image: itemShorthand,

  /** A card can be formatted to link to other content. */
  link: PropTypes.bool,

  /** Shorthand for CardMeta. */
  meta: itemShorthand,

  /**
   * Called on click. When passed, the component renders as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** A Card can be formatted to raise above the page. */
  raised: PropTypes.bool,
};

Advertisement.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Center the advertisement. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Text to be displayed on the advertisement. */
  test: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),

  /** Varies the size of the advertisement. */
  unit: PropTypes.oneOf([
    'medium rectangle',
    'large rectangle',
    'vertical rectangle',
    'small rectangle',
    'mobile banner',
    'banner',
    'vertical banner',
    'top banner',
    'half banner',
    'button',
    'square button',
    'small button',
    'skyscraper',
    'wide skyscraper',
    'leaderboard',
    'large leaderboard',
    'mobile leaderboard',
    'billboard',
    'panorama',
    'netboard',
    'half page',
    'square',
    'small square',
  ]).isRequired as any,
};

Icon.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Formatted to appear bordered. */
  bordered: PropTypes.bool,

  /** Icon can formatted to appear circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the icon. */
  color: PropTypes.oneOf(COLORS as any) as any,

  /** Icons can display a smaller corner icon. */
  corner: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['top left', 'top right', 'bottom left', 'bottom right']),
  ]) as any,

  /** Show that the icon is inactive. */
  disabled: PropTypes.bool,

  /** Fitted, without space to left or right of Icon. */
  fitted: PropTypes.bool,

  /** Icon can be flipped. */
  flipped: PropTypes.oneOf(['horizontally', 'vertically']),

  /** Formatted to have its colors inverted for contrast. */
  inverted: PropTypes.bool,

  /** Icon can be formatted as a link. */
  link: PropTypes.bool,

  /** Icon can be used as a simple loader. */
  loading: PropTypes.bool,

  /** Name of the icon. */
  name: suggest(ALL_ICONS_IN_ALL_CONTEXTS) as any,

  /** Icon can rotated. */
  rotated: PropTypes.oneOf(['clockwise', 'counterclockwise']),

  /** Size of the icon. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')) as any,

  /** Icon can have an aria label. */
  'aria-hidden': PropTypes.string,

  /** Icon can have an aria label. */
  'aria-label': PropTypes.string,
};

IconGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Size of the icon group. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')) as any,
};

Image.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An image may be formatted to appear inline with text as an avatar. */
  avatar: PropTypes.bool,

  /** An image may include a border to emphasize the edges of white or transparent content. */
  bordered: PropTypes.bool,

  /** An image can appear centered in a content block. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** An image may appear circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** An image can show that it is disabled and cannot be selected. */
  disabled: PropTypes.bool,

  /** Shorthand for Dimmer. */
  dimmer: itemShorthand,

  /** An image can sit to the left or right of other content. */
  floated: PropTypes.oneOf(FLOATS as any) as any,

  /** An image can take up the width of its container. */
  fluid: every([PropTypes.bool, disallow(['size'])]),

  /** An image can be hidden. */
  hidden: PropTypes.bool,

  /** Renders the Image as an <a> tag with this href. */
  href: PropTypes.string,

  /** An image may appear inline. */
  inline: PropTypes.bool,

  /** Shorthand for Label. */
  label: itemShorthand,

  /** An image may appear rounded. */
  rounded: PropTypes.bool,

  /** An image may appear at different sizes. */
  size: PropTypes.oneOf(SIZES) as any,

  /** An image can specify that it needs an additional spacing to separate it from nearby content. */
  spaced: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]) as any,

  /** Whether or not to add the ui className. */
  ui: PropTypes.bool,

  /** An image can specify its vertical alignment. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any) as any,

  /** An image can render wrapped in a `div.ui.image` as alternative HTML markup. */
  wrapped: PropTypes.bool,
};

ImageGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A group of images can be formatted to have the same size. */
  size: PropTypes.oneOf(SIZES) as any,
};

Container.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Container has no maximum width. */
  fluid: PropTypes.bool,

  /** Reduce maximum width to more naturally accommodate text. */
  text: PropTypes.bool,

  /** Align container text. */
  textAlign: PropTypes.oneOf(TEXT_ALIGNMENTS as any) as any,
};

Divider.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Divider can clear the content above it. */
  clearing: PropTypes.bool,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Divider can be fitted without any space above or below it. */
  fitted: PropTypes.bool,

  /** Divider can divide content without creating a dividing line. */
  hidden: PropTypes.bool,

  /** Divider can segment content horizontally. */
  horizontal: PropTypes.bool,

  /** Divider can have its colours inverted. */
  inverted: PropTypes.bool,

  /** Divider can provide greater margins to divide sections of content. */
  section: PropTypes.bool,

  /** Divider can segment content vertically. */
  vertical: PropTypes.bool,
};

const flagNames = [
  'ad',
  'andorra',
  'ae',
  'united arab emirates',
  'uae',
  'af',
  'afghanistan',
  'ag',
  'antigua',
  'ai',
  'anguilla',
  'al',
  'albania',
  'am',
  'armenia',
  'an',
  'netherlands antilles',
  'ao',
  'angola',
  'ar',
  'argentina',
  'as',
  'american samoa',
  'at',
  'austria',
  'au',
  'australia',
  'aw',
  'aruba',
  'ax',
  'aland islands',
  'az',
  'azerbaijan',
  'ba',
  'bosnia',
  'bb',
  'barbados',
  'bd',
  'bangladesh',
  'be',
  'belgium',
  'bf',
  'burkina faso',
  'bg',
  'bulgaria',
  'bh',
  'bahrain',
  'bi',
  'burundi',
  'bj',
  'benin',
  'bm',
  'bermuda',
  'bn',
  'brunei',
  'bo',
  'bolivia',
  'br',
  'brazil',
  'bs',
  'bahamas',
  'bt',
  'bhutan',
  'bv',
  'bouvet island',
  'bw',
  'botswana',
  'by',
  'belarus',
  'bz',
  'belize',
  'ca',
  'canada',
  'cc',
  'cocos islands',
  'cd',
  'congo',
  'cf',
  'central african republic',
  'cg',
  'congo brazzaville',
  'ch',
  'switzerland',
  'ci',
  'cote divoire',
  'ck',
  'cook islands',
  'cl',
  'chile',
  'cm',
  'cameroon',
  'cn',
  'china',
  'co',
  'colombia',
  'cr',
  'costa rica',
  'cs',
  'cu',
  'cuba',
  'cv',
  'cape verde',
  'cx',
  'christmas island',
  'cy',
  'cyprus',
  'cz',
  'czech republic',
  'de',
  'germany',
  'dj',
  'djibouti',
  'dk',
  'denmark',
  'dm',
  'dominica',
  'do',
  'dominican republic',
  'dz',
  'algeria',
  'ec',
  'ecuador',
  'ee',
  'estonia',
  'eg',
  'egypt',
  'eh',
  'western sahara',
  'er',
  'eritrea',
  'es',
  'spain',
  'et',
  'ethiopia',
  'eu',
  'european union',
  'fi',
  'finland',
  'fj',
  'fiji',
  'fk',
  'falkland islands',
  'fm',
  'micronesia',
  'fo',
  'faroe islands',
  'fr',
  'france',
  'ga',
  'gabon',
  'gb',
  'uk',
  'united kingdom',
  'gd',
  'grenada',
  'ge',
  'georgia',
  'gf',
  'french guiana',
  'gh',
  'ghana',
  'gi',
  'gibraltar',
  'gl',
  'greenland',
  'gm',
  'gambia',
  'gn',
  'guinea',
  'gp',
  'guadeloupe',
  'gq',
  'equatorial guinea',
  'gr',
  'greece',
  'gs',
  'sandwich islands',
  'gt',
  'guatemala',
  'gu',
  'guam',
  'gw',
  'guinea-bissau',
  'gy',
  'guyana',
  'hk',
  'hong kong',
  'hm',
  'heard island',
  'hn',
  'honduras',
  'hr',
  'croatia',
  'ht',
  'haiti',
  'hu',
  'hungary',
  'id',
  'indonesia',
  'ie',
  'ireland',
  'il',
  'israel',
  'in',
  'india',
  'io',
  'indian ocean territory',
  'iq',
  'iraq',
  'ir',
  'iran',
  'is',
  'iceland',
  'it',
  'italy',
  'jm',
  'jamaica',
  'jo',
  'jordan',
  'jp',
  'japan',
  'ke',
  'kenya',
  'kg',
  'kyrgyzstan',
  'kh',
  'cambodia',
  'ki',
  'kiribati',
  'km',
  'comoros',
  'kn',
  'saint kitts and nevis',
  'kp',
  'north korea',
  'kr',
  'south korea',
  'kw',
  'kuwait',
  'ky',
  'cayman islands',
  'kz',
  'kazakhstan',
  'la',
  'laos',
  'lb',
  'lebanon',
  'lc',
  'saint lucia',
  'li',
  'liechtenstein',
  'lk',
  'sri lanka',
  'lr',
  'liberia',
  'ls',
  'lesotho',
  'lt',
  'lithuania',
  'lu',
  'luxembourg',
  'lv',
  'latvia',
  'ly',
  'libya',
  'ma',
  'morocco',
  'mc',
  'monaco',
  'md',
  'moldova',
  'me',
  'montenegro',
  'mg',
  'madagascar',
  'mh',
  'marshall islands',
  'mk',
  'macedonia',
  'ml',
  'mali',
  'mm',
  'myanmar',
  'burma',
  'mn',
  'mongolia',
  'mo',
  'macau',
  'mp',
  'northern mariana islands',
  'mq',
  'martinique',
  'mr',
  'mauritania',
  'ms',
  'montserrat',
  'mt',
  'malta',
  'mu',
  'mauritius',
  'mv',
  'maldives',
  'mw',
  'malawi',
  'mx',
  'mexico',
  'my',
  'malaysia',
  'mz',
  'mozambique',
  'na',
  'namibia',
  'nc',
  'new caledonia',
  'ne',
  'niger',
  'nf',
  'norfolk island',
  'ng',
  'nigeria',
  'ni',
  'nicaragua',
  'nl',
  'netherlands',
  'no',
  'norway',
  'np',
  'nepal',
  'nr',
  'nauru',
  'nu',
  'niue',
  'nz',
  'new zealand',
  'om',
  'oman',
  'pa',
  'panama',
  'pe',
  'peru',
  'pf',
  'french polynesia',
  'pg',
  'new guinea',
  'ph',
  'philippines',
  'pk',
  'pakistan',
  'pl',
  'poland',
  'pm',
  'saint pierre',
  'pn',
  'pitcairn islands',
  'pr',
  'puerto rico',
  'ps',
  'palestine',
  'pt',
  'portugal',
  'pw',
  'palau',
  'py',
  'paraguay',
  'qa',
  'qatar',
  're',
  'reunion',
  'ro',
  'romania',
  'rs',
  'serbia',
  'ru',
  'russia',
  'rw',
  'rwanda',
  'sa',
  'saudi arabia',
  'sb',
  'solomon islands',
  'sc',
  'seychelles',
  'gb sct',
  'scotland',
  'sd',
  'sudan',
  'se',
  'sweden',
  'sg',
  'singapore',
  'sh',
  'saint helena',
  'si',
  'slovenia',
  'sj',
  'svalbard',
  'jan mayen',
  'sk',
  'slovakia',
  'sl',
  'sierra leone',
  'sm',
  'san marino',
  'sn',
  'senegal',
  'so',
  'somalia',
  'sr',
  'suriname',
  'st',
  'sao tome',
  'sv',
  'el salvador',
  'sy',
  'syria',
  'sz',
  'swaziland',
  'tc',
  'caicos islands',
  'td',
  'chad',
  'tf',
  'french territories',
  'tg',
  'togo',
  'th',
  'thailand',
  'tj',
  'tajikistan',
  'tk',
  'tokelau',
  'tl',
  'timorleste',
  'tm',
  'turkmenistan',
  'tn',
  'tunisia',
  'to',
  'tonga',
  'tr',
  'turkey',
  'tt',
  'trinidad',
  'tv',
  'tuvalu',
  'tw',
  'taiwan',
  'tz',
  'tanzania',
  'ua',
  'ukraine',
  'ug',
  'uganda',
  'um',
  'us minor islands',
  'us',
  'america',
  'united states',
  'uy',
  'uruguay',
  'uz',
  'uzbekistan',
  'va',
  'vatican city',
  'vc',
  'saint vincent',
  've',
  'venezuela',
  'vg',
  'british virgin islands',
  'vi',
  'us virgin islands',
  'vn',
  'vietnam',
  'vu',
  'vanuatu',
  'gb wls',
  'wales',
  'wf',
  'wallis and futuna',
  'ws',
  'samoa',
  'ye',
  'yemen',
  'yt',
  'mayotte',
  'za',
  'south africa',
  'zm',
  'zambia',
  'zw',
  'zimbabwe',
];

Flag.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Additional classes. */
  className: PropTypes.string,

  /** Flag name, can use the two digit country code, the full name, or a common alias. */
  name: suggest(flagNames) as any,
};

Header.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Attach header  to other content, like a segment. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]) as any,

  /** Format header to appear inside a content block. */
  block: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the header. */
  color: PropTypes.oneOf(COLORS as any) as any,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Show that the header is inactive. */
  disabled: PropTypes.bool,

  /** Divide header from the content below it. */
  dividing: PropTypes.bool,

  /** Header can sit to the left or right of other content. */
  floated: PropTypes.oneOf(FLOATS as any) as any,

  /** Add an icon by icon name or pass an Icon. */
  icon: every([
    disallow(['image']),
    PropTypes.oneOfType([PropTypes.bool, itemShorthand]),
  ]),

  /** Add an image by img src or pass an Image. */
  image: every([
    disallow(['icon']),
    PropTypes.oneOfType([PropTypes.bool, itemShorthand]),
  ]),

  /** Inverts the color of the header for dark backgrounds. */
  inverted: PropTypes.bool,

  /** Content headings are sized with em and are based on the font-size of their container. */
  size: PropTypes.oneOf(_without(SIZES, 'big', 'massive', 'mini')) as any,

  /** Headers may be formatted to label smaller or de-emphasized content. */
  sub: PropTypes.bool,

  /** Shorthand for Header.Subheader. */
  subheader: itemShorthand,

  /** Align header content. */
  textAlign: PropTypes.oneOf(TEXT_ALIGNMENTS as any) as any,
};

HeaderContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

HeaderSubheader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

Input.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An Input can be formatted to alert the user to an action they may perform. */
  action: PropTypes.oneOfType([PropTypes.bool, itemShorthand]),

  /** An action can appear along side an Input on the left or right. */
  actionPosition: PropTypes.oneOf(['left']),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** An Input field can show that it is disabled. */
  disabled: PropTypes.bool,

  /** An Input field can show the data contains errors. */
  error: PropTypes.bool,

  /** Take on the size of its container. */
  fluid: PropTypes.bool,

  /** An Input field can show a user is currently interacting with it. */
  focus: PropTypes.bool,

  /** Optional Icon to display inside the Input. */
  icon: PropTypes.oneOfType([PropTypes.bool, itemShorthand]),

  /** An Icon can appear inside an Input on the left or right. */
  iconPosition: PropTypes.oneOf(['left']),

  /** Shorthand for creating the HTML Input. */
  input: itemShorthand,

  /** Format to appear on dark backgrounds. */
  inverted: PropTypes.bool,

  /** Optional Label to display along side the Input. */
  label: itemShorthand,

  /** A Label can appear outside an Input on the left or right. */
  labelPosition: PropTypes.oneOf(['left', 'right', 'left corner', 'right corner']),

  /** An Icon Input field can show that it is currently loading data. */
  loading: PropTypes.bool,

  /**
   * Called on change.
   *
   * @param {ChangeEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and a proposed value.
   */
  onChange: PropTypes.func,

  /** An Input can vary in size. */
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),

  /** An Input can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Transparent Input has no background. */
  transparent: PropTypes.bool,

  /** The HTML input type. */
  type: PropTypes.string,
};

ListList.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

ListItem.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A list item can active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /**
   * Shorthand for primary content.
   *
   * Heads up!
   *
   * This is handled slightly differently than the typical `content` prop since
   * the wrapping ListContent is not used when there's no icon or image.
   *
   * If you pass content as:
   * - an element/literal, it's treated as the sibling node to
   * header/description (whether wrapped in Item.Content or not).
   * - a props object, it forces the presence of Item.Content and passes those
   * props to it. If you pass a content prop within that props object, it
   * will be treated as the sibling node to header/description.
   */
  content: itemShorthand,

  /** Shorthand for ListDescription. */
  description: itemShorthand,

  /** A list item can disabled. */
  disabled: PropTypes.bool,

  /** Shorthand for ListHeader. */
  header: itemShorthand,

  /** Shorthand for ListIcon. */
  icon: every([
    disallow(['image']),
    itemShorthand,
  ]),

  /** Shorthand for Image. */
  image: every([
    disallow(['icon']),
    itemShorthand,
  ]),

  /** A ListItem can be clicked */
  onClick: PropTypes.func,

  /** A value for an ordered list. */
  value: PropTypes.string,
};

ListIcon.propTypes = {
  /** Additional classes. */
  className: PropTypes.string,

  /** An element inside a list can be vertically aligned. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any) as any,
};

ListHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

ListDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

ListContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Shorthand for ListDescription. */
  description: itemShorthand,

  /** An list content can be floated left or right. */
  floated: PropTypes.oneOf(FLOATS as any) as any,

  /** Shorthand for ListHeader. */
  header: itemShorthand,

  /** An element inside a list can be vertically aligned. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any) as any,
};

List.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A list can animate to set the current item apart from the list. */
  animated: PropTypes.bool,

  /** A list can mark items with a bullet. */
  bulleted: PropTypes.bool,

  /** A list can divide its items into cells. */
  celled: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A list can show divisions between content. */
  divided: PropTypes.bool,

  /** An list can be floated left or right. */
  floated: PropTypes.oneOf(FLOATS as any) as any,

  /** A list can be formatted to have items appear horizontally. */
  horizontal: PropTypes.bool,

  /** A list can be inverted to appear on a dark background. */
  inverted: PropTypes.bool,

  /** Shorthand array of props for ListItem. */
  items: collectionShorthand,

  /** A list can be specially formatted for navigation links. */
  link: PropTypes.bool,

  /**
   * onClick handler for ListItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick: every([disallow(['children']), PropTypes.func]),

  /** A list can be ordered numerically. */
  ordered: PropTypes.bool,

  /** A list can relax its padding to provide more negative space. */
  relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

  /** A selection list formats list items as possible choices. */
  selection: PropTypes.bool,

  /** A list can vary in size. */
  size: PropTypes.oneOf(SIZES) as any,

  /** An element inside a list can be vertically aligned. */
  verticalAlign: PropTypes.oneOf(VERTICAL_ALIGNMENTS as any) as any,
};

Rail.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A rail can appear attached to the main viewport. */
  attached: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A rail can appear closer to the main viewport. */
  close: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A rail can create a division between itself and a container. */
  dividing: PropTypes.bool,

  /** A rail can attach itself to the inside of a container. */
  internal: PropTypes.bool,

  /** A rail can be presented on the left or right side of a container. */
  position: PropTypes.oneOf(FLOATS as any).isRequired as any,

  /** A rail can have different sizes. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')) as any,
};

Loader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A loader can be active or visible. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A loader can be disabled or hidden. */
  disabled: PropTypes.bool,

  /** A loader can show it's unsure of how long a task will take. */
  indeterminate: PropTypes.bool,

  /** Loaders can appear inline with content. */
  inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['centered'])]) as any,

  /** Loaders can have their colors inverted. */
  inverted: PropTypes.bool,

  /** Loaders can have different sizes. */
  size: PropTypes.oneOf(SIZES) as any,
};

PlaceholderParagraph.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

PlaceholderLine.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Additional classes. */
  className: PropTypes.string,

  /** A line can specify how long its contents should appear. */
  length: PropTypes.oneOf(['full', 'very long', 'long', 'medium', 'short', 'very short']),
};

PlaceholderImage.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Additional classes. */
  className: PropTypes.string,

  /** An image can modify size correctly with responsive styles. */
  square: every([disallow(['rectangular']), PropTypes.bool]),

  /** An image can modify size correctly with responsive styles. */
  rectangular: every([disallow(['square']), PropTypes.bool]),
};

PlaceholderHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A placeholder can contain an image. */
  image: PropTypes.bool,
};

Placeholder.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A fluid placeholder takes up the width of its container. */
  fluid: PropTypes.bool,

  /** A placeholder can have their colors inverted. */
  inverted: PropTypes.bool,
};

RevealContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A reveal may contain content that is visible before interaction. */
  hidden: PropTypes.bool,

  /** A reveal may contain content that is hidden before user interaction. */
  visible: PropTypes.bool,
};

Reveal.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An active reveal displays its hidden content. */
  active: PropTypes.bool,

  /** An animation name that will be applied to Reveal. */
  animated: PropTypes.oneOf([
    'fade',
    'small fade',
    'move',
    'move right',
    'move up',
    'move down',
    'rotate',
    'rotate left',
  ]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A disabled reveal will not animate when hovered. */
  disabled: PropTypes.bool,

  /** An element can show its content without delay. */
  instant: PropTypes.bool,
};

SegmentInline.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
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
  content: contentShorthand,

  /** Formats content to be aligned horizontally. */
  horizontal: PropTypes.bool,

  /** Formatted to look like a pile of pages. */
  piled: PropTypes.bool,

  /** A segment group may be formatted to raise above the page. */
  raised: PropTypes.bool,

  /** A segment group can have different sizes. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')) as any,

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
  color: PropTypes.oneOf(COLORS as any) as any,

  /** A segment may take up only as much space as is necessary. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A segment may show its content is disabled. */
  disabled: PropTypes.bool,

  /** Segment content can be floated to the left or right. */
  floated: PropTypes.oneOf(FLOATS as any) as any,

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
  size: PropTypes.oneOf(_without(SIZES, 'medium')) as any,

  /** Formatted to show it contains multiple pages. */
  stacked: PropTypes.bool,

  /** A segment can be formatted to appear even less noticeable. */
  tertiary: PropTypes.bool,

  /** Formats content to be aligned as part of a vertical group. */
  textAlign: PropTypes.oneOf(_without(TEXT_ALIGNMENTS, 'justified')) as any,

  /** Formats content to be aligned vertically. */
  vertical: PropTypes.bool,
};

StepTitle.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

const numberMap = Object.entries(numberToWordMap).reduce((a, [k, v]) => { if (+k <= 8) a[k] = v; return a; }, {} as any);

StepGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Steps can be attached to other elements. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]) as any,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A fluid step takes up the width of its container. */
  fluid: PropTypes.bool,

  /** Shorthand array of props for Step. */
  items: collectionShorthand,

  /** A step can show a ordered sequence of steps. */
  ordered: PropTypes.bool,

  /** Steps can have different sizes. */
  size: PropTypes.oneOf(_without(SIZES, 'medium')) as any,

  /** A step can stack vertically only on smaller screens. */
  stackable: PropTypes.oneOf(['tablet']),

  /** A step can prevent itself from stacking on mobile. */
  unstackable: PropTypes.bool,

  /** A step can be displayed stacked vertically. */
  vertical: PropTypes.bool,

  /** Steps can be divided evenly inside their parent. */
  widths: PropTypes.oneOf([
    ...Object.keys(numberMap),
    ...Object.keys(numberMap).map(Number),
    ...Object.values(numberMap),
  ]) as any,
};

StepDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

StepContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Shorthand for StepDescription. */
  description: itemShorthand,

  /** Shorthand for StepTitle. */
  title: itemShorthand,
};

Step.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A step can be highlighted as active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A step can show that a user has completed it. */
  completed: PropTypes.bool,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Shorthand for StepDescription. */
  description: itemShorthand,

  /** Show that the Loader is inactive. */
  disabled: PropTypes.bool,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: PropTypes.string,

  /** Shorthand for Icon. */
  icon: itemShorthand,

  /** A step can be link. */
  link: PropTypes.bool,

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** A step can show a ordered sequence of steps. Passed from StepGroup. */
  ordered: PropTypes.bool,

  /** Shorthand for StepTitle. */
  title: itemShorthand,
};

Label.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A label can be active. */
  active: PropTypes.bool,

  /** A label can attach to a content segment. */
  attached: PropTypes.oneOf([
    'top',
    'bottom',
    'top right',
    'top left',
    'bottom left',
    'bottom right',
  ]),

  /** A label can reduce its complexity. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** A label can be circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the label. */
  color: PropTypes.oneOf(COLORS as any) as any,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A label can position itself in the corner of an element. */
  corner: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]) as any,

  /** Shorthand for LabelDetail. */
  detail: itemShorthand,

  /** Formats the label as a dot. */
  empty: every([PropTypes.bool, demand(['circular'])]),

  /** Float above another element in the upper right corner. */
  floating: PropTypes.bool,

  /** A horizontal label is formatted to label content along-side it horizontally. */
  horizontal: PropTypes.bool,

  /** Shorthand for Icon. */
  icon: itemShorthand,

  /** A label can be formatted to emphasize an image or prop can be used as shorthand for Image. */
  image: PropTypes.oneOfType([PropTypes.bool, itemShorthand]),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Adds an "x" icon, called when "x" is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onRemove: PropTypes.func,

  /** A label can point to content next to it. */
  pointing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['above', 'below', 'left', 'right']),
  ]) as any,

  /** A label can prompt for an error in your forms. */
  prompt: PropTypes.bool,

  /** Shorthand for Icon to appear as the last child and trigger onRemove. */
  removeIcon: itemShorthand,

  /** A label can appear as a ribbon attaching itself to an element. */
  ribbon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]) as any,

  /** A label can have different sizes. */
  size: PropTypes.oneOf(SIZES) as any,

  /** A label can appear as a tag. */
  tag: PropTypes.bool,
};

LabelDetail.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,
};

LabelGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Labels can share shapes. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Label group can share colors together. */
  color: PropTypes.oneOf(COLORS as any) as any,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Label group can share sizes together. */
  size: PropTypes.oneOf(SIZES) as any,

  /** Label group can share tag formatting. */
  tag: PropTypes.bool,
};

ButtonOr.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Additional classes. */
  className: PropTypes.string,

  /** Or buttons can have their text localized, or adjusted by using the text prop. */
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ButtonGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Groups can be attached to other content. */
  attached: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  ]) as any,

  /** Groups can be less pronounced. */
  basic: PropTypes.bool,

  /** Array of shorthand Button values. */
  buttons: collectionShorthand,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Groups can have a shared color. */
  color: PropTypes.oneOf(COLORS as any) as any,

  /** Groups can reduce their padding to fit into tighter spaces. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Groups can be aligned to the left or right of its container. */
  floated: PropTypes.oneOf(FLOATS as any) as any,

  /** Groups can take the width of their container. */
  fluid: PropTypes.bool,

  /** Groups can be formatted as icons. */
  icon: PropTypes.bool,

  /** Groups can be formatted to appear on dark backgrounds. */
  inverted: PropTypes.bool,

  /** Groups can be formatted as labeled icon buttons. */
  labeled: PropTypes.bool,

  /** Groups can hint towards a negative consequence. */
  negative: PropTypes.bool,

  /** Groups can hint towards a positive consequence. */
  positive: PropTypes.bool,

  /** Groups can be formatted to show different levels of emphasis. */
  primary: PropTypes.bool,

  /** Groups can be formatted to show different levels of emphasis. */
  secondary: PropTypes.bool,

  /** Groups can have different sizes. */
  size: PropTypes.oneOf(SIZES) as any,

  /** Groups can be formatted to toggle on and off. */
  toggle: PropTypes.bool,

  /** Groups can be formatted to appear vertically. */
  vertical: PropTypes.bool,

  /** Groups can have their widths divided evenly. */
  widths: PropTypes.oneOf(WIDTHS as any) as any,
};

ButtonContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** Initially hidden, visible on hover. */
  hidden: PropTypes.bool,

  /** Initially visible, hidden on hover. */
  visible: PropTypes.bool,
};

Button.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A button can show it is currently the active user selection. */
  active: PropTypes.bool,

  /** A button can animate to show hidden content. */
  animated: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['fade', 'vertical'])]) as any,

  /** A button can be attached to other content. */
  attached: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  ]) as any,

  /** A basic button is less pronounced. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: every([
    PropTypes.node,
    disallow(['label']),
    givenProps(
      {
        icon: PropTypes.oneOfType([
          PropTypes.string.isRequired,
          PropTypes.object.isRequired,
          PropTypes.element.isRequired,
        ]),
      },
      disallow(['icon']),
    ),
  ]),

  /** A button can be circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** A button can have different colors */
  color: PropTypes.oneOf([
    ...COLORS,
    'facebook',
    'google plus',
    'instagram',
    'linkedin',
    'twitter',
    'vk',
    'youtube',
  ]) as any,

  /** A button can reduce its padding to fit into tighter spaces. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: contentShorthand,

  /** A button can show it is currently unable to be interacted with. */
  disabled: PropTypes.bool,

  /** A button can be aligned to the left or right of its container. */
  floated: PropTypes.oneOf(FLOATS as any) as any,

  /** A button can take the width of its container. */
  fluid: PropTypes.bool,

  /** Add an Icon by name, props object, or pass an <Icon />. */
  icon: some([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]) as any,

  /** A button can be formatted to appear on dark backgrounds. */
  inverted: PropTypes.bool,

  /** Add a Label by text, props object, or pass a <Label />. */
  label: some([PropTypes.string, PropTypes.object, PropTypes.element]) as any,

  /** A labeled button can format a Label or Icon to appear on the left or right. */
  labelPosition: PropTypes.oneOf(['right', 'left']),

  /** A button can show a loading indicator. */
  loading: PropTypes.bool,

  /** A button can hint towards a negative consequence. */
  negative: PropTypes.bool,

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** A button can hint towards a positive consequence. */
  positive: PropTypes.bool,

  /** A button can be formatted to show different levels of emphasis. */
  primary: PropTypes.bool,

  /** The role of the HTML element. */
  role: PropTypes.string,

  /** A button can be formatted to show different levels of emphasis. */
  secondary: PropTypes.bool,

  /** A button can have different sizes. */
  size: PropTypes.oneOf(SIZES) as any,

  /** A button can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

  /** A button can be formatted to toggle on and off. */
  toggle: PropTypes.bool,
};
