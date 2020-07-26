import PropTypes from 'prop-types';
import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Card } from './Card';
import { CardGroup } from './CardGroup';
import { CardContent } from './CardContent';
import { CardDescription } from './CardDescription';
import { CardHeader } from './CardHeader';
import { CardMeta } from './CardMeta';

CardMeta.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A card meta can adjust its text alignment. */
    textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')) as any,
};

CardHeader.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A card header can adjust its text alignment. */
    textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')) as any,
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
    content: customPropTypes.contentShorthand,

    /** A group of cards can double its column width for mobile. */
    doubling: PropTypes.bool,

    /** Shorthand array of props for Card. */
    items: customPropTypes.collectionShorthand,

    /** A group of cards can set how many cards should exist in a row. */
    itemsPerRow: PropTypes.oneOf(SUI.WIDTHS as any),

    /** A group of cards can automatically stack rows to a single columns on mobile devices. */
    stackable: PropTypes.bool,

    /** A card group can adjust its text alignment. */
    textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')) as any,
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
    content: customPropTypes.contentShorthand,

    /** A card content can adjust its text alignment. */
    textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')) as any,
};

CardContent.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for CardDescription. */
    description: customPropTypes.itemShorthand,

    /** A card can contain extra content meant to be formatted separately from the main content. */
    extra: PropTypes.bool,

    /** Shorthand for CardHeader. */
    header: customPropTypes.itemShorthand,

    /** Shorthand for CardMeta. */
    meta: customPropTypes.itemShorthand,

    /** A card content can adjust its text alignment. */
    textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')) as any,
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
    color: PropTypes.oneOf(SUI.COLORS as any),

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for CardDescription. */
    description: customPropTypes.itemShorthand,

    /** Shorthand for primary content of CardContent. */
    extra: customPropTypes.contentShorthand,

    /** A Card can be formatted to take up the width of its container. */
    fluid: PropTypes.bool,

    /** Shorthand for CardHeader. */
    header: customPropTypes.itemShorthand,

    /** Render as an `a` tag instead of a `div` and adds the href attribute. */
    href: PropTypes.string,

    /** A card can contain an Image component. */
    image: customPropTypes.itemShorthand,

    /** A card can be formatted to link to other content. */
    link: PropTypes.bool,

    /** Shorthand for CardMeta. */
    meta: customPropTypes.itemShorthand,

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

export { };
