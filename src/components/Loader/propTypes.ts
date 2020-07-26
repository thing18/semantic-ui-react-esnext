import PropTypes from 'prop-types';
// import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Loader } from './Loader';

Loader.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A loader can be active or visible. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A loader can be disabled or hidden. */
    disabled: PropTypes.bool,

    /** A loader can show it's unsure of how long a task will take. */
    indeterminate: PropTypes.bool,

    /** Loaders can appear inline with content. */
    inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['centered'])]) as any,

    /** Loaders can have their colors inverted. */
    inverted: PropTypes.bool,

    /** Loaders can have different sizes. */
    size: PropTypes.oneOf(SUI.SIZES) as any,
};

export { };
