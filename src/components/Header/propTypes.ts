import PropTypes from 'prop-types';
import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { HeaderSubheader } from './HeaderSubheader';
import { HeaderContent } from './HeaderContent';
import { Header } from './Header';

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
    color: PropTypes.oneOf(SUI.COLORS as any) as any,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Show that the header is inactive. */
    disabled: PropTypes.bool,

    /** Divide header from the content below it. */
    dividing: PropTypes.bool,

    /** Header can sit to the left or right of other content. */
    floated: PropTypes.oneOf(SUI.FLOATS as any) as any,

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
    size: PropTypes.oneOf(_without(SUI.SIZES, 'big', 'massive', 'mini')) as any,

    /** Headers may be formatted to label smaller or de-emphasized content. */
    sub: PropTypes.bool,

    /** Shorthand for Header.Subheader. */
    subheader: customPropTypes.itemShorthand,

    /** Align header content. */
    textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS as any) as any,
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

export { };
