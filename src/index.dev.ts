import _ from 'lodash';
import PropTypes from 'prop-types';
import { customPropTypes, SUI, numberToWordMap } from './lib';

import {
  Image, ImageProps, StrictImageProps,
  ImageGroup, ImageGroupProps, StrictImageGroupProps,
  Icon, IconSizeProp, IconCorner, IconProps, StrictIconProps,
  IconGroup, IconGroupProps, StrictIconGroupProps,
  Container, ContainerProps, StrictContainerProps,
  Divider, DividerProps, StrictDividerProps,
  Flag, FlagNames, FlagProps, StrictFlagProps,
  Header, HeaderProps, StrictHeaderProps,
  HeaderContent, HeaderContentProps, StrictHeaderContentProps,
  HeaderSubheader, HeaderSubheaderProps, StrictHeaderSubheaderProps,
  Input, InputProps, StrictInputProps, InputOnChangeData,
  List, ListProps, StrictListProps,
  ListList, ListListProps, StrictListListProps,
  ListItem, ListItemProps, StrictListItemProps,
  ListContent, ListContentProps, StrictListContentProps,
  ListDescription, ListDescriptionProps, StrictListDescriptionProps,
  ListHeader, ListHeaderProps, StrictListHeaderProps,
  ListIcon, ListIconProps, StrictListIconProps,
  Rail, RailProps, StrictRailProps,
  Loader, LoaderProps, StrictLoaderProps,
  Placeholder, PlaceholderProps, StrictPlaceholderProps,
  PlaceholderHeader, PlaceholderHeaderProps, StrictPlaceholderHeaderProps,
  PlaceholderImage, PlaceholderImageProps, StrictPlaceholderImageProps,
  PlaceholderLine, PlaceholderLineProps, StrictPlaceholderLineProps, SEMANTICLineLength,
  PlaceholderParagraph, PlaceholderParagraphProps, StrictPlaceholderParagraphProps,
  Reveal, RevealProps, StrictRevealProps,
  RevealContent, RevealContentProps, StrictRevealContentProps,
  Segment, SegmentSizeProp, SegmentProps, StrictSegmentProps,
  SegmentGroup, SegmentGroupProps, StrictSegmentGroupProps,
  SegmentInline, SegmentInlineProps, StrictSegmentInlineProps,
  Step, StepProps, StrictStepProps,
  StepContent, StepContentProps, StrictStepContentProps,
  StepDescription, StepDescriptionProps, StrictStepDescriptionProps,
  StepGroup, StepGroupProps, StrictStepGroupProps,
  StepTitle, StepTitleProps, StrictStepTitleProps,
  Label, LabelProps, StrictLabelProps,
  LabelDetail, LabelDetailProps, StrictLabelDetailProps,
  LabelGroup, LabelGroupProps, StrictLabelGroupProps,
  Button, ButtonProps, StrictButtonProps,
  ButtonContent, ButtonContentProps, StrictButtonContentProps,
  ButtonGroup, ButtonGroupProps, StrictButtonGroupProps,
  ButtonOr, ButtonOrProps, StrictButtonOrProps,
} from './elements';

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
  color: PropTypes.oneOf(SUI.COLORS) as any,

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
  name: customPropTypes.suggest(SUI.ALL_ICONS_IN_ALL_CONTEXTS),

  /** Icon can rotated. */
  rotated: PropTypes.oneOf(['clockwise', 'counterclockwise']),

  /** Size of the icon. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')) as any,

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
  content: customPropTypes.contentShorthand,

  /** Size of the icon group. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')) as any,
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
  content: customPropTypes.contentShorthand,

  /** An image can show that it is disabled and cannot be selected. */
  disabled: PropTypes.bool,

  /** Shorthand for Dimmer. */
  dimmer: customPropTypes.itemShorthand,

  /** An image can sit to the left or right of other content. */
  floated: PropTypes.oneOf(SUI.FLOATS) as any,

  /** An image can take up the width of its container. */
  fluid: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['size'])]),

  /** An image can be hidden. */
  hidden: PropTypes.bool,

  /** Renders the Image as an <a> tag with this href. */
  href: PropTypes.string,

  /** An image may appear inline. */
  inline: PropTypes.bool,

  /** Shorthand for Label. */
  label: customPropTypes.itemShorthand,

  /** An image may appear rounded. */
  rounded: PropTypes.bool,

  /** An image may appear at different sizes. */
  size: PropTypes.oneOf(SUI.SIZES) as any,

  /** An image can specify that it needs an additional spacing to separate it from nearby content. */
  spaced: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]) as any,

  /** Whether or not to add the ui className. */
  ui: PropTypes.bool,

  /** An image can specify its vertical alignment. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS) as any,

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
  content: customPropTypes.contentShorthand,

  /** A group of images can be formatted to have the same size. */
  size: PropTypes.oneOf(SUI.SIZES) as any,
};

Container.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Container has no maximum width. */
  fluid: PropTypes.bool,

  /** Reduce maximum width to more naturally accommodate text. */
  text: PropTypes.bool,

  /** Align container text. */
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS) as any,
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
  content: customPropTypes.contentShorthand,

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
  name: customPropTypes.suggest(flagNames),
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
  color: PropTypes.oneOf(SUI.COLORS) as any,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Show that the header is inactive. */
  disabled: PropTypes.bool,

  /** Divide header from the content below it. */
  dividing: PropTypes.bool,

  /** Header can sit to the left or right of other content. */
  floated: PropTypes.oneOf(SUI.FLOATS) as any,

  /** Add an icon by icon name or pass an Icon. */
  icon: customPropTypes.every([
    customPropTypes.disallow(['image']),
    PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  ]),

  /** Add an image by img src or pass an Image. */
  image: customPropTypes.every([
    customPropTypes.disallow(['icon']),
    PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  ]),

  /** Inverts the color of the header for dark backgrounds. */
  inverted: PropTypes.bool,

  /** Content headings are sized with em and are based on the font-size of their container. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'big', 'massive', 'mini')) as any,

  /** Headers may be formatted to label smaller or de-emphasized content. */
  sub: PropTypes.bool,

  /** Shorthand for Header.Subheader. */
  subheader: customPropTypes.itemShorthand,

  /** Align header content. */
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS) as any,
};

HeaderContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
};

HeaderSubheader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
};

Input.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An Input can be formatted to alert the user to an action they may perform. */
  action: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

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
  icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

  /** An Icon can appear inside an Input on the left or right. */
  iconPosition: PropTypes.oneOf(['left']),

  /** Shorthand for creating the HTML Input. */
  input: customPropTypes.itemShorthand,

  /** Format to appear on dark backgrounds. */
  inverted: PropTypes.bool,

  /** Optional Label to display along side the Input. */
  label: customPropTypes.itemShorthand,

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
  content: customPropTypes.contentShorthand,
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
  content: customPropTypes.itemShorthand,

  /** Shorthand for ListDescription. */
  description: customPropTypes.itemShorthand,

  /** A list item can disabled. */
  disabled: PropTypes.bool,

  /** Shorthand for ListHeader. */
  header: customPropTypes.itemShorthand,

  /** Shorthand for ListIcon. */
  icon: customPropTypes.every([
    customPropTypes.disallow(['image']),
    customPropTypes.itemShorthand,
  ]),

  /** Shorthand for Image. */
  image: customPropTypes.every([
    customPropTypes.disallow(['icon']),
    customPropTypes.itemShorthand,
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
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS) as any,
};

ListHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
};

ListDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
};

ListContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for ListDescription. */
  description: customPropTypes.itemShorthand,

  /** An list content can be floated left or right. */
  floated: PropTypes.oneOf(SUI.FLOATS) as any,

  /** Shorthand for ListHeader. */
  header: customPropTypes.itemShorthand,

  /** An element inside a list can be vertically aligned. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS) as any,
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
  content: customPropTypes.contentShorthand,

  /** A list can show divisions between content. */
  divided: PropTypes.bool,

  /** An list can be floated left or right. */
  floated: PropTypes.oneOf(SUI.FLOATS) as any,

  /** A list can be formatted to have items appear horizontally. */
  horizontal: PropTypes.bool,

  /** A list can be inverted to appear on a dark background. */
  inverted: PropTypes.bool,

  /** Shorthand array of props for ListItem. */
  items: customPropTypes.collectionShorthand,

  /** A list can be specially formatted for navigation links. */
  link: PropTypes.bool,

  /**
   * onClick handler for ListItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

  /** A list can be ordered numerically. */
  ordered: PropTypes.bool,

  /** A list can relax its padding to provide more negative space. */
  relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

  /** A selection list formats list items as possible choices. */
  selection: PropTypes.bool,

  /** A list can vary in size. */
  size: PropTypes.oneOf(SUI.SIZES) as any,

  /** An element inside a list can be vertically aligned. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS) as any,
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
  content: customPropTypes.contentShorthand,

  /** A rail can create a division between itself and a container. */
  dividing: PropTypes.bool,

  /** A rail can attach itself to the inside of a container. */
  internal: PropTypes.bool,

  /** A rail can be presented on the left or right side of a container. */
  position: PropTypes.oneOf(SUI.FLOATS).isRequired as any,

  /** A rail can have different sizes. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')) as any,
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
  content: customPropTypes.contentShorthand,

  /** A loader can be disabled or hidden. */
  disabled: PropTypes.bool,

  /** A loader can show it's unsure of how long a task will take. */
  indeterminate: PropTypes.bool,

  /** Loaders can appear inline with content. */
  inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['centered'])]) as any,

  /** Loaders can have their colors inverted. */
  inverted: PropTypes.bool,

  /** Loaders can have different sizes. */
  size: PropTypes.oneOf(SUI.SIZES) as any,
};

PlaceholderParagraph.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
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
  square: customPropTypes.every([customPropTypes.disallow(['rectangular']), PropTypes.bool]),

  /** An image can modify size correctly with responsive styles. */
  rectangular: customPropTypes.every([customPropTypes.disallow(['square']), PropTypes.bool]),
};

PlaceholderHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

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
  content: customPropTypes.contentShorthand,

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
  content: customPropTypes.contentShorthand,

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
  content: customPropTypes.contentShorthand,

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
  content: customPropTypes.contentShorthand,
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
  content: customPropTypes.contentShorthand,

  /** Formats content to be aligned horizontally. */
  horizontal: PropTypes.bool,

  /** Formatted to look like a pile of pages. */
  piled: PropTypes.bool,

  /** A segment group may be formatted to raise above the page. */
  raised: PropTypes.bool,

  /** A segment group can have different sizes. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')) as any,

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
  color: PropTypes.oneOf(SUI.COLORS) as any,

  /** A segment may take up only as much space as is necessary. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A segment may show its content is disabled. */
  disabled: PropTypes.bool,

  /** Segment content can be floated to the left or right. */
  floated: PropTypes.oneOf(SUI.FLOATS) as any,

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
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')) as any,

  /** Formatted to show it contains multiple pages. */
  stacked: PropTypes.bool,

  /** A segment can be formatted to appear even less noticeable. */
  tertiary: PropTypes.bool,

  /** Formats content to be aligned as part of a vertical group. */
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')) as any,

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
  content: customPropTypes.contentShorthand,
};

const numberMap = _.pickBy(numberToWordMap, (_val, key: any) => key <= 8);

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
  content: customPropTypes.contentShorthand,

  /** A fluid step takes up the width of its container. */
  fluid: PropTypes.bool,

  /** Shorthand array of props for Step. */
  items: customPropTypes.collectionShorthand,

  /** A step can show a ordered sequence of steps. */
  ordered: PropTypes.bool,

  /** Steps can have different sizes. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),

  /** A step can stack vertically only on smaller screens. */
  stackable: PropTypes.oneOf(['tablet']),

  /** A step can prevent itself from stacking on mobile. */
  unstackable: PropTypes.bool,

  /** A step can be displayed stacked vertically. */
  vertical: PropTypes.bool,

  /** Steps can be divided evenly inside their parent. */
  widths: PropTypes.oneOf([
    ..._.keys(numberMap),
    ..._.keys(numberMap).map(Number),
    ..._.values(numberMap),
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
  content: customPropTypes.contentShorthand,
};

StepContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for StepDescription. */
  description: customPropTypes.itemShorthand,

  /** Shorthand for StepTitle. */
  title: customPropTypes.itemShorthand,
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
  content: customPropTypes.contentShorthand,

  /** Shorthand for StepDescription. */
  description: customPropTypes.itemShorthand,

  /** Show that the Loader is inactive. */
  disabled: PropTypes.bool,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: PropTypes.string,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,

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
  title: customPropTypes.itemShorthand,
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
  color: PropTypes.oneOf(SUI.COLORS) as any,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A label can position itself in the corner of an element. */
  corner: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]) as any,

  /** Shorthand for LabelDetail. */
  detail: customPropTypes.itemShorthand,

  /** Formats the label as a dot. */
  empty: customPropTypes.every([PropTypes.bool, customPropTypes.demand(['circular'])]),

  /** Float above another element in the upper right corner. */
  floating: PropTypes.bool,

  /** A horizontal label is formatted to label content along-side it horizontally. */
  horizontal: PropTypes.bool,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,

  /** A label can be formatted to emphasize an image or prop can be used as shorthand for Image. */
  image: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

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
  removeIcon: customPropTypes.itemShorthand,

  /** A label can appear as a ribbon attaching itself to an element. */
  ribbon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]) as any,

  /** A label can have different sizes. */
  size: PropTypes.oneOf(SUI.SIZES) as any,

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
  content: customPropTypes.contentShorthand,
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
  color: PropTypes.oneOf(SUI.COLORS) as any,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Label group can share sizes together. */
  size: PropTypes.oneOf(SUI.SIZES) as any,

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
  buttons: customPropTypes.collectionShorthand,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Groups can have a shared color. */
  color: PropTypes.oneOf(SUI.COLORS) as any,

  /** Groups can reduce their padding to fit into tighter spaces. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Groups can be aligned to the left or right of its container. */
  floated: PropTypes.oneOf(SUI.FLOATS) as any,

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
  size: PropTypes.oneOf(SUI.SIZES) as any,

  /** Groups can be formatted to toggle on and off. */
  toggle: PropTypes.bool,

  /** Groups can be formatted to appear vertically. */
  vertical: PropTypes.bool,

  /** Groups can have their widths divided evenly. */
  widths: PropTypes.oneOf(SUI.WIDTHS) as any,
};

ButtonContent.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

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
  children: customPropTypes.every([
    PropTypes.node,
    customPropTypes.disallow(['label']),
    customPropTypes.givenProps(
      {
        icon: PropTypes.oneOfType([
          PropTypes.string.isRequired,
          PropTypes.object.isRequired,
          PropTypes.element.isRequired,
        ]),
      },
      customPropTypes.disallow(['icon']),
    ),
  ]),

  /** A button can be circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** A button can have different colors */
  color: PropTypes.oneOf([
    ...SUI.COLORS,
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
  content: customPropTypes.contentShorthand,

  /** A button can show it is currently unable to be interacted with. */
  disabled: PropTypes.bool,

  /** A button can be aligned to the left or right of its container. */
  floated: PropTypes.oneOf(SUI.FLOATS) as any,

  /** A button can take the width of its container. */
  fluid: PropTypes.bool,

  /** Add an Icon by name, props object, or pass an <Icon />. */
  icon: customPropTypes.some([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]),

  /** A button can be formatted to appear on dark backgrounds. */
  inverted: PropTypes.bool,

  /** Add a Label by text, props object, or pass a <Label />. */
  label: customPropTypes.some([PropTypes.string, PropTypes.object, PropTypes.element]),

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
  size: PropTypes.oneOf(SUI.SIZES) as any,

  /** A button can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

  /** A button can be formatted to toggle on and off. */
  toggle: PropTypes.bool,
};

export {
  Image, ImageProps, StrictImageProps,
  ImageGroup, ImageGroupProps, StrictImageGroupProps,
  Icon, IconSizeProp, IconCorner, IconProps, StrictIconProps,
  IconGroup, IconGroupProps, StrictIconGroupProps,
  Container, ContainerProps, StrictContainerProps,
  Divider, DividerProps, StrictDividerProps,
  Flag, FlagNames, FlagProps, StrictFlagProps,
  Header, HeaderProps, StrictHeaderProps,
  HeaderContent, HeaderContentProps, StrictHeaderContentProps,
  HeaderSubheader, HeaderSubheaderProps, StrictHeaderSubheaderProps,
  Input, InputProps, StrictInputProps, InputOnChangeData,
  List, ListProps, StrictListProps,
  ListList, ListListProps, StrictListListProps,
  ListItem, ListItemProps, StrictListItemProps,
  ListContent, ListContentProps, StrictListContentProps,
  ListDescription, ListDescriptionProps, StrictListDescriptionProps,
  ListHeader, ListHeaderProps, StrictListHeaderProps,
  ListIcon, ListIconProps, StrictListIconProps,
  Rail, RailProps, StrictRailProps,
  Loader, LoaderProps, StrictLoaderProps,
  Placeholder, PlaceholderProps, StrictPlaceholderProps,
  PlaceholderHeader, PlaceholderHeaderProps, StrictPlaceholderHeaderProps,
  PlaceholderImage, PlaceholderImageProps, StrictPlaceholderImageProps,
  PlaceholderLine, PlaceholderLineProps, StrictPlaceholderLineProps, SEMANTICLineLength,
  PlaceholderParagraph, PlaceholderParagraphProps, StrictPlaceholderParagraphProps,
  Reveal, RevealProps, StrictRevealProps,
  RevealContent, RevealContentProps, StrictRevealContentProps,
  Segment, SegmentSizeProp, SegmentProps, StrictSegmentProps,
  SegmentGroup, SegmentGroupProps, StrictSegmentGroupProps,
  SegmentInline, SegmentInlineProps, StrictSegmentInlineProps,
  Step, StepProps, StrictStepProps,
  StepContent, StepContentProps, StrictStepContentProps,
  StepDescription, StepDescriptionProps, StrictStepDescriptionProps,
  StepGroup, StepGroupProps, StrictStepGroupProps,
  StepTitle, StepTitleProps, StrictStepTitleProps,
  Label, LabelProps, StrictLabelProps,
  LabelDetail, LabelDetailProps, StrictLabelDetailProps,
  LabelGroup, LabelGroupProps, StrictLabelGroupProps,
  Button, ButtonProps, StrictButtonProps,
  ButtonContent, ButtonContentProps, StrictButtonContentProps,
  ButtonGroup, ButtonGroupProps, StrictButtonGroupProps,
  ButtonOr, ButtonOrProps, StrictButtonOrProps,

};

require('./views/prop_types');
