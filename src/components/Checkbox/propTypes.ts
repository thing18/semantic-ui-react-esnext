import PropTypes from 'prop-types';
import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Checkbox } from './Checkbox';

Checkbox.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Whether or not checkbox is checked. */
    checked: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** The initial value of checked. */
    defaultChecked: PropTypes.bool,

    /** Whether or not checkbox is indeterminate. */
    defaultIndeterminate: PropTypes.bool,

    /** A checkbox can appear disabled and be unable to change states */
    disabled: PropTypes.bool,

    /** Removes padding for a label. Auto applied when there is no label. */
    fitted: PropTypes.bool,

    /** A unique identifier. */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

    /** Whether or not checkbox is indeterminate. */
    indeterminate: PropTypes.bool,

    /** The text of the associated label element. */
    label: customPropTypes.itemShorthand,

    /** The HTML input name. */
    name: PropTypes.string,

    /**
     * Called when the user attempts to change the checked state.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed checked/indeterminate state.
     */
    onChange: PropTypes.func,

    /**
     * Called when the checkbox or label is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and current checked/indeterminate state.
     */
    onClick: PropTypes.func,

    /**
     * Called when the user presses down on the mouse.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and current checked/indeterminate state.
     */
    onMouseDown: PropTypes.func,

    /**
     * Called when the user releases the mouse.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and current checked/indeterminate state.
     */
    onMouseUp: PropTypes.func,

    /** Format as a radio element. This means it is an exclusive option. */
    radio: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['slider', 'toggle'])]),

    /** A checkbox can be read-only and unable to change states. */
    readOnly: PropTypes.bool,

    /** Format to emphasize the current selection state. */
    slider: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['radio', 'toggle'])]),

    /** A checkbox can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

    /** Format to show an on or off choice. */
    toggle: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['radio', 'slider'])]),

    /** HTML input type, either checkbox or radio. */
    type: PropTypes.oneOf(['checkbox', 'radio']),

    /** The HTML input value. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export { };
