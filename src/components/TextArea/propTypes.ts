import PropTypes from 'prop-types';
// import * as SUI from '../../lib/SUI';
// import * as customPropTypes from '../../lib/customPropTypes';

import { TextArea } from './TextArea';

TextArea.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /**
     * Called on change.
     * @param {SyntheticEvent} event - The React SyntheticEvent object
     * @param {object} data - All props and the event value.
     */
    onChange: PropTypes.func,

    /**
     * Called on input.
     * @param {SyntheticEvent} event - The React SyntheticEvent object
     * @param {object} data - All props and the event value.
     */
    onInput: PropTypes.func,

    /** Indicates row count for a TextArea. */
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** The value of the textarea. */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export { };
