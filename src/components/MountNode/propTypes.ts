import PropTypes from 'prop-types';
// import _without from 'lodash/without';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { MountNode } from './MountNode';

MountNode.propTypes = {
    /** Additional classes. */
    className: PropTypes.string,

    /** The DOM node where we will apply class names. Defaults to document.body. */
    node: PropTypes.oneOfType([customPropTypes.domNode as any, customPropTypes.refObject]),
};

export { };
