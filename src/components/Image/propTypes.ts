import PropTypes from 'prop-types';
// import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { ImageGroup } from './ImageGroup';
import { Image } from './Image';

Image.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

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
    floated: PropTypes.oneOf(SUI.FLOATS as any) as any,

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

    /** An image may appear at different SUI.SIZES. */
    size: PropTypes.oneOf(SUI.SIZES) as any,

    /** An image can specify that it needs an additional spacing to separate it from nearby content. */
    spaced: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]) as any,

    /** Whether or not to add the ui className. */
    ui: PropTypes.bool,

    /** An image can specify its vertical alignment. */
    verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS as any) as any,

    /** An image can render wrapped in a `div.ui.image` as alternative HTML markup. */
    wrapped: PropTypes.bool,
};

ImageGroup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A group of images can be formatted to have the same size. */
    size: PropTypes.oneOf(SUI.SIZES) as any,
};

export { };
