import PropTypes from 'prop-types';
// import _without from 'lodash/without';

// import * as SUI from '../../lib/SUI';
// import * as customPropTypes from '../../lib/customPropTypes';

import { Responsive } from './Responsive';

Responsive.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Fires callbacks immediately after mount. */
    fireOnMount: PropTypes.bool,

    /**
     * Called to get width of screen. Defaults to using `window.innerWidth` when in a browser;
     * otherwise, assumes a width of 0.
     */
    getWidth: PropTypes.func,

    /** The maximum width at which content will be displayed. */
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** The minimum width at which content will be displayed. */
    minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Called on update.
     *
     * @param {SyntheticEvent} event - The React SyntheticEvent object
     * @param {object} data - All props and the event value.
     */
    onUpdate: PropTypes.func,
};

export { };
