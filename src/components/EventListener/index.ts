import { TargetRef } from './types';

export const documentRef: TargetRef = {
  current: typeof document === 'undefined' ? null : document,
};
export const windowRef: TargetRef = {
  current: typeof window === 'undefined' ? null : window,
};

export * from './EventListener';
export * from './types';
export * from './useEventListener';
