import PropTypes from 'prop-types';
// import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Item } from './Item';
import { ItemContent } from './ItemContent';
import { ItemDescription } from './ItemDescription';
import { ItemExtra } from './ItemExtra';
import { ItemGroup } from './ItemGroup';
import { ItemHeader } from './ItemHeader';
import { ItemImage } from './ItemImage';
import { Image } from '../Image';
import { ItemMeta } from './ItemMeta';

ItemMeta.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

ItemImage.propTypes = {
    /** An image may appear at different sizes. */
    size: Image.propTypes!.size,
};

ItemHeader.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

ItemGroup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Items can be divided to better distinguish between grouped content. */
    divided: PropTypes.bool,

    /** Shorthand array of props for Item. */
    items: customPropTypes.collectionShorthand,

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
    content: customPropTypes.contentShorthand,
};

ItemDescription.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

ItemContent.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for ItemDescription component. */
    description: customPropTypes.itemShorthand,

    /** Shorthand for ItemExtra component. */
    extra: customPropTypes.itemShorthand,

    /** Shorthand for ItemHeader component. */
    header: customPropTypes.itemShorthand,

    /** Shorthand for ItemMeta component. */
    meta: customPropTypes.itemShorthand,

    /** Content can specify its vertical alignment. */
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS as any),
};

Item.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for ItemContent component. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for ItemDescription component. */
    description: customPropTypes.itemShorthand,

    /** Shorthand for ItemExtra component. */
    extra: customPropTypes.itemShorthand,

    /** Shorthand for ItemHeader component. */
    header: customPropTypes.itemShorthand,

    /** Shorthand for ItemImage component. */
    image: customPropTypes.itemShorthand,

    /** Shorthand for ItemMeta component. */
    meta: customPropTypes.itemShorthand,
};

export { };
