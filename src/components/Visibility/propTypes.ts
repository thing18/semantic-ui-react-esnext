import PropTypes from 'prop-types';
// import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

// import * as SUI from '../../lib/SUI';
// import * as customPropTypes from '../../lib/customPropTypes';

import { Visibility } from './Visibility';

Visibility.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Context which visibility should attach onscroll events. */
    context: PropTypes.object,

    /**
     * When set to true a callback will occur anytime an element passes a condition not just immediately after the
     * threshold is met.
     */
    continuous: PropTypes.bool,

    /** Fires callbacks immediately after mount. */
    fireOnMount: PropTypes.bool,

    /**
     * Element's bottom edge has passed top of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onBottomPassed: PropTypes.func,

    /**
     * Element's bottom edge has not passed top of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onBottomPassedReverse: PropTypes.func,

    /**
     * Element's bottom edge has passed bottom of screen
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onBottomVisible: PropTypes.func,

    /**
     * Element's bottom edge has not passed bottom of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onBottomVisibleReverse: PropTypes.func,

    /**
     * Value that context should be adjusted in pixels. Useful for making content appear below content fixed to the
     * page.
     */
    offset: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    ]),

    /** When set to false a callback will occur each time an element passes the threshold for a condition. */
    once: PropTypes.bool,

    /** Element is not visible on the screen. */
    onPassed: PropTypes.object,

    /**
     * Any part of an element is visible on screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onPassing: PropTypes.func,

    /**
     * Element's top has not passed top of screen but bottom has.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onPassingReverse: PropTypes.func,

    /**
     * Element is not visible on the screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onOffScreen: PropTypes.func,

    /**
     * Element is visible on the screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onOnScreen: PropTypes.func,

    /**
     * Element's top edge has passed top of the screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onTopPassed: PropTypes.func,

    /**
     * Element's top edge has not passed top of the screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onTopPassedReverse: PropTypes.func,

    /**
     * Element's top edge has passed bottom of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onTopVisible: PropTypes.func,

    /**
     * Element's top edge has not passed bottom of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onTopVisibleReverse: PropTypes.func,

    /**
     * Element's top edge has passed bottom of screen.
     *
     * @param {null}
     * @param {object} data - All props.
     */
    onUpdate: PropTypes.func,

    /**
     * Allows to choose the mode of the position calculations:
     * - `events` - (default) update and fire callbacks only on scroll/resize events
     * - `repaint` - update and fire callbacks on browser repaint (animation frames)
     */
    updateOn: PropTypes.oneOf(['events', 'repaint']),
};

export { };
