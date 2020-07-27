import PropTypes from 'prop-types';
// import _without from 'lodash/without';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Portal } from './Portal';
import { PortalInner } from './PortalInner';

PortalInner.propTypes = {
    /** Primary content. */
    children: PropTypes.node.isRequired,

    /** Called with a ref to the inner node. */
    innerRef: customPropTypes.ref as any,

    /** The node where the portal should mount. */
    mountNode: PropTypes.any,

    /**
     * Called when the portal is mounted on the DOM
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onMount: PropTypes.func,

    /**
     * Called when the portal is unmounted from the DOM
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onUnmount: PropTypes.func,
};

Portal.propTypes = {
    /** Primary content. */
    children: PropTypes.node.isRequired,

    /** Controls whether or not the portal should close when the document is clicked. */
    closeOnDocumentClick: PropTypes.bool,

    /** Controls whether or not the portal should close when escape is pressed is displayed. */
    closeOnEscape: PropTypes.bool,

    /**
     * Controls whether or not the portal should close when mousing out of the portal.
     * NOTE: This will prevent `closeOnTriggerMouseLeave` when mousing over the
     * gap from the trigger to the portal.
     */
    closeOnPortalMouseLeave: PropTypes.bool,

    /** Controls whether or not the portal should close on blur of the trigger. */
    closeOnTriggerBlur: PropTypes.bool,

    /** Controls whether or not the portal should close on click of the trigger. */
    closeOnTriggerClick: PropTypes.bool,

    /** Controls whether or not the portal should close when mousing out of the trigger. */
    closeOnTriggerMouseLeave: PropTypes.bool,

    /** Initial value of open. */
    defaultOpen: PropTypes.bool,

    /** Event pool namespace that is used to handle component events */
    eventPool: PropTypes.string,

    /** The node where the portal should mount. */
    mountNode: PropTypes.any,

    /** Milliseconds to wait before opening on mouse over */
    mouseEnterDelay: PropTypes.number,

    /** Milliseconds to wait before closing on mouse leave */
    mouseLeaveDelay: PropTypes.number,

    /**
     * Called when a close event happens
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
     * Called when an open event happens
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

    /** Controls whether or not the portal is displayed. */
    open: PropTypes.bool,

    /** Controls whether or not the portal should open when the trigger is clicked. */
    openOnTriggerClick: PropTypes.bool,

    /** Controls whether or not the portal should open on focus of the trigger. */
    openOnTriggerFocus: PropTypes.bool,

    /** Controls whether or not the portal should open when mousing over the trigger. */
    openOnTriggerMouseEnter: PropTypes.bool,

    /** Element to be rendered in-place where the portal is defined. */
    trigger: PropTypes.node,

    /** Called with a ref to the trigger node. */
    triggerRef: customPropTypes.ref,
};

export { };
