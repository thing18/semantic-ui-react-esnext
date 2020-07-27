import PropTypes from 'prop-types';
// import _without from 'lodash/without';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Embed } from './Embed';

Embed.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** An embed can be active. */
    active: PropTypes.bool,

    /** An embed can specify an alternative aspect ratio. */
    aspectRatio: PropTypes.oneOf(['4:3', '16:9', '21:9']),

    /** Setting to true or false will force autoplay. */
    autoplay: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),

    /** Whether to show networks branded UI like title cards, or after video calls to action. */
    brandedUI: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Specifies a default chrome color with Vimeo or YouTube. */
    color: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.string]),

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Initial value of active. */
    defaultActive: PropTypes.bool,

    /** Whether to prefer HD content. */
    hd: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),

    /** Specifies an icon to use with placeholder content. */
    icon: customPropTypes.itemShorthand,

    /** Specifies an id for source. */
    id: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.string]),

    /** Shorthand for HTML iframe. */
    iframe: customPropTypes.every([
        customPropTypes.demand(['source']),
        customPropTypes.itemShorthand,
    ]),

    /**
     * Сalled on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onClick: PropTypes.func,

    /** A placeholder image for embed. */
    placeholder: PropTypes.string,

    /** Specifies a source to use. */
    source: customPropTypes.every([
        customPropTypes.disallow(['sourceUrl']),
        PropTypes.oneOf(['youtube', 'vimeo']),
    ]),

    /** Specifies a url to use for embed. */
    url: customPropTypes.every([customPropTypes.disallow(['source']), PropTypes.string]),
};

export { };
