import { numberToWord } from './numberToWord';

/*
 * There are 3 prop patterns used to build up the className for a component.
 * Each utility here is meant for use in a classnames() argument.
 *
 * There is no util for valueOnly() because it would simply return val.
 * Use the prop value inline instead.
 *   <Label size='big' />
 *   <div class="ui big label"></div>
 */

/**
 * Props where only the prop key is used in the className.
 * @param {*} val A props value
 * @param {string} key A props key
 *
 * @example
 * <Label tag />
 * <div class="ui tag label"></div>
 */
export const useKeyOnly = (val: boolean, key: string) => val && key;

export const useKeysOnly = (args: Record<string, any>) => Object.keys(args).reduce<string[]>(
  (acc, key) => { if (args[key]) acc.push(key); return acc; },
  [],
);

/**
 * Props that require both a key and value to create a className.
 * @param {*} val A props value
 * @param {string} key A props key
 *
 * @example
 * <Label corner='left' />
 * <div class="ui left corner label"></div>
 */
export const useValueAndKey = (val: any, key: string) => val && val !== true && `${val} ${key}`;

/**
 * Props whose key will be used in className, or value and key.
 * @param {*} val A props value
 * @param {string} key A props key
 *
 * @example Key Only
 * <Label pointing />
 * <div class="ui pointing label"></div>
 *
 * @example Key and Value
 * <Label pointing='left' />
 * <div class="ui left pointing label"></div>
 */
export const useKeyOrValueAndKey = (val: any, key: string) => val && (val === true ? key : `${val} ${key}`);

//
// Prop to className exceptions
//

/**
 * The "multiple" prop implements control of visibility and reserved classes for Grid subcomponents.
 *
 * @param {*} val The value of the "multiple" prop
 * @param {*} key A props key
 *
 * @example
 * <Grid.Row only='mobile' />
 * <Grid.Row only='mobile tablet' />
 * <div class="mobile only row"></div>
 * <div class="mobile only tablet only row"></div>
 */
export const useMultipleProp = (val: any, key: string) => {

  if (!val || val === true) return null;

  return val
    .replace('large screen', 'large-screen')
    .replace(/ vertically/g, '-vertically')
    .split(' ')
    .map((prop: string) => `${prop.replace('-', ' ')} ${key}`)
    .join(' ');
};

/**
 * The "textAlign" prop follows the useValueAndKey except when the value is "justified'.
 * In this case, only the class "justified" is used, ignoring the "aligned" class.
 * @param {*} val The value of the "textAlign" prop
 *
 * @example
 * <Container textAlign='justified' />
 * <div class="ui justified container"></div>
 *
 * @example
 * <Container textAlign='left' />
 * <div class="ui left aligned container"></div>
 */
export const useTextAlignProp = (val: any) => val === 'justified' ? 'justified' : useValueAndKey(val, 'aligned');

/**
 * The "verticalAlign" prop follows the useValueAndKey.
 *
 * @param {*} val The value of the "verticalAlign" prop
 *
 * @example
 * <Grid verticalAlign='middle' />
 * <div class="ui middle aligned grid"></div>
 */
export const useVerticalAlignProp = (val: any) => useValueAndKey(val, 'aligned');

/**
 * Create "X", "X wide" and "equal width" classNames.
 * "X" is a numberToWord value and "wide" is configurable.
 * @param {*} val The prop value
 * @param {string} [widthClass=''] The class
 * @param {boolean} [canEqual=false] Flag that indicates possibility of "equal" value
 *
 * @example
 * <Grid columns='equal' />
 * <div class="ui equal width grid"></div>
 *
 * <Form widths='equal' />
 * <div class="ui equal width form"></div>
 *
 * <FieldGroup widths='equal' />
 * <div class="equal width fields"></div>
 *
 * @example
 * <Grid columns={4} />
 * <div class="ui four column grid"></div>
 */
export const useWidthProp = (val: any, widthClass = '', canEqual = false) => {
  if (canEqual && val === 'equal') {
    return 'equal width';
  }

  const valType = typeof val;
  if ((valType === 'string' || valType === 'number') && widthClass) {
    return `${numberToWord(val)} ${widthClass}`;
  }

  return numberToWord(val);
};

//
// NEW!!!!!!
//
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

type OneArg = boolean | string | undefined | null;
type ArrayOfArgs = OneArg[];
// type StringOrOptionalStrings = OptionalString | OptionalStrings;
type ClassArg = OneArg
  | ArrayOfArgs
  | Record<string, any>
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

const reduceWidth = (acc: any[], [val, widthClass = '', canEqual = false]: [any, string, boolean]) => {

  if (canEqual && val === 'equal') {
    acc.push('equal width');
    return acc;
  }

  const valType = typeof val;
  // tslint:disable-next-line: triple-equals
  if ((valType == 'string' || valType == 'number') && widthClass) {
    acc.push(`${numberToWord(val)} ${widthClass}`);
    return acc;
  }

  acc.push(numberToWord(val));
  return acc;
};

export const getClassName = (...args: ClassArg[]) => args
  .reduce(
    (acc: any[], val) => {

      if (!val) return acc;

      // tslint:disable-next-line: triple-equals
      if (typeof val == 'string') {
        acc.push(val);
        return acc;
      }

      // is a collection of keys
      if (!Array.isArray(val)) return Object.entries(val).reduce(reduceKeys, acc);

      // is array, test first item
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
          const val1 = val[1];
          acc.push(val1 === 'justified' ? 'justified' : val1 && `${val1} aligned`);
          return acc;

        case Use.VerticalAlign:
          acc.push(val[1] && `${val[1]} aligned`);
          return acc;

        case Use.Width:
          if (!val[1]) return acc;

          if (!Array.isArray(val[1])) return reduceWidth(acc, [val[1], val[2] as any, val[3] as any]);

          return (val[1] as any[]).reduce(reduceWidth, acc);

        default:
          // is array of strings
          acc.push(val);
          return acc;
      }
    },
    [] as any[],
  )
  .flat(2)
  .filter(Boolean)
  .join(' ');
