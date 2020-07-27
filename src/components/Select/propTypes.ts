import PropTypes from 'prop-types';
import _without from 'lodash/without';

// import * as SUI from '../../lib/SUI';
// import * as customPropTypes from '../../lib/customPropTypes';

import { Select } from './Select';
import { DropdownItem } from '../Dropdown';

Select.propTypes = {
    /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
    options: PropTypes.arrayOf(PropTypes.shape(DropdownItem.propTypes!)).isRequired as any,
};

export { };
