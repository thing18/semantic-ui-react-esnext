import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { BreadcrumbSection } from './BreadcrumbSection';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import { Breadcrumb } from './Breadcrumb';

BreadcrumbSection.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Style as the currently active section. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Render as an `a` tag instead of a `div` and adds the href attribute. */
    href: customPropTypes.every([customPropTypes.disallow(['link']), PropTypes.string]),

    /** Render as an `a` tag instead of a `div`. */
    link: customPropTypes.every([customPropTypes.disallow(['href']), PropTypes.bool]),

    /**
     * Called on click. When passed, the component will render as an `a`
     * tag by default instead of a `div`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,
};

BreadcrumbDivider.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Render as an `Icon` component with `divider` class instead of a `div`. */
    icon: customPropTypes.itemShorthand,
};

Breadcrumb.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content of the Breadcrumb.Divider. */
    divider: customPropTypes.every([
        customPropTypes.disallow(['icon']),
        customPropTypes.contentShorthand,
    ]),

    /** For use with the sections prop. Render as an `Icon` component with `divider` class instead of a `div` in
     *  Breadcrumb.Divider. */
    icon: customPropTypes.every([
        customPropTypes.disallow(['divider']),
        customPropTypes.itemShorthand,
    ]),

    /** Shorthand array of props for Breadcrumb.Section. */
    sections: customPropTypes.collectionShorthand,

    /** Size of Breadcrumb. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')) as any,
};

export { };
