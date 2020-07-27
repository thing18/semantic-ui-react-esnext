import PropTypes from 'prop-types';
// import _without from 'lodash/without';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Sticky } from './Sticky';

Sticky.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A Sticky can be active. */
    active: PropTypes.bool,

    /** Offset in pixels from the bottom of the screen when fixing element to viewport. */
    bottomOffset: PropTypes.number,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Context which sticky element should stick to. */
    context: PropTypes.oneOfType([customPropTypes.domNode as any, customPropTypes.refObject]),

    /** Offset in pixels from the top of the screen when fixing element to viewport. */
    offset: PropTypes.number,

    /**
     * Callback when element is bound to bottom of parent container.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onBottom: PropTypes.func,

    /**
     * Callback when element is fixed to page.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onStick: PropTypes.func,

    /**
     * Callback when element is bound to top of parent container.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onTop: PropTypes.func,

    /**
     * Callback when element is unfixed from page.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onUnstick: PropTypes.func,

    /** Whether element should be "pushed" by the viewport, attaching to the bottom of the screen when scrolling up. */
    pushing: PropTypes.bool,

    /** Context which sticky should attach onscroll events. */
    scrollContext: PropTypes.oneOfType([customPropTypes.domNode as any, customPropTypes.refObject]) as any,

    /** Custom style for sticky element. */
    styleElement: PropTypes.object,
};

export { };
