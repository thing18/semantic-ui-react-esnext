import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Progress } from './Progress';

Progress.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType as any,

    /** A progress bar can show activity. */
    active: PropTypes.bool,

    /** A progress bar can attach to and show the progress of an element (i.e. Card or Segment). */
    attached: PropTypes.oneOf(['top', 'bottom']),

    /** Whether success state should automatically trigger when progress completes. */
    autoSuccess: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A progress bar can have different colors. */
    color: PropTypes.oneOf(SUI.COLORS as any),

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A progress bar be disabled. */
    disabled: PropTypes.bool,

    /** A progress bar can show a error state. */
    error: PropTypes.bool,

    /** An indicating progress bar visually indicates the current level of progress of a task. */
    indicating: PropTypes.bool,

    /** A progress bar can have its colors inverted. */
    inverted: PropTypes.bool,

    /** Can be set to either to display progress as percent or ratio. */
    label: customPropTypes.itemShorthand,

    /** Current percent complete. */
    percent: customPropTypes.every([
        customPropTypes.disallow(['total', 'value']),
        PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ]),

    /** Decimal point precision for calculated progress. */
    precision: PropTypes.number,

    /** A progress bar can contain a text value indicating current progress. */
    progress: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['percent', 'ratio', 'value'])]) as any,

    /** A progress bar can vary in size. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'mini', 'huge', 'massive')) as any,

    /** A progress bar can show a success state. */
    success: PropTypes.bool,

    /** For use with value. Together, these will calculate the percent. Mutually excludes percent. */
    total: customPropTypes.every([
        customPropTypes.demand(['value']),
        customPropTypes.disallow(['percent']),
        PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ]),

    /** For use with total. Together, these will calculate the percent. Mutually excludes percent. */
    value: customPropTypes.every([
        customPropTypes.disallow(['percent']),
        PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ]),

    /** A progress bar can show a warning state. */
    warning: PropTypes.bool,
};

export { };
