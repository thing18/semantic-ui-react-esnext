/**
 * Normalizes the offset value.
 * @param {number|array} value The value to normalize.
 * @returns {number}
 */
// tslint:disable-next-line: triple-equals
export default (value: number | string | number[] | string[]) => typeof value == 'number' || typeof value == 'string' ? [value, value] : value;
