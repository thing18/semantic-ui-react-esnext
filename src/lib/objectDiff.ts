// import _ from 'lodash'

/**
 * Naive and inefficient object difference, intended for development / debugging use only.
 * Deleted keys are shown as [DELETED].
 * @param {{}} source The source object
 * @param {{}} target The target object.
 * @returns {{}} A new object containing new/modified/deleted keys.
 * @example
 * import { objectDiff } from 'src/lib'
 *
 * const a = { key: 'val', foo: 'bar' }
 * const b = { key: 'val', foo: 'baz' }
 *
 * objectDiff(a, b)
 * //=> { foo: 'baz' }
 */
export const objectDiff = (source: any, target: any) => Object.keys(source).reduce(

  (acc, val) => {

    if (!Object.prototype.hasOwnProperty.call(target, val)) {
      acc[val] = '[DELETED]';
      return acc;
    }

    if (source[val] !== target[val]) acc[val] = target[val];

    return acc;
  },
  {} as any,
);

// _.transform(
//   source,
//   (res, val, key) => {
//     // deleted keys
//     if (!_.has(target, key)) res[key] = '[DELETED]'
//     // new keys / changed values
//     // Note, we tolerate isEqual here as this is a dev only utility and not included in production code
//     else if (!_.isEqual(val, target[key])) res[key] = target[key]
//   },
//   {},
// )
