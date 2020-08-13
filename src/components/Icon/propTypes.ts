import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { IconGroup } from './IconGroup';
import { Icon } from './Icon';

Icon.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Formatted to appear bordered. */
    bordered: PropTypes.bool,

    /** Icon can formatted to appear circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Color of the icon. */
    color: PropTypes.oneOf(SUI.COLORS as any) as any,

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

    /** Formatted to have its SUI.COLORS inverted for contrast. */
    inverted: PropTypes.bool,

    /** Icon can be formatted as a link. */
    link: PropTypes.bool,

    /** Icon can be used as a simple loader. */
    loading: PropTypes.bool,

    /** Name of the icon. */
    name: customPropTypes.suggest(SUI.ALL_ICONS_IN_ALL_CONTEXTS) as any,

    /** Icon can rotated. */
    rotated: PropTypes.oneOf(['clockwise', 'counterclockwise']),

    /** Size of the icon. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')) as any,

    /** Icon can have an aria label. */
    'aria-hidden': PropTypes.string,

    /** Icon can have an aria label. */
    'aria-label': PropTypes.string,
};

IconGroup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Size of the icon group. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')) as any,
};

export { };
