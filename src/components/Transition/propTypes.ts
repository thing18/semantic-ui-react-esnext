import PropTypes from 'prop-types';
// import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
// import * as customPropTypes from '../../lib/customPropTypes';

import { Transition } from './Transition';
import { TransitionGroup } from './TransitionGroup';

TransitionGroup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Named animation event to used. Must be defined in CSS. */
    animation: PropTypes.oneOfType([PropTypes.oneOf(SUI.TRANSITIONS), PropTypes.string]),

    /** Primary content. */
    children: PropTypes.node,

    /** Whether it is directional animation event or not. Use it only for custom transitions. */
    directional: PropTypes.bool,

    /** Duration of the CSS transition animation in milliseconds. */
    duration: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            hide: PropTypes.number.isRequired,
            show: PropTypes.number.isRequired,
        }),
        PropTypes.string,
    ]),
};

Transition.propTypes = {
    /** Named animation event to used. Must be defined in CSS. */
    animation: PropTypes.oneOfType([PropTypes.oneOf(SUI.TRANSITIONS), PropTypes.string]),

    /** Primary content. */
    children: PropTypes.element.isRequired,

    /** Whether it is directional animation event or not. Use it only for custom transitions. */
    directional: PropTypes.bool,

    /** Duration of the CSS transition animation in milliseconds. */
    duration: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            hide: PropTypes.number,
            show: PropTypes.number,
        }),
        PropTypes.string,
    ]),

    /** Show the component; triggers the enter or exit animation. */
    visible: PropTypes.bool,

    /** Wait until the first "enter" transition to mount the component (add it to the DOM). */
    mountOnShow: PropTypes.bool,

    /**
     * Callback on each transition that changes visibility to shown.
     *
     * @param {null}
     * @param {object} data - All props with status.
     */
    onComplete: PropTypes.func,

    /**
     * Callback on each transition that changes visibility to hidden.
     *
     * @param {null}
     * @param {object} data - All props with status.
     */
    onHide: PropTypes.func,

    /**
     * Callback on each transition that changes visibility to shown.
     *
     * @param {null}
     * @param {object} data - All props with status.
     */
    onShow: PropTypes.func,

    /**
     * Callback on animation start.
     *
     * @param {null}
     * @param {object} data - All props with status.
     */
    onStart: PropTypes.func,

    /** React's key of the element. */
    reactKey: PropTypes.string,

    /** Run the enter animation when the component mounts, if it is initially shown. */
    transitionOnMount: PropTypes.bool,

    /** Unmount the component (remove it from the DOM) when it is not shown. */
    unmountOnHide: PropTypes.bool,
};

export { };
