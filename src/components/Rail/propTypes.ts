import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Rail } from './Rail';

Rail.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A rail can appear attached to the main viewport. */
    attached: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A rail can appear closer to the main viewport. */
    close: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]) as any,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A rail can create a division between itself and a container. */
    dividing: PropTypes.bool,

    /** A rail can attach itself to the inside of a container. */
    internal: PropTypes.bool,

    /** A rail can be presented on the left or right side of a container. */
    position: PropTypes.oneOf(SUI.FLOATS as any).isRequired as any,

    /** A rail can have different sizes. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')) as any,
};

export { };
