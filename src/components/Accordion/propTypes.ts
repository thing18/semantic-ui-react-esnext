import PropTypes from 'prop-types';
// import _without from 'lodash/without';
// import _uniq from 'lodash/uniq';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Accordion } from './Accordion';
import { AccordionAccordion } from './AccordionAccordion';
import { AccordionContent } from './AccordionContent';
import { AccordionPanel } from './AccordionPanel';
import { AccordionTitle } from './AccordionTitle';

AccordionTitle.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Whether or not the title is in the open state. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for Icon. */
    icon: customPropTypes.itemShorthand,

    /** AccordionTitle index inside Accordion. */
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,
};

AccordionPanel.propTypes = {
    /** Whether or not the title is in the open state. */
    active: PropTypes.bool,

    /** A shorthand for Accordion.Content. */
    content: customPropTypes.itemShorthand,

    /** A panel index. */
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Called when a panel title is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All item props.
     */
    onTitleClick: PropTypes.func,

    /** A shorthand for Accordion.Title. */
    title: customPropTypes.itemShorthand,
};

AccordionContent.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Whether or not the content is visible. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

AccordionAccordion.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Index of the currently active panel. */
    activeIndex: customPropTypes.every([
        customPropTypes.disallow(['children']),
        PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial activeIndex value. */
    defaultActiveIndex: customPropTypes.every([
        customPropTypes.disallow(['children']),
        PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),

    /** Only allow one panel open at a time. */
    exclusive: PropTypes.bool,

    /**
     * Called when a panel title is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All item props.
     */
    onTitleClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

    /** Shorthand array of props for Accordion. */
    panels: customPropTypes.every([
        customPropTypes.disallow(['children']),
        PropTypes.arrayOf(
            PropTypes.shape({
                content: customPropTypes.itemShorthand,
                title: customPropTypes.itemShorthand,
            }),
        ),
    ]),
};

Accordion.propTypes = {
    /** Additional classes. */
    className: PropTypes.string,

    /** Format to take up the width of its container. */
    fluid: PropTypes.bool,

    /** Format for dark backgrounds. */
    inverted: PropTypes.bool,

    /** Adds some basic styling to accordion panels. */
    styled: PropTypes.bool,
};

export { };
