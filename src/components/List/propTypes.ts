import PropTypes from 'prop-types';
// import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { ListList } from './ListList';
import { ListItem } from './ListItem';
import { ListIcon } from './ListIcon';
import { ListHeader } from './ListHeader';
import { ListDescription } from './ListDescription';
import { ListContent } from './ListContent';
import { List } from './List';

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
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS as any) as any,
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
    floated: PropTypes.oneOf(SUI.FLOATS as any) as any,

    /** Shorthand for ListHeader. */
    header: customPropTypes.itemShorthand,

    /** An element inside a list can be vertically aligned. */
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS as any) as any,
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
    floated: PropTypes.oneOf(SUI.FLOATS as any) as any,

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
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS as any) as any,
};

export { };
