import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Label } from './Label';
import { LabelDetail } from './LabelDetail';
import { LabelGroup } from './LabelGroup';

Label.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

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
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

LabelGroup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

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

export { };
