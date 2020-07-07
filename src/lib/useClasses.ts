import { useMemo } from 'react';
import { numberToWord } from './numberToWord';
import { SemanticTEXTALIGNMENTS, SemanticVERTICALALIGNMENTS, SemanticWIDTHS } from './types';
import { SemanticTRANSITIONS } from '../generic';

interface ClassBase {
  t: 'key' | 'valueAndKey' | 'keyOrValueAndKey' | 'multiple' | 'textAlign' | 'verticalAlign' | 'width';
  v: any;
}

interface UseKeyClass extends ClassBase {
  t: 'key';
  v: Record<string, any>;
}
interface UseValueAndKeyClass extends ClassBase {
  t: 'valueAndKey';
  v: Record<string, any>;
}
interface UseKeyOrValueAndKeyClass extends ClassBase {
  t: 'keyOrValueAndKey';
  v: Record<string, any>;
}
interface UseMultipleClass extends ClassBase {
  t: 'multiple';
  v: Record<string, any>;
}
interface UseTextAlignClass extends ClassBase {
  t: 'textAlign';
  v: SemanticTEXTALIGNMENTS | undefined;
}
interface UseVeritcalAlignClass extends ClassBase {
  t: 'verticalAlign';
  v: SemanticVERTICALALIGNMENTS | undefined;
}
interface UseWidthClass extends ClassBase {
  t: 'width';
  v: number | string | { value: any; widthClass?: string; canEqual?: boolean } | { value: any; widthClass?: string; canEqual?: boolean }[];
}

export const enum Use {
  __base__ = 421970,
  Key,
  ValueKey,
  KeyOrValueKey,
  ValueKeyOrKey,
  Width,
  Multiple,
  TextAlign,
  VerticalAlign,
}

type OptionalString = string | undefined;
type OptionalStrings = OptionalString[];
type StringOrOptionalStrings = OptionalString | OptionalStrings;
type ClassArg = OptionalString
  | OptionalStrings
  | Record<string, boolean | undefined>
  | [Use.Key, Record<string, any>]
  | [Use.ValueKey, Record<string, any>]
  | [Use.KeyOrValueKey, Record<string, any>]
  | [Use.ValueKeyOrKey, Record<string, [any, any]>]
  | [Use.Multiple, Record<string, any>]
  | [Use.TextAlign, SemanticTEXTALIGNMENTS | undefined]
  | [Use.VerticalAlign, SemanticVERTICALALIGNMENTS | undefined]
  | [Use.Width, SemanticWIDTHS | 'equal' | undefined, (string | null)?, true?]
  | [Use.Width, [SemanticWIDTHS | 'equal' | undefined, string?, true?][]];

interface P {
  useStart?: any;
  useKey?: Record<string, any>;
  useValueAndKey?: Record<string, any>;
  useKeyOrValueAndKey?: Record<string, any>;
  useMultiple?: Record<string, any>;
  useTextAlign?: any;
  useVerticalAlign?: string;
  useWidth?: number | string | { value: any; widthClass?: string; canEqual?: boolean } | { value: any; widthClass?: string; canEqual?: boolean }[];
  useEnd?: any;
}

const reduceKeys = (acc: any[], [key, value]: [string, any]) => {

  if (value) acc.push(key);
  return acc;
};

const reduceValueAndKey = (acc: any[], [key, value]: [string, any]) => {

  acc.push(value && value !== true && `${value} ${key}`);
  return acc;
};

const reduceKeyOrValueAndKey = (acc: any[], [key, value]: [string, any]) => {

  acc.push(value && (value === true ? key : `${value} ${key}`));
  return acc;
};

const reduceValueAndKeyOrKey = (acc: any[], [key, [value, other]]: [string, [any, any]]) => {

  acc.push(value && value !== true ? `${value} ${key}` : (other && key));
  return acc;
};

const reduceMultiple = (acc: any[], [key, value]: [string, any]) => {

  if (!value || value === true) return acc;

  acc.push(value
    .replace('large screen', 'large-screen')
    .replace(/ vertically/g, '-vertically')
    .split(' ')
    .map((p: string) => `${p.replace('-', ' ')} ${key}`)
    .join(' '));

  return acc;
};

export const getClassNames = (p: OptionalStrings | P) => {

  if (Array.isArray(p)) {
    return p.flat().filter(Boolean).join(' ');
  }

  const { useStart, useEnd, useWidth, useVerticalAlign, useTextAlign, useMultiple, useKey, useValueAndKey, useKeyOrValueAndKey } = p;

  const res = [useStart];

  if (useKey) Object.entries(useKey).reduce(reduceKeys, res);

  if (useValueAndKey) Object.entries(useValueAndKey).reduce(reduceValueAndKey, res);

  if (useKeyOrValueAndKey) Object.entries(useKeyOrValueAndKey).reduce(reduceKeyOrValueAndKey, res);

  if (useMultiple) Object.entries(useMultiple).reduce(reduceMultiple, res);

  if (useTextAlign != null) {
    res.push(useTextAlign === 'justified' ? 'justified' : `${useTextAlign} aligned`);
  }

  if (useVerticalAlign != null) {
    res.push(`${useVerticalAlign} aligned`);
  }

  if (useWidth != null) {

    // tslint:disable-next-line: triple-equals
    if (typeof useWidth != 'object') {
      res.push(numberToWord(useWidth));
    } else {

      (Array.isArray(useWidth) ? useWidth : [useWidth]).forEach(({ value, widthClass = '', canEqual = false }) => res.push(canEqual && value === 'equal' ? 'equal width' : `${numberToWord(value)} ${widthClass}`));
    }
  }

  res.push(useEnd);

  return res.flat(2).filter(Boolean).join(' ');
};

export const useClassNames = (p: OptionalStrings | P, deps: any[]) => useMemo(() => getClassNames(p), deps);

export const getClassName = (...args: ClassArg[]) => args
  .reduce(
    (acc, val) => {

      // tslint:disable-next-line: triple-equals
      if (typeof val == 'undefined') return acc;

      // tslint:disable-next-line: triple-equals
      if (typeof val == 'string') {
        acc.push(val);
        return acc;
      }

      if (!Array.isArray(val)) return Object.entries(val).reduce(reduceKeys, acc);

      switch (val[0]) {
        case Use.Key:
          return Object.entries(val[1]).reduce(reduceKeys, acc);

        case Use.ValueKey:
          return Object.entries(val[1]).reduce(reduceValueAndKey, acc);

        case Use.KeyOrValueKey:
          return Object.entries(val[1]).reduce(reduceKeyOrValueAndKey, acc);

        case Use.ValueKeyOrKey:
          return Object.entries(val[1]).reduce(reduceValueAndKeyOrKey, acc);

        case Use.Multiple:
          return Object.entries(val[1]).reduce(reduceMultiple, acc);

        case Use.TextAlign:
          acc.push(val[1] === 'justified' ? 'justified' : `${val[1]} aligned`);
          return acc;

        case Use.VerticalAlign:
          acc.push(`${val[1]} aligned`);
          return acc;

        case Use.Width:

          if (!Array.isArray(val[1])) {

            const [, value, widthClass = null, canEqual = false] = val;

            acc.push(canEqual && value === 'equal' ? 'equal width' : !!widthClass ? `${numberToWord(value)} ${widthClass})` : numberToWord(value));
            return acc;
          }

          val[1].forEach(([value, widthClass = '', canEqual = false]) => acc.push(canEqual && value === 'equal' ? 'equal width' : `${numberToWord(value)} ${widthClass}`));
          return acc;

        default:
          acc.push(val);
          return acc;
      }
    },
    [] as any[],
  )
  .flat(2)
  .filter(Boolean)
  .join(' ');
