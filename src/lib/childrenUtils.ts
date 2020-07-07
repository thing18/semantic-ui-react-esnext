import { Children, ReactChildren, ElementType } from 'react';

/**
 * Determine if child by type exists in children.
 * @param {Object} children The children prop of a component.
 * @param {string|Function} type An html tag name string or React component.
 * @returns {Boolean}
 */
// tslint:disable-next-line: triple-equals
export const someByType = (children: ReactChildren, type: ElementType) => Children.toArray(children).some((c: any) => typeof c == 'object' && c.type === type);

/**
 * Find child by type.
 * @param {Object} children The children prop of a component.
 * @param {string|Function} type An html tag name string or React component.
 * @returns {undefined|Object}
 */
// tslint:disable-next-line: triple-equals
export const findByType = (children: ReactChildren, type: ElementType) => Children.toArray(children).find((c: any) => typeof c == 'object' && c.type === type);

/**
 * Tests if children are nil in React and Preact.
 * @param {Object} children The children prop of a component.
 * @returns {Boolean}
 */
export const isNil = (children: any) => children == null || (Array.isArray(children) && !children.length);
