export * from './numberToWord';
export * from './classNameBuilders';
export * from './getElementType';
export * from './isBrowser';
export * as childrenUtils from './childrenUtils';
export * from './factories';
export * from './objectDiff';
export * from './htmlPropsUtils';
export * from './normalizeOffset';
export * from './doesNodeContainClick';
export * from './ModernAutoControlledComponent';
export * from './normalizeTransitionDuration';
export * from './hooks';

// export { default as leven } from './leven';
// export * as SUI from './SUI';
// export * as customPropTypes from './customPropTypes';

//
export * from './isPlainObject';
export * from './types';
export * from './childrenOrContent';
export * from './keys';

// tslint:disable-next-line: triple-equals
export const isEmptyPrimitive = (value: string | number | boolean | (string | number | boolean)[]) => ((Array.isArray(value) || typeof value == 'string') && !value.length) || value == null;

export const unique = (...args: ((string | number | boolean)[] | string | number | boolean)[]) => Array.from(new Set(args.flat()));

export const diffValues = (newValues: (string | number | boolean)[], oldValues: (string | number | boolean)[]) => newValues.filter(x => !oldValues.includes(x));

export const deburr = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const escapeRegExp = (s: string) => s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

export const isEqualObj = (a: undefined | Record<string, any>, b: undefined | Record<string, any>) => {

    if (a === b) return true;
    if (a == null || b == null) return a === b;

    const a_keys = Object.keys(a).sort();
    const b_keys = Object.keys(b).sort();

    // tslint:disable-next-line: triple-equals
    if (a_keys.length != b_keys.length) return false;

    if (!a_keys.every(k => b_keys.includes(k))) return false;

    return a_keys.every(k => a[k] === b[k]);
};

export const simpleReducer = <T extends object>(prev: T, next: Partial<T>): T => ({ ...prev, ...next });
