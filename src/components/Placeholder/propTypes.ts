import PropTypes from 'prop-types';
// import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Placeholder } from './Placeholder';
import { PlaceholderHeader } from './PlaceholderHeader';
import { PlaceholderImage } from './PlaceholderImage';
import { PlaceholderLine } from './PlaceholderLine';
import { PlaceholderParagraph } from './PlaceholderParagraph';

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

export { };
