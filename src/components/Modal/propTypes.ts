import PropTypes from 'prop-types';
// import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalDescription } from './ModalDescription';
import { ModalContent } from './ModalContent';
import { ModalActions } from './ModalActions';

ModalHeader.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

ModalDescription.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

ModalContent.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A modal can contain image content. */
    image: PropTypes.bool,

    /** A modal can use the entire size of the screen. */
    scrolling: PropTypes.bool,
};

ModalActions.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Array of shorthand buttons. */
    actions: customPropTypes.collectionShorthand,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /**
     * Action onClick handler when using shorthand `actions`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props from the clicked action.
     */
    onActionClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),
};

Modal.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Shorthand for Modal.Actions. Typically an array of button shorthand. */
    actions: customPropTypes.itemShorthand,

    /** A modal can reduce its complexity */
    basic: PropTypes.bool,

    /** A modal can be vertically centered in the viewport */
    centered: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for the close icon. Closes the modal on click. */
    closeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.bool]),

    /** Whether or not the Modal should close when the dimmer is clicked. */
    closeOnDimmerClick: PropTypes.bool,

    /** Whether or not the Modal should close when the document is clicked. */
    closeOnDocumentClick: PropTypes.bool,

    /** Simple text content for the Modal. */
    content: customPropTypes.itemShorthand,

    /** Initial value of open. */
    defaultOpen: PropTypes.bool,

    /** A Modal can appear in a dimmer. */
    dimmer: PropTypes.oneOf([true, 'inverted', 'blurring']),

    /** Event pool namespace that is used to handle component events */
    eventPool: PropTypes.string,

    /** Modal displayed above the content in bold. */
    header: customPropTypes.itemShorthand,

    /** The node where the modal should mount. Defaults to document.body. */
    mountNode: PropTypes.any,

    /**
     * Action onClick handler when using shorthand `actions`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onActionClick: PropTypes.func,

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

    /** Controls whether or not the Modal is displayed. */
    open: PropTypes.bool,

    /** A modal can vary in size */
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),

    /** Custom styles. */
    style: PropTypes.object,

    /** Element to be rendered in-place where the portal is defined. */
    trigger: PropTypes.node,

    /**
     * NOTE: Any unhandled props that are defined in Portal are passed-through
     * to the wrapping Portal.
     */
};

export { };
