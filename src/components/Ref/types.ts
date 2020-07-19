import * as React from 'react';

export interface RefProps {
  children: React.ReactElement<any>;

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param node - Referred node.
   */
  innerRef: React.Ref<HTMLElement>;
}

/** A checker that matches the React.Ref type. */
// export const refPropType = PropTypes.oneOfType([
//   PropTypes.func,
//   PropTypes.object,
// ]) as PropTypes.Requireable<React.Ref<any>>

const nullRefObject = { current: null }; // A map of created ref objects to provide memoization.

const refObjects = new WeakMap();
/** Creates a React ref object from existing DOM node. */

export const toRefObject = (node: any) => {
  // A "null" is not valid key for a WeakMap
  if (node === null) return nullRefObject;

  if (refObjects.has(node)) return refObjects.get(node);

  const refObject = { current: node };
  refObjects.set(node, refObject);
  return refObject;
};
