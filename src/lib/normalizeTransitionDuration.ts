/**
 * Normalizes the duration of a transition.
 * @param {number|object} duration The value to normalize.
 * @param {'hide'|'show'} type The type of transition.
 * @returns {number}
 */
export const normalizeTransitionDuration = (duration: string | number | Record<string, number>, type: string) =>
  // tslint:disable-next-line: triple-equals
  typeof duration == 'number' || typeof duration == 'string' ? duration : duration[type];
