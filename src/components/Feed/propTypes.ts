import PropTypes from 'prop-types';
import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Feed } from './Feed';
import { FeedContent } from './FeedContent';
import { FeedDate } from './FeedDate';
import { FeedEvent } from './FeedEvent';
import { FeedExtra } from './FeedExtra';
import { FeedLabel } from './FeedLabel';
import { FeedLike } from './FeedLike';
import { FeedMeta } from './FeedMeta';
import { FeedSummary } from './FeedSummary';
import { FeedUser } from './FeedUser';

FeedUser.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

FeedSummary.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for FeedDate. */
    date: customPropTypes.itemShorthand,

    /** Shorthand for FeedUser. */
    user: customPropTypes.itemShorthand,
};

FeedMeta.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for FeedLike. */
    like: customPropTypes.itemShorthand,
};

FeedLike.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for icon. Mutually exclusive with children. */
    icon: customPropTypes.itemShorthand,
};

FeedLabel.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** An event can contain icon label. */
    icon: customPropTypes.itemShorthand,

    /** An event can contain image label. */
    image: customPropTypes.itemShorthand,
};

FeedExtra.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** An event can contain additional information like a set of images. */
    images: customPropTypes.every([
        customPropTypes.disallow(['text']),
        PropTypes.oneOfType([PropTypes.bool, customPropTypes.collectionShorthand]),
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
    content: customPropTypes.itemShorthand,

    /** Shorthand for FeedDate. */
    date: customPropTypes.itemShorthand,

    /** Shorthand for FeedExtra with images. */
    extraImages: customPropTypes.itemShorthand,

    /** Shorthand for FeedExtra with content. */
    extraText: customPropTypes.itemShorthand,

    /** An event can contain icon label. */
    icon: customPropTypes.itemShorthand,

    /** An event can contain image label. */
    image: customPropTypes.itemShorthand,

    /** Shorthand for FeedMeta. */
    meta: customPropTypes.itemShorthand,

    /** Shorthand for FeedSummary. */
    summary: customPropTypes.itemShorthand,
};

FeedDate.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

FeedContent.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** An event can contain a date. */
    date: customPropTypes.itemShorthand,

    /** Shorthand for FeedExtra with images. */
    extraImages: FeedExtra.propTypes.images,

    /** Shorthand for FeedExtra with text. */
    extraText: customPropTypes.itemShorthand,

    /** Shorthand for FeedMeta. */
    meta: customPropTypes.itemShorthand,

    /** Shorthand for FeedSummary. */
    summary: customPropTypes.itemShorthand,
};

Feed.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand array of props for FeedEvent. */
    events: customPropTypes.collectionShorthand,

    /** A feed can have different sizes. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive')) as any,
};

export { };
