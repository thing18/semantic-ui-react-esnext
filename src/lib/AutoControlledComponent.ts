/* eslint-disable no-console */
/**
 * Why choose inheritance over a HOC?  Multiple advantages for this particular use case.
 * In short, we need identical functionality to setState(), unless there is a prop defined
 * for the state key.  Also:
 *
 * 1. Single Renders
 *    Calling trySetState() in constructor(), componentWillMount(), or componentWillReceiveProps()
 *    does not cause two renders. Consumers and tests do not have to wait two renders to get state.
 *    See www.react.run/4kJFdKoxb/27 for an example of this issue.
 *
 * 2. Simple Testing
 *    Using a HOC means you must either test the undecorated component or test through the decorator.
 *    Testing the undecorated component means you must mock the decorator functionality.
 *    Testing through the HOC means you can not simply shallow render your component.
 *
 * 3. Statics
 *    HOC wrap instances, so statics are no longer accessible.  They can be hoisted, but this is more
 *    looping over properties and storing references.  We rely heavily on statics for testing and sub
 *    components.
 *
 * 4. Instance Methods
 *    Some instance methods may be exposed to users via refs.  Again, these are lost with HOC unless
 *    hoisted and exposed by the HOC.
 */
import React, { Component } from 'react';

export const getDefaultPropName = (prop: string) => `default${prop[0].toUpperCase() + prop.slice(1)}`;

/**
 * Return the auto controlled state value for a give prop. The initial value is chosen in this order:
 *  - regular props
 *  - then, default props
 *  - then, initial state
 *  - then, `checked` defaults to false
 *  - then, `value` defaults to '' or [] if props.multiple
 *  - else, undefined
 *
 *  @param {string} propName A prop name
 *  @param {object} [props] A props object
 *  @param {object} [state] A state object
 *  @param {boolean} [includeDefaults=false] Whether or not to heed the default props or initial state
 */
export const getAutoControlledStateValue = (propName: string, props: any, state: any, includeDefaults = false) => {

  // regular props
  const propValue = props[propName];
  if (propValue !== undefined) return propValue;

  if (includeDefaults) {
    // defaultProps
    const defaultProp = props[getDefaultPropName(propName)];
    if (defaultProp !== undefined) return defaultProp;

    // initial state - state may be null or undefined
    if (state) {
      const initialState = state[propName];
      if (initialState !== undefined) return initialState;
    }
  }

  // React doesn't allow changing from uncontrolled to controlled components,
  // default checked/value if they were not present.
  if (propName === 'checked') return false;
  if (propName === 'value') return props.multiple ? [] : '';

  // otherwise, undefined
};

export abstract class AutoControlledComponent<P extends object = any, S extends object = any> extends Component<P, S> {

  constructor(props: P) {
    super(props);

    const { autoControlledProps } = this.constructor as unknown as { autoControlledProps: string[]; };

    const state = this.getInitialAutoControlledState(this.props) ?? {};

    if (process.env.NODE_ENV !== 'production') {

      const { defaultProps, name, propTypes } = this.constructor as unknown as { defaultProps: Record<string, any>; name: string; propTypes: Record<string, any>; };

      // require static autoControlledProps
      if (!autoControlledProps) console.error(`Auto controlled ${name} must specify a static autoControlledProps array.`);

      // require propTypes
      autoControlledProps.forEach(prop => {

        const defaultProp = getDefaultPropName(prop);

        // regular prop
        if (!propTypes.hasOwnProperty(defaultProp)) console.error(`${name} is missing "${defaultProp}" propTypes validation for auto controlled prop "${prop}".`);

        // its default prop
        if (!propTypes.hasOwnProperty(prop)) console.error(`${name} is missing propTypes validation for auto controlled prop "${prop}".`);

      });

      // prevent autoControlledProps in defaultProps
      //
      // When setting state, auto controlled props values always win (so the parent can manage them).
      // It is not reasonable to decipher the difference between props from the parent and defaultProps.
      // Allowing defaultProps results in trySetState always deferring to the defaultProp value.
      // Auto controlled props also listed in defaultProps can never be updated.
      //
      // To set defaults for an AutoControlled prop, you can set the initial state in the
      // constructor or by using an ES7 property initializer:
      // https://babeljs.io/blog/2015/06/07/react-on-es6-plus#property-initializers
      const illegalDefaults = autoControlledProps.filter(x => defaultProps.hasOwnProperty(x));

      if (illegalDefaults.length) {
        console.error(
          [
            'Do not set defaultProps for autoControlledProps. You can set defaults by',
            'setting state in the constructor or using an ES7 property initializer',
            '(https://babeljs.io/blog/2015/06/07/react-on-es6-plus#property-initializers)',
            `See ${name} props: "${illegalDefaults}".`,
          ].join(' '),
        );
      }

      // prevent listing defaultProps in autoControlledProps
      //
      // Default props are automatically handled.
      // Listing defaults in autoControlledProps would result in allowing defaultDefaultValue props.
      const illegalAutoControlled = autoControlledProps.filter(prop => prop.startsWith('default'));

      if (illegalAutoControlled.length) {
        console.error(
          [
            'Do not add default props to autoControlledProps.',
            'Default props are automatically handled.',
            `See ${name} autoControlledProps: "${illegalAutoControlled}".`,
          ].join(' '),
        );
      }
    }

    // Auto controlled props are copied to state.
    // Set initial state by copying auto controlled props to state.
    // Also look for the default prop for any auto controlled props (foo => defaultFoo)
    // so we can set initial values from defaults.
    const initialAutoControlledState = autoControlledProps.reduce(
      (acc, prop) => {

        acc[prop] = getAutoControlledStateValue(prop, this.props, state, true);

        if (process.env.NODE_ENV !== 'production') {

          const defaultPropName = getDefaultPropName(prop);
          const { name } = this.constructor;

          // prevent defaultFoo={} along side foo={}
          if (this.props[defaultPropName as keyof P] === undefined && this.props[prop as keyof P] === undefined) {
            console.error(`${name} prop "${prop}" is auto controlled. Specify either ${defaultPropName} or ${prop}, but not both.`);
          }
        }

        return acc;
      },
      {} as any);

    this.state = { ...state, ...initialAutoControlledState };
  }

  // tslint:disable-next-line: function-name
  UNSAFE_componentWillReceiveProps(nextProps: P) {

    const { autoControlledProps } = this.constructor as unknown as { autoControlledProps: string[]; };

    // Solve the next state for autoControlledProps
    const newState = autoControlledProps.reduce(
      (acc, prop) => {

        const isNextDefined = nextProps[prop as keyof P] !== undefined;

        // if next is defined then use its value
        if (isNextDefined) acc[prop] = nextProps[prop as keyof P];

        return acc;
      },
      {} as any,
    );

    if (Object.keys(newState).length) this.setState(newState);
  }

  /**
   * Safely attempt to set state for props that might be controlled by the user.
   * Second argument is a state object that is always passed to setState.
   * @param {object} state State that corresponds to controlled props.
   * @param {function} [callback] Callback which is called after setState applied.
   */
  trySetState = (state: Partial<S>, callback: any) => {

    const newState = Object.keys(state).reduce((acc, prop) => {

      // ignore props defined by the parent
      if (this.props[prop as keyof P] !== undefined) return acc;

      acc[prop] = state[prop as keyof S];
      return acc;
    }, {} as any);

    if (Object.keys(newState).length > 0) this.setState(newState, callback);
  }

  abstract getInitialAutoControlledState(props: P): S;
}
