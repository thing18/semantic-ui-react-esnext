import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { positions } from './lib/positions';
import { PopupHeader } from './PopupHeader';
import { PopupContent } from './PopupContent';
import { Popup } from './Popup';

PopupHeader.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

PopupContent.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** The content of the Popup */
    children: PropTypes.node,

    /** Classes to add to the Popup content className. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

Popup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Display the popup without the pointing arrow. */
    basic: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Simple text content for the popover. */
    content: customPropTypes.itemShorthand,

    /** Existing element the pop-up should be bound to. */
    context: PropTypes.oneOfType([PropTypes.object, customPropTypes.refObject]),

    /** A disabled popup only renders its trigger. */
    disabled: PropTypes.bool,

    /** A flowing Popup has no maximum width and continues to flow to fit its content. */
    flowing: PropTypes.bool,

    /** Takes up the entire width of its offset container. */
    // TODO: implement the Popup fluid layout
    // fluid: PropTypes.bool,

    /** Header displayed above the content in bold. */
    header: customPropTypes.itemShorthand,

    /** Hide the Popup when scrolling the window. */
    hideOnScroll: PropTypes.bool,

    /** Whether the popup should not close on hover. */
    hoverable: PropTypes.bool,

    /** Invert the colors of the Popup. */
    inverted: PropTypes.bool,

    /** Offset values in px unit to apply to rendered popup. The basic offset accepts an
     * array with two numbers in the form [skidding, distance].
     *
     * The first number, skidding, displaces the popper along the reference element.
     *
     * The second number, distance, displaces the popper away from, or toward, the
     * reference element in the direction of its placement. A positive number displaces
     * it further away, while a negative number lets it overlap the reference.
     */
    offset: PropTypes.arrayOf(PropTypes.number),

    /** Events triggering the popup. */
    on: PropTypes.oneOfType([
        PropTypes.oneOf(['hover', 'click', 'focus']),
        PropTypes.arrayOf(PropTypes.oneOf(['hover', 'click', 'focus'])),
    ]),

    /**
     * Called when a close event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClose: PropTypes.func,

    /**
     * Called when the portal is mounted on the DOM.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onMount: PropTypes.func,

    /**
     * Called when an open event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onOpen: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onUnmount: PropTypes.func,

    /** Disables automatic repositioning of the component, it will always be placed according to the position value. */
    pinned: PropTypes.bool,

    /** Position for the popover. */
    position: PropTypes.oneOf(positions),

    /** Tells `Popper.js` to use the `position: fixed` strategy to position the popover. */
    positionFixed: PropTypes.bool,

    /** An object containing custom settings for the Popper.js modifiers. */
    popperModifiers: PropTypes.array,

    /** A popup can have dependencies which update will schedule a position update. */
    popperDependencies: PropTypes.array,

    /** Popup size. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium', 'big', 'massive')),

    /** Custom Popup style. */
    style: PropTypes.object,

    /** Element to be rendered in-place where the popup is defined. */
    trigger: PropTypes.node,

    /** Popup width. */
    wide: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),
};

export { };
