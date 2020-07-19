import React, { Children, useState, useEffect } from 'react';

import { SemanticTRANSITIONS, htmlImageProps } from '../../lib';
import { TransitionPropDuration, Transition } from './Transition';
import { getChildMapping, mergeChildMappings } from './utils/childMapping';
import { wrapChild } from './utils/wrapChild';

export interface TransitionGroupProps extends StrictTransitionGroupProps {
  [key: string]: any;
}

export interface StrictTransitionGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Named animation event to used. Must be defined in CSS. */
  animation?: SemanticTRANSITIONS | string;

  /** Primary content. */
  children?: React.ReactNode;

  /** Whether it is directional animation event or not. Use it only for custom transitions. */
  directional?: boolean;

  /** Duration of the CSS transition animation in milliseconds. */
  duration?: number | string | TransitionPropDuration;
}

/**
 * A Transition.Group animates children as they mount and unmount.
 */
export const TransitionGroup: React.FC<TransitionGroupProps> = props => {

  const { as: ElementType, animation, children, directional, duration, ...rest } = { ...TransitionGroup.defaultProps, ...props };

  const [state, setState] = useState<any>({});

  const handleOnHide = (_e: any, { reactKey }: any) => {

    const newState = { ...state };
    delete newState[reactKey];

    setState(newState);
  };

  useEffect(
    () => {
      const nextMapping = getChildMapping(children);

      // A short circuit for an initial render as there will be no `prevMapping`
      if (!Object.keys(state).length) {
        setState(Object.values(nextMapping).map((child: any) => wrapChild(child, handleOnHide, { animation, duration, directional })));
        return;
      }

      const newState = mergeChildMappings(state, nextMapping) as Record<string, any>;

      Object.entries(newState).forEach(([key, child]) => {

        const hasPrev = state.hasOwnProperty(key);
        const hasNext = nextMapping.hasOwnProperty(key);

        const { [key]: prevChild } = state;
        const isLeaving = !prevChild.props?.visible;

        // Heads up!
        // An item is new (entering), it will be picked from `nextChildren`, so it should be wrapped
        if (hasNext && (!hasPrev || isLeaving)) {
          newState[key] = wrapChild(child, state.handleOnHide, { animation, duration, directional, transitionOnMount: true });
          return;
        }

        // Heads up!
        // An item is old (exiting), it will be picked from `prevChildren`, so it has been already
        // wrapped, so should be only updated
        if (!hasNext && hasPrev && !isLeaving) {
          newState[key] = React.cloneElement(prevChild, { visible: false });
          return;
        }

        // Heads up!
        // An item item hasn't changed transition states, but it will be picked from `nextChildren`,
        // so we should wrap it again
        const { props: { visible, transitionOnMount } } = prevChild;

        newState[key] = wrapChild(child, state.handleOnHide, { animation, duration, directional, transitionOnMount, visible });
      });

      setState(newState);

    },
    [children],
  );

  return <ElementType {...rest}>{Object.values(state.children)}</ElementType>;
};

TransitionGroup.defaultProps = { as: React.Fragment, animation: 'fade', duration: 500 };
