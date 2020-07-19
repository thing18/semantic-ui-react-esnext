import React, { ReactElement } from 'react';
import { Transition, TransitionPropDuration } from '../Transition';

/**
 * Wraps a React element with a Transition component.
 *
 * @param {React.ReactElement} child
 * @param {Function} onHide
 * @param {Object} [options={}]
 * @param {String} [options.animation]
 * @param {Number} [options.duration]
 * @param {Boolean} [options.directional]
 * @param {Boolean} [options.transitionOnMount=false]
 * @param {Boolean} [options.visible=true]
 */
interface Options {
  animation?: string;
  duration?: number | string | TransitionPropDuration;
  directional?: boolean;
  transitionOnMount?: boolean;
  visible?: boolean;
}

export const wrapChild = (child: ReactElement, onHide: any, options: Options = {}) => {

  const { key } = child;
  const { animation, directional, duration, transitionOnMount = false, visible = true } = options;

  return (
    <Transition
      animation={animation}
      directional={directional}
      duration={duration}
      key={key as any}
      onHide={onHide}
      reactKey={key as any}
      transitionOnMount={transitionOnMount}
      visible={visible}
    >
      {child}
    </Transition>
  );
};
