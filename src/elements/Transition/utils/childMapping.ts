import { Children, isValidElement, ReactNode } from 'react';

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {object} children Element's children
 * @return {object} Mapping of key to child
 */
export const getChildMapping = (children: ReactNode | ReactNode[]) => Children.toArray(children).reduce(
  (acc: Record<string, Exclude<ReactNode, boolean | null | undefined>>, val: ReactNode) => {
    if (isValidElement(val)) acc[val.props.key] = val;
    return acc;
  },
  {} as Record<string, Exclude<ReactNode, boolean | null | undefined>>,
);

const getPendingKeys = (prev: any, next: any): [Record<string, string[]>, string[]] => {

  const nextKeysPending = {} as Record<string, string[]>;
  let pendingKeys = [] as string[];

  Object.keys(prev).forEach((prevKey) => {

    if (!Object.prototype.hasOwnProperty.call(next, prevKey)!) {
      pendingKeys.push(prevKey);
      return;
    }

    if (pendingKeys.length) {
      nextKeysPending[prevKey] = pendingKeys;
      pendingKeys = [] as string[];
    }
  });

  return [nextKeysPending, pendingKeys];
};

const getValue = (key: string, prev: any, next: any) => (Object.prototype.hasOwnProperty.call(next, key) ? next[key] : prev[key]);

/**
 * When you're adding or removing children some may be added or removed in the same render pass. We want to show *both*
 * since we want to simultaneously animate elements in and out. This function takes a previous set of keys and a new set
 * of keys and merges them with its best guess of the correct ordering.
 *
 * @param {object} prev Prev children as returned from `getChildMapping()`
 * @param {object} next Next children as returned from `getChildMapping()`
 * @return {object} A key set that contains all keys in `prev` and all keys in `next` in a reasonable order
 */
export const mergeChildMappings = (prev = {}, next = {}) => {

  const childMapping = {} as any;
  const [nextKeysPending, pendingKeys] = getPendingKeys(prev, next);

  const f = (pendingKey: string) => childMapping[pendingKey] = getValue(pendingKey, prev, next);

  Object.keys(next).forEach((nextKey) => {

    if (Object.prototype.hasOwnProperty.call(nextKeysPending, nextKey)) nextKeysPending[nextKey].forEach(f);

    childMapping[nextKey] = getValue(nextKey, prev, next);
  });

  pendingKeys.forEach(f);

  return childMapping;
};
