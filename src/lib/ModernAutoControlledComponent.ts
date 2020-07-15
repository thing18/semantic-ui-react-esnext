/* eslint-disable no-console */
/**
 * Why choose inheritance over a HOC?  Multiple advantages for this particular use case.
 * In short, we need identical functionality to setState(), unless there is a prop defined
 * for the state key.  Also:
 *
 * 1. Single Renders
 *    Calling setState() does not cause two renders. Consumers and tests do not have to wait two
 *    renders to get state.
 *    See www.react.run/4kJFdKoxb/27 for an example of this issue.
 *
 * 2. Simple Testing
 *    Using a HOC means you must either test the undecorated component or test through the decorator.
 *    Testing the undecorated component means you must mock the decorator functionality.
 *    Testing through the HOC means you can not simply shallow render your component.
 *
 * 3. Statics
 *    HOC wrap instances, so statics are no longer accessible. They can be hoisted, but this is more
 *    looping over properties and storing references.  We rely heavily on statics for testing and
 *    sub components.
 *
 * 4. Instance Methods
 *    Some instance methods may be exposed to users via refs.  Again, these are lost with HOC unless
 *    hoisted and exposed by the HOC.
 */
import React, { Component } from 'react';
import { getAutoControlledStateValue, getDefaultPropName } from './AutoControlledComponent';

export interface ModernAutoControlledComponentState {

  autoControlledProps: string[];
  getAutoControlledStateFromProps: (props: any) => any;
}

export abstract class ModernAutoControlledComponent<P extends object = any, S extends ModernAutoControlledComponentState = any> extends Component<P, S> {

  constructor(props: P) {
    super(props);

    const { autoControlledProps, getAutoControlledStateFromProps } = this.constructor as any;
    const state = this.getInitialAutoControlledState(this.props) ?? {};

    if (process.env.NODE_ENV !== 'production') {

      const { defaultProps, name, propTypes, getDerivedStateFromProps } = this.constructor as any;

      // require usage of getAutoControlledStateFromProps()
      if (getDerivedStateFromProps !== ModernAutoControlledComponent.getDerivedStateFromProps) console.error(`Auto controlled ${name} must specify a static getAutoControlledStateFromProps() instead of getDerivedStateFromProps().`);

      // require propTypes
      autoControlledProps.forEach((prop: string) => {

        const defaultProp = getDefaultPropName(prop);

        // regular prop
        if (propTypes.hasOwnProperty(defaultProp)) console.error(`${name} is missing "${defaultProp}" propTypes validation for auto controlled prop "${prop}".`);

        // its default prop
        if (propTypes.hasOwnProperty(prop)) console.error(`${name} is missing propTypes validation for auto controlled prop "${prop}".`);
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
      const illegalDefaults = autoControlledProps.filter((x: string) => defaultProps.hasOwnProperty(x));

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
      const illegalAutoControlled = autoControlledProps.filter((x: string) => x.startsWith('default'));

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
    const initialAutoControlledState = autoControlledProps.reduce((acc: any, prop: string) => {
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
    }, {});

    this.state = {
      ...state,
      ...initialAutoControlledState,
      autoControlledProps,
      getAutoControlledStateFromProps,
    };
  }

  static getDerivedStateFromProps(props: any, state: any) {

    const { autoControlledProps, getAutoControlledStateFromProps } = state;

    // Solve the next state for autoControlledProps
    const newStateFromProps = autoControlledProps.reduce((acc: any, prop: string) => {
      const isNextDefined = props[prop] !== undefined;

      // if next is defined then use its value
      if (isNextDefined) acc[prop] = props[prop];

      return acc;
    }, {});

    // Due to the inheritance of the AutoControlledComponent we should call its
    // getAutoControlledStateFromProps() and merge it with the existing state
    if (getAutoControlledStateFromProps) {
      const computedState = getAutoControlledStateFromProps(props, {
        ...state,
        ...newStateFromProps,
      });

      // We should follow the idea of getDerivedStateFromProps() and return only modified state
      return { ...newStateFromProps, ...computedState };
    }

    return newStateFromProps;
  }

  /**
   * Override this method to use getDerivedStateFromProps() in child components.
   */
  static getAutoControlledStateFromProps() {
    return null;
  }

  abstract getInitialAutoControlledState(props: P): S;
}
