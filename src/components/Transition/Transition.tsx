import React, { cloneElement, Component } from 'react';

import { SemanticTRANSITIONS, normalizeTransitionDuration, getClassName } from '../../lib';
import { TransitionGroup } from './TransitionGroup';
import { computeStatuses } from './utils/computeStatuses';

export type TRANSITION_STATUSES = 'INITIAL' | 'ENTERED' | 'ENTERING' | 'EXITED' | 'EXITING' | 'UNMOUNTED';

export interface TransitionProps extends StrictTransitionProps {
  [key: string]: any;
}

export interface TransitionPropDuration {
  hide: number;
  show: number;
}

export interface StrictTransitionProps {
  /** Named animation event to used. Must be defined in CSS. */
  animation?: SemanticTRANSITIONS | string;

  /** Primary content. */
  children?: React.ReactNode;

  /** Whether it is directional animation event or not. Use it only for custom transitions. */
  directional?: boolean;

  /** Duration of the CSS transition animation in milliseconds. */
  duration?: number | string | TransitionPropDuration;

  /** Show the component; triggers the enter or exit animation. */
  visible?: boolean;

  /** Wait until the first "enter" transition to mount the component (add it to the DOM). */
  mountOnShow?: boolean;

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onComplete?: (nothing: null, data: TransitionEventData) => void;

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onHide?: (nothing: null, data: TransitionEventData) => void;

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onShow?: (nothing: null, data: TransitionEventData) => void;

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onStart?: (nothing: null, data: TransitionEventData) => void;

  /** React's key of the element. */
  reactKey?: string;

  /** Run the enter animation when the component mounts, if it is initially shown. */
  transitionOnMount?: boolean;

  /** Unmount the component (remove it from the DOM) when it is not shown. */
  unmountOnHide?: boolean;
}

export interface TransitionEventData extends TransitionProps {
  status: TRANSITION_STATUSES;
}

// interface CTransition extends React.FC<TransitionProps> {
//   Group: typeof TransitionGroup;
// }

const TRANSITION_CALLBACK_TYPE: Record<TRANSITION_STATUSES, string> = { ENTERING: 'show', EXITING: 'hide' } as any;

interface TransitionState {
  status: TRANSITION_STATUSES;
  nextStatus: TRANSITION_STATUSES;
  animating: boolean;
}

/**
 * A transition is an animation usually used to move content in or out of view.
 */
export class Transition extends Component<TransitionProps, TransitionState> {

  static propTypes: any;

  static defaultProps = {
    animation: 'fade',
    duration: 500,
    visible: true,
    mountOnShow: true,
    transitionOnMount: false,
    unmountOnHide: false,
  };

  static Group = TransitionGroup;

  state = { status: 'INITIAL' } as any;
  nextStatus!: TRANSITION_STATUSES | null;
  timeoutId: any;

  // ----------------------------------------
  // Lifecycle
  // ----------------------------------------
  static getDerivedStateFromProps(props: TransitionProps, state: TransitionState) {

    return computeStatuses({
      mountOnShow: props.mountOnShow,
      status: state.status,
      transitionOnMount: props.transitionOnMount,
      visible: props.visible,
      unmountOnHide: props.unmountOnHide,
    }) as any;
  }

  componentDidMount() {
    this.updateStatus();
  }

  componentDidUpdate(_prevProps: TransitionProps, prevState: TransitionState) {
    this.updateStatus(prevState);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  // ----------------------------------------
  // Callback handling
  // ----------------------------------------
  handleStart = (nextStatus: TRANSITION_STATUSES) => {

    const { duration } = this.props;

    const durationType = TRANSITION_CALLBACK_TYPE[nextStatus];
    const durationValue = normalizeTransitionDuration(duration as any, durationType) as any;

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(
      () => this.setState((state) => ({ status: state.nextStatus })),
      durationValue,
    );

  }

  updateStatus(prevState: TransitionState = {} as any) {

    if (this.state.status !== this.state.nextStatus && this.state.nextStatus) {
      this.handleStart(this.state.nextStatus);
    }

    if (!prevState.animating && this.state.animating) {
      this.props.onStart?.call(null, null, { ...this.props, status: this.state.status });
    }

    if (prevState.animating && !this.state.animating) {

      this.props.onComplete?.call(null, null, { ...this.props, status: this.state.status });
      (this.state.status === 'ENTERED' ? this.props.onShow : this.props.onHide)?.call(null, null, { ...this.props, status: this.state.status });
    }
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  static _ANIM = ['jiggle', 'flash', 'shake', 'pulse', 'tada', 'bounce', 'glow'];

  render() {

    const { children, duration, animation, directional } = this.props;
    const { status, animating } = this.state as TransitionState;

    if (status === 'UNMOUNTED') return null;
    const type = TRANSITION_CALLBACK_TYPE[status];
    const childClasses = (children as any).props?.className;

    const className = (directional ?? !Transition._ANIM.includes(animation as any))
      ? getClassName(animation, childClasses, { animating, in: status === 'ENTERING', out: status === 'EXITING', hidden: status === 'EXITED', visible: status === 'EXITED' }, 'transition')
      : getClassName(animation, childClasses, { 'animating transition': animating });

    const style = { ...(children as any).props?.style, animationDuration: type && `${normalizeTransitionDuration(duration as any, type)}ms` };

    return cloneElement(children as any, { className, style });
  }
}
