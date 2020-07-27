import PropTypes from 'prop-types';
import _without from 'lodash/without';

import * as SUI from '../../lib/SUI';
import * as customPropTypes from '../../lib/customPropTypes';

import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import { MenuHeader } from './MenuHeader';
import { MenuMenu } from './MenuMenu';

MenuMenu.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A sub menu can take left or right position. */
    position: PropTypes.oneOf(['left', 'right']),
};

MenuHeader.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,
};

MenuItem.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** A menu item can be active. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Additional colors can be specified. */
    color: PropTypes.oneOf(SUI.COLORS as any),

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A menu item can be disabled. */
    disabled: PropTypes.bool,

    /** A menu item or menu can remove element padding, vertically or horizontally. */
    fitted: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['horizontally', 'vertically'])]) as any,

    /** A menu item may include a header or may itself be a header. */
    header: PropTypes.bool,

    /** MenuItem can be only icon. */
    icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]) as any,

    /** MenuItem index inside Menu. */
    index: PropTypes.number,

    /** A menu item can be link. */
    link: PropTypes.bool,

    /** Internal name of the MenuItem. */
    name: PropTypes.string,

    /**
     * Called on click. When passed, the component will render as an `a`
     * tag by default instead of a `div`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A menu item can take left or right position. */
    position: PropTypes.oneOf(['left', 'right']),
};

Menu.propTypes = {
    /** An element type to render as (string or function). */
    as: PropTypes.elementType,

    /** Index of the currently active item. */
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** A menu may be attached to other content segments. */
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]) as any,

    /** A menu item or menu can have no borders. */
    borderless: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Additional colors can be specified. */
    color: PropTypes.oneOf(SUI.COLORS as any),

    /** A menu can take up only the space necessary to fit its content. */
    compact: PropTypes.bool,

    /** Initial activeIndex value. */
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** A menu can be fixed to a side of its context. */
    fixed: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),

    /** A menu can be floated. */
    floated: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]) as any,

    /** A vertical menu may take the size of its container. */
    fluid: PropTypes.bool,

    /** A menu may have just icons (bool) or labeled icons. */
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['labeled'])]) as any,

    /** A menu may have its colors inverted to show greater contrast. */
    inverted: PropTypes.bool,

    /** Shorthand array of props for Menu. */
    items: customPropTypes.collectionShorthand,

    /**
     * onClick handler for MenuItem. Mutually exclusive with children.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All item props.
     */
    onItemClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

    /** A pagination menu is specially formatted to present links to pages of content. */
    pagination: PropTypes.bool,

    /** A menu can point to show its relationship to nearby content. */
    pointing: PropTypes.bool,

    /** A menu can adjust its appearance to de-emphasize its contents. */
    secondary: PropTypes.bool,

    /** A menu can vary in size. */
    size: PropTypes.oneOf(_without(SUI.SIZES, 'medium', 'big')) as any,

    /** A menu can stack at mobile resolutions. */
    stackable: PropTypes.bool,

    /** A menu can be formatted to show tabs of information. */
    tabular: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]) as any,

    /** A menu can be formatted for text content. */
    text: PropTypes.bool,

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** A menu can have its items divided evenly. */
    widths: PropTypes.oneOf(SUI.WIDTHS as any),
};

export { };
