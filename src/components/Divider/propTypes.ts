import PropTypes from 'prop-types';
// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Divider } from './Divider';

Divider.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Divider can clear the content above it. */
    clearing: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Divider can be fitted without any space above or below it. */
    fitted: PropTypes.bool,

    /** Divider can divide content without creating a dividing line. */
    hidden: PropTypes.bool,

    /** Divider can segment content horizontally. */
    horizontal: PropTypes.bool,

    /** Divider can have its colours inverted. */
    inverted: PropTypes.bool,

    /** Divider can provide greater margins to divide sections of content. */
    section: PropTypes.bool,

    /** Divider can segment content vertically. */
    vertical: PropTypes.bool,
};
