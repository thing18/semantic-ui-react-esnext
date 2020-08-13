import PropTypes from 'prop-types';
// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Dimmer } from './Dimmer';
import { DimmerDimmable } from './DimmerDimmable';
import { DimmerInner } from './DimmerInner';

DimmerInner.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** An active dimmer will dim its parent container. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A disabled dimmer cannot be activated */
    disabled: PropTypes.bool,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Handles click outside Dimmer's content, but inside Dimmer area.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClickOutside: PropTypes.func,

    /** A dimmer can be formatted to have its colors inverted. */
    inverted: PropTypes.bool,

    /** A dimmer can be formatted to be fixed to the page. */
    page: PropTypes.bool,

    /** A dimmer can be controlled with simple prop. */
    simple: PropTypes.bool,

    /** A dimmer can have its content top or bottom aligned. */
    verticalAlign: PropTypes.oneOf(['bottom', 'top']),
};

DimmerDimmable.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** A dimmable element can blur its contents. */
    blurring: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Controls whether or not the dim is displayed. */
    dimmed: PropTypes.bool,
};

Dimmer.propTypes = {
    /** An active dimmer will dim its parent container. */
    active: PropTypes.bool,

    /** A dimmer can be formatted to be fixed to the page. */
    page: PropTypes.bool,
};

export { };
