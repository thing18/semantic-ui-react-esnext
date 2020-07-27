import PropTypes from 'prop-types';
// import _without from 'lodash/without';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Confirm } from './Confirm';

Confirm.propTypes = {
    /** The cancel button text. */
    cancelButton: customPropTypes.itemShorthand,

    /** The OK button text. */
    confirmButton: customPropTypes.itemShorthand,

    /** The ModalContent text. */
    content: customPropTypes.itemShorthand,

    /** The ModalHeader text. */
    header: customPropTypes.itemShorthand,

    /**
     * Called when the Modal is closed without clicking confirm.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onCancel: PropTypes.func,

    /**
     * Called when the OK button is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onConfirm: PropTypes.func,

    /** Whether or not the modal is visible. */
    open: PropTypes.bool,

    /** A Confirm can vary in size */
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),
};

export { };
