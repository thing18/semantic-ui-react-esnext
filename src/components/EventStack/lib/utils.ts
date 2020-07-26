import * as React from 'react';
import { InputEventListener, GenericMap, InputTargetElement, TargetElement, EventListeners } from '../types';
import { isRefObject } from '../../Ref';

/**
 * An IE11-compatible function.
 *
 * @see https://jsperf.com/suir-clone-map
 */
export const cloneMap = <T = any>(map: GenericMap<T>): GenericMap<T> => new Map<String, T>(map);

export const normalizeHandlers = (handlers: InputEventListener): EventListeners => Array.isArray(handlers) ? handlers : [handlers];

/**
 * Asserts that the passed value is React.RefObject
 *
 * @see https://github.com/facebook/react/blob/v16.8.2/packages/react-reconciler/src/ReactFiberCommitWork.js#L665
 */
// export const isRefObject = <T>(ref: any): ref is React.RefObject<T> => ref !== null && typeof ref === 'object' && ref.hasOwnProperty('current');

/**
 * Normalizes `target` for EventStack, because `target` can be passed as `boolean` or `string`.
 *
 * @see https://jsperf.com/suir-normalize-target
 */
export function normalizeTarget(target: InputTargetElement): TargetElement {

  if (target === 'document') return document;
  if (target === 'window') return window;
  if (isRefObject(target)) return target.current ?? document;

  return (target as HTMLElement) ?? document;
}
