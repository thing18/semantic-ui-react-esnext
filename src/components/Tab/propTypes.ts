import PropTypes from 'prop-types';
import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

// import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Tab } from './Tab';
import { TabPane } from './TabPane';

TabPane.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A tab pane can be active. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A Tab.Pane can display a loading indicator. */
    loading: PropTypes.bool,
};

Tab.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** The initial activeIndex. */
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Index of the currently active tab. */
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Shorthand props for the Menu.
     * tabular, if true, will derive final value from `menuPosition`, otherwise set 'left' or 'right' explicitly.
     */
    menu: PropTypes.object,

    /** Align vertical menu */
    menuPosition: PropTypes.oneOf(['left', 'right']),

    /** Shorthand props for the Grid. */
    grid: PropTypes.object,

    /**
     * Called on tab change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed new activeIndex.
     * @param {object} data.activeIndex - The new proposed activeIndex.
     */
    onTabChange: PropTypes.func,

    /**
     * Array of objects describing each Menu.Item and Tab.Pane:
     * { menuItem: 'Home', render: () => <Tab.Pane /> }
     * or
     * { menuItem: 'Home', pane: 'Welcome' }
     */
    panes: PropTypes.arrayOf(
        PropTypes.shape({
            menuItem: customPropTypes.itemShorthand,
            pane: customPropTypes.itemShorthand,
            render: PropTypes.func,
        }) as any,
    ),

    /** A Tab can render only active pane. */
    renderActiveOnly: PropTypes.bool,
};

export { };
