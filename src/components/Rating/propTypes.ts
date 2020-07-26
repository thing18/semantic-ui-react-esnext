import PropTypes from 'prop-types';
// import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
// import * as customPropTypes from '../../lib/customPropTypes';

import { Rating } from './Rating';
import { RatingIcon } from './RatingIcon';

RatingIcon.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Indicates activity of an icon. */
    active: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** An index of icon inside Rating. */
    index: PropTypes.number,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Called on keyup.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onKeyUp: PropTypes.func,

    /**
     * Called on mouseenter.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onMouseEnter: PropTypes.func,

    /** Indicates selection of an icon. */
    selected: PropTypes.bool,
};

Rating.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Additional classes. */
    className: PropTypes.string,

    /**
     * You can clear the rating by clicking on the current start rating.
     * By default a rating will be only clearable if there is 1 icon.
     * Setting to `true`/`false` will allow or disallow a user to clear their rating.
     */
    clearable: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['auto'])]) as any,

    /** The initial rating value. */
    defaultRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

    /** You can disable or enable interactive rating.  Makes a read-only rating. */
    disabled: PropTypes.bool,

    /** A rating can use a set of star or heart icons. */
    icon: PropTypes.oneOf(['star', 'heart']),

    /** The total number of icons. */
    maxRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

    /**
     * Called after user selects a new rating.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed rating.
     */
    onRate: PropTypes.func,

    /** The current number of active icons. */
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) as any,

    /** A progress bar can vary in size. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium', 'big')) as any,
};

export { };
