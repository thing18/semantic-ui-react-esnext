import PropTypes from 'prop-types';
import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Button } from './Button';
import { ButtonContent } from './ButtonContent';
import { ButtonGroup } from './ButtonGroup';
import { ButtonOr } from './ButtonOr';

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
    color: PropTypes.oneOf(SUI.COLORS as any) as any,

    /** Groups can reduce their padding to fit into tighter spaces. */
    compact: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Groups can be aligned to the left or right of its container. */
    floated: PropTypes.oneOf(SUI.FLOATS as any) as any,

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
    ]) as any,

    /** A button can be formatted to appear on dark backgrounds. */
    inverted: PropTypes.bool,

    /** Add a Label by text, props object, or pass a <Label />. */
    label: customPropTypes.some([PropTypes.string, PropTypes.object, PropTypes.element]) as any,

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

export { };
