import React, { cloneElement, isValidElement } from 'react';
import { isPlainObject } from './isPlainObject';

// ============================================================
// Factories
// ============================================================

/**
 * A more robust React.createElement. It can create elements from primitive values.
 *
 * @param {function|string} Component A ReactClass or string
 * @param {function} mapValueToProps A function that maps a primitive value to the Component props
 * @param {string|object|function} val The value to create a ReactElement from
 * @param {Object} [options={}]
 * @param {object} [options.defaultProps={}] Default props object
 * @param {object|function} [options.overrideProps={}] Override props object or function (called with regular props)
 * @param {boolean} [options.autoGenerateKey=true] Whether or not automatic key generation is allowed
 * @returns {object|null}
 */

interface Options {
  defaultProps?: any;
  overrideProps?: any;
  autoGenerateKey?: boolean;
}

type MapValueToProps<T> = (val: any) => T;

export const createShorthand = <T extends any = any>(Component: string | React.FC<T>, mapValueToProps: MapValueToProps<T> | null, val: any, options: Options = {}) => {

  // tslint:disable-next-line: triple-equals
  if (process.env.NODE_ENV != 'production') {

    if (typeof Component !== 'function' && typeof Component !== 'string') {
      throw new Error('createShorthand() Component must be a string or function.');
    }
  }

  // short circuit noop values
  // tslint:disable: triple-equals
  if (val == null || typeof val == 'boolean') return null;

  const valIsString = typeof val == 'string' || val instanceof String;
  const valIsNumber = typeof val == 'number' || val instanceof Number;
  const valIsFunction = typeof val == 'function' || val instanceof Function;
  const valIsReactElement = isValidElement(val);
  const valIsPropsObject = isPlainObject(val);
  const valIsPrimitiveValue = valIsString || valIsNumber || Array.isArray(val);
  // tslint:enable: triple-equals

  // unhandled type return null
  /* eslint-disable no-console */
  if (!valIsFunction && !valIsReactElement && !valIsPropsObject && !valIsPrimitiveValue) {
    // tslint:disable-next-line: triple-equals
    if (process.env.NODE_ENV != 'production') {
      console.error(
        [
          'Shorthand value must be a string|number|array|object|ReactElement|function.',
          ' Use null|undefined|boolean for none',
          ` Received ${typeof val}.`,
        ].join(''),
      );
    }
    return null;
  }
  /* eslint-enable no-console */

  // ----------------------------------------
  // Build up props
  // ----------------------------------------
  const { defaultProps = {} } = options;

  // User's props
  const usersProps = (valIsReactElement && val.props) || (valIsPropsObject && val) || (valIsPrimitiveValue && mapValueToProps ? mapValueToProps(val) : {});

  // Override props
  let { overrideProps = {} } = options;
  // tslint:disable-next-line: triple-equals
  overrideProps = typeof overrideProps == 'function' || overrideProps instanceof Function
    ? overrideProps({ ...defaultProps, ...usersProps })
    : overrideProps;

  // Merge props
  /* eslint-disable react/prop-types */
  const props = { ...defaultProps, ...usersProps, ...overrideProps };

  // Merge className
  if (defaultProps.className || overrideProps.className || usersProps.className) {

    const mergedClassesNames = new Set<string>([defaultProps.className, overrideProps.className, usersProps.className].join(' ').split(' ').map(s => s.trim()));
    props.className = Array.from(mergedClassesNames.values()).filter(Boolean).join(' ');
  }

  // Merge style
  if (defaultProps.style || overrideProps.style || usersProps.style) {
    props.style = { ...defaultProps.style, ...usersProps.style, ...overrideProps.style };
  }

  // ----------------------------------------
  // Get key
  // ----------------------------------------

  // Use key, childKey, or generate key
  if (props.key == null) {
    const { childKey } = props;
    const { autoGenerateKey = true } = options;

    if (childKey != null) {
      // apply and consume the childKey
      props.key = typeof childKey === 'function' ? childKey(props) : childKey;
      delete props.childKey;
    } else if (autoGenerateKey && (valIsString || valIsNumber)) {
      // use string/number shorthand values as the key
      props.key = val;
    }
  }

  // ----------------------------------------
  // Create Element
  // ----------------------------------------

  // Clone ReactElements
  if (valIsReactElement) return cloneElement(val, props);

  // Create ReactElements from built up props
  if (valIsPrimitiveValue || valIsPropsObject) return <Component {...props} />;

  // Call functions with args similar to createElement()
  if (valIsFunction) return val(Component, props, props.children);
  /* eslint-enable react/prop-types */
};

// ============================================================
// Factory Creators
// ============================================================

/**
 * Creates a `createShorthand` function that is waiting for a value and options.
 *
 * @param {function|string} Component A ReactClass or string
 * @param {function} mapValueToProps A function that maps a primitive value to the Component props
 * @returns {function} A shorthand factory function waiting for `val` and `defaultProps`.
 */
export const createShorthandFactory = <T extends any = any>(Component: string | React.FC<T>, mapValueToProps: MapValueToProps<T> | null) => {

  // tslint:disable-next-line: triple-equals
  if (process.env.NODE_ENV != 'production') {
    if (typeof Component !== 'function' && typeof Component !== 'string') {
      throw new Error('createShorthandFactory() Component must be a string or function.');
    }
  }
  return (val: any, options?: any) => createShorthand(Component, mapValueToProps, val, options);
};

// ============================================================
// HTML Factories
// ============================================================
export const createHTMLDivision = createShorthandFactory('div', (val) => ({ children: val }));
export const createHTMLIframe = createShorthandFactory('iframe', (src) => ({ src }));
export const createHTMLImage = createShorthandFactory('img', (val) => ({ src: val }));
export const createHTMLInput = createShorthandFactory('input', (val) => ({ type: val }));
export const createHTMLLabel = createShorthandFactory('label', (val) => ({ children: val }));
export const createHTMLParagraph = createShorthandFactory('p', (val) => ({ children: val }));
