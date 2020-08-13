import PropTypes from 'prop-types';
import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Container } from './Container';

Container.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Container has no maximum width. */
    fluid: PropTypes.bool,

    /** Reduce maximum width to more naturally accommodate text. */
    text: PropTypes.bool,

    /** Align container text. */
    textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS) as any,
};

export { };
