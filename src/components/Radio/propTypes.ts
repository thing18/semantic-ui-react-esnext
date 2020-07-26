// import PropTypes from 'prop-types';
import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

// import * as SUI from '../../lib/SUI';
// import * as customPropTypes from '../../lib/customPropTypes';

import { Radio } from './Radio';
import { Checkbox } from '../Checkbox';

Radio.propTypes = {
    /** Format to emphasize the current selection state. */
    slider: Checkbox.propTypes!.slider,

    /** Format to show an on or off choice. */
    toggle: Checkbox.propTypes!.toggle,

    /** HTML input type, either checkbox or radio. */
    type: Checkbox.propTypes!.type,
};

export { };
