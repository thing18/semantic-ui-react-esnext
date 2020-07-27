import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';
import { numberToWordMap } from '../../lib';

import { Step } from './Step';
import { StepContent } from './StepContent';
import { StepDescription } from './StepDescription';
import { StepGroup } from './StepGroup';
import { StepTitle } from './StepTitle';

StepTitle.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

const numberMap = Object.entries(numberToWordMap).reduce((a, [k, v]) => { if (+k <= 8) a[k] = v; return a; }, {} as any);

StepGroup.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Steps can be attached to other elements. */
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]) as any,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A fluid step takes up the width of its container. */
    fluid: PropTypes.bool,

    /** Shorthand array of props for Step. */
    items: customPropTypes.collectionShorthand,

    /** A step can show a ordered sequence of steps. */
    ordered: PropTypes.bool,

    /** Steps can have different sizes. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')) as any,

    /** A step can stack vertically only on smaller screens. */
    stackable: PropTypes.oneOf(['tablet']),

    /** A step can prevent itself from stacking on mobile. */
    unstackable: PropTypes.bool,

    /** A step can be displayed stacked vertically. */
    vertical: PropTypes.bool,

    /** Steps can be divided evenly inside their parent. */
    widths: PropTypes.oneOf([
        ...Object.keys(numberMap),
        ...Object.keys(numberMap).map(Number),
        ...Object.values(numberMap),
    ]) as any,
};

StepDescription.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

StepContent.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for StepDescription. */
    description: customPropTypes.itemShorthand,

    /** Shorthand for StepTitle. */
    title: customPropTypes.itemShorthand,
};

Step.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A step can be highlighted as active. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A step can show that a user has completed it. */
    completed: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Shorthand for StepDescription. */
    description: customPropTypes.itemShorthand,

    /** Show that the Loader is inactive. */
    disabled: PropTypes.bool,

    /** Render as an `a` tag instead of a `div` and adds the href attribute. */
    href: PropTypes.string,

    /** Shorthand for Icon. */
    icon: customPropTypes.itemShorthand,

    /** A step can be link. */
    link: PropTypes.bool,

    /**
     * Called on click. When passed, the component will render as an `a`
     * tag by default instead of a `div`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A step can show a ordered sequence of steps. Passed from StepGroup. */
    ordered: PropTypes.bool,

    /** Shorthand for StepTitle. */
    title: customPropTypes.itemShorthand,
};

export { };
