import PropTypes from 'prop-types';
// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Input } from './Input';

Input.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** An Input can be formatted to alert the user to an action they may perform. */
    action: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

    /** An action can appear along side an Input on the left or right. */
    actionPosition: PropTypes.oneOf(['left']),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** An Input field can show that it is disabled. */
    disabled: PropTypes.bool,

    /** An Input field can show the data contains errors. */
    error: PropTypes.bool,

    /** Take on the size of its container. */
    fluid: PropTypes.bool,

    /** An Input field can show a user is currently interacting with it. */
    focus: PropTypes.bool,

    /** Optional Icon to display inside the Input. */
    icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

    /** An Icon can appear inside an Input on the left or right. */
    iconPosition: PropTypes.oneOf(['left']),

    /** Shorthand for creating the HTML Input. */
    input: customPropTypes.itemShorthand,

    /** Format to appear on dark backgrounds. */
    inverted: PropTypes.bool,

    /** Optional Label to display along side the Input. */
    label: customPropTypes.itemShorthand,

    /** A Label can appear outside an Input on the left or right. */
    labelPosition: PropTypes.oneOf(['left', 'right', 'left corner', 'right corner']),

    /** An Icon Input field can show that it is currently loading data. */
    loading: PropTypes.bool,

    /**
     * Called on change.
     *
     * @param {ChangeEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and a proposed value.
     */
    onChange: PropTypes.func,

    /** An Input can vary in size. */
    size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),

    /** An Input can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Transparent Input has no background. */
    transparent: PropTypes.bool,

    /** The HTML input type. */
    type: PropTypes.string,
};

export { };
