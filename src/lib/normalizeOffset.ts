/**
 * Normalizes the offset value.
 * @param {number|array} value The value to normalize.
 * @returns {number}
 */

export const normalizeOffset = (value: number | string | number[] | string[]) => Array.isArray(value) ? value : [value, value];
