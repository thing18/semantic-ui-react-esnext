import PropTypes from 'prop-types';
// import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

// import * as SUI from '../../lib/SUI';
// import * as customPropTypes from '../../lib/customPropTypes';

import { TransitionablePortal } from './TransitionablePortal';

TransitionablePortal.propTypes = {
    /** Primary content. */
    children: PropTypes.node.isRequired,

    /**
     * Called when a close event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and internal state.
     */
    onClose: PropTypes.func,

    /**
     * Callback on each transition that changes visibility to hidden.
     *
     * @param {null}
     * @param {object} data - All props with transition status and internal state.
     */
    onHide: PropTypes.func,

    /**
     * Called when an open event happens.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and internal state.
     */
    onOpen: PropTypes.func,

    /**
     * Callback on animation start.
     *
     * @param {null}
     * @param {object} data - All props with transition status and internal state.
     */
    onStart: PropTypes.func,

    /** Controls whether or not the portal is displayed. */
    open: PropTypes.bool,

    /** Transition props. */
    transition: PropTypes.object,
};

export { };
