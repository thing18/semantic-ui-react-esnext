import { useMemo } from 'react';
import { numberToWord } from './numberToWord';
import { SemanticTEXTALIGNMENTS, SemanticVERTICALALIGNMENTS, SemanticWIDTHS } from './types';

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
// type StringOrOptionalStrings = OptionalString | OptionalStrings;
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

export const useClassName = (p: ClassArg[], deps: any[]) => useMemo(() => getClassName(...p), deps);
