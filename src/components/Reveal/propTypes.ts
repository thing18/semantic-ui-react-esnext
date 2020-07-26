import PropTypes from 'prop-types';
// import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Reveal } from './Reveal';
import { RevealContent } from './RevealContent';

RevealContent.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A reveal may contain content that is visible before interaction. */
    hidden: PropTypes.bool,

    /** A reveal may contain content that is hidden before user interaction. */
    visible: PropTypes.bool,
};

Reveal.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** An active reveal displays its hidden content. */
    active: PropTypes.bool,

    /** An animation name that will be applied to Reveal. */
    animated: PropTypes.oneOf([
        'fade',
        'small fade',
        'move',
        'move right',
        'move up',
        'move down',
        'rotate',
        'rotate left',
    ]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A disabled reveal will not animate when hovered. */
    disabled: PropTypes.bool,

    /** An element can show its content without delay. */
    instant: PropTypes.bool,
};

export { };
