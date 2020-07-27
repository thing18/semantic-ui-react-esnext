import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Statistic } from './Statistic';
import { StatisticGroup } from './StatisticGroup';
import { StatisticLabel } from './StatisticLabel';
import { StatisticValue } from './StatisticValue';

StatisticValue.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Format the value with smaller font size to fit nicely beside number values. */
    text: PropTypes.bool,
};

StatisticLabel.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

StatisticGroup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A statistic group can be formatted to be different colors. */
    color: PropTypes.oneOf(SUI.COLORS as any),

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A statistic group can present its measurement horizontally. */
    horizontal: PropTypes.bool,

    /** A statistic group can be formatted to fit on a dark background. */
    inverted: PropTypes.bool,

    /** Array of props for Statistic. */
    items: customPropTypes.collectionShorthand,

    /** A statistic group can vary in size. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'big', 'massive', 'medium')) as any,

    /** A statistic group can have its items divided evenly. */
    widths: PropTypes.oneOf(SUI.WIDTHS as any),
};

Statistic.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A statistic can be formatted to be different colors. */
    color: PropTypes.oneOf(SUI.COLORS as any),

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A statistic can sit to the left or right of other content. */
    floated: PropTypes.oneOf(SUI.FLOATS as any),

    /** A statistic can present its measurement horizontally. */
    horizontal: PropTypes.bool,

    /** A statistic can be formatted to fit on a dark background. */
    inverted: PropTypes.bool,

    /** Label content of the Statistic. */
    label: customPropTypes.contentShorthand,

    /** A statistic can vary in size. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'big', 'massive', 'medium')) as any,

    /** Format the StatisticValue with smaller font size to fit nicely beside number values. */
    text: PropTypes.bool,

    /** Value content of the Statistic. */
    value: customPropTypes.contentShorthand,
};

export { };
