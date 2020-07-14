import React, { cloneElement, Component } from 'react';

import { SemanticTRANSITIONS, normalizeTransitionDuration, getClassName } from '../../lib';
import { TransitionGroup } from './TransitionGroup';

export type TRANSITION_STATUSES = 'ENTERED' | 'ENTERING' | 'EXITED' | 'EXITING' | 'UNMOUNTED';

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

const TRANSITION_TYPE: Record<TRANSITION_STATUSES, string> = { ENTERING: 'show', EXITING: 'hide' } as any;

interface TransitionState {
  status: TRANSITION_STATUSES;
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

  nextStatus: TRANSITION_STATUSES | null;
  timeoutId: any;

  constructor(props: TransitionProps) {
    super(props);

    const { visible, mountOnShow, transitionOnMount, unmountOnHide } = this.props;

    if (visible) {

      this.nextStatus = transitionOnMount ? 'ENTERING' : null;
      this.state = { status: transitionOnMount ? 'EXITED' : 'ENTERED', animating: false };
      return;
    }

    this.nextStatus = null;
    this.setState({ status: (mountOnShow || unmountOnHide) ? 'UNMOUNTED' : 'EXITED', animating: false });
  }

  // ----------------------------------------
  // Lifecycle
  // ----------------------------------------
  componentDidMount() {
    this.updateStatus();
  }

  // tslint:disable-next-line: function-name
  UNSAFE_componentWillReceiveProps(nextProps: TransitionProps) {

    const { status } = this.state;
    const { visible } = nextProps;

    const newStatus = visible
      ? (status === 'UNMOUNTED' && 'EXITED')
      : undefined;

    const newNext = visible
      ? (status !== 'ENTERING' && status !== 'ENTERED' && 'ENTERING')
      : ((status === 'ENTERING' || status === 'ENTERED') && 'EXITING');

    this.nextStatus = newNext as any;
    if (newStatus) this.setState({ status: newStatus });
  }

  componentDidUpdate() {
    this.updateStatus();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  // ----------------------------------------
  // Callback handling
  // ----------------------------------------
  handleStart = () => {
    const { duration } = this.props;
    const status = this.nextStatus!;

    this.nextStatus = null;
    this.setState({ status, animating: true }, () => {
      const durationType = TRANSITION_TYPE[status];
      const durationValue = normalizeTransitionDuration(duration as any, durationType);

      this.props.onStart?.call(null, null, { ...this.props, status });
      this.timeoutId = setTimeout(this.handleComplete, durationValue as any);
    });
  }

  handleComplete = () => {

    const { status: current } = this.state;

    this.props.onComplete?.call(null, null, { ...this.props, status: current });

    if (this.nextStatus) {
      this.handleStart();
      return;
    }

    const { onShow, onHide, unmountOnHide } = this.props;
    const status = (current === 'ENTERING') ? 'ENTERED' : (unmountOnHide ? 'UNMOUNTED' : 'EXITED');

    this.setState({ status, animating: false }, () => (current === 'ENTERING' ? onShow : onHide)?.call(null, null, { ...this.props, status }));
  }

  updateStatus() {

    if (!this.nextStatus) return;

    const { animating, status } = this.state;

    this.nextStatus = (animating) ? (status === 'ENTERING' ? 'EXITING' : 'ENTERING') : (status === 'ENTERED' ? 'EXITING' : 'ENTERING');
    if (!animating) this.handleStart();
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  static _ANIM = ['jiggle', 'flash', 'shake', 'pulse', 'tada', 'bounce', 'glow'];

  render() {

    const { children, duration, animation, directional } = this.props;
    const { status, animating } = this.state;

    if (status === 'UNMOUNTED') return null;
    const type = TRANSITION_TYPE[status];
    const childClasses = (children as any).props?.className;

    const className = (directional ?? !Transition._ANIM.includes(animation as any))
      ? getClassName(animation, childClasses, { animating, in: status === 'ENTERING', out: status === 'EXITING', hidden: status === 'EXITED', visible: status === 'EXITED' }, 'transition')
      : getClassName(animation, childClasses, { 'animating transition': animating });

    const style = { ...(children as any).props?.style, animationDuration: type && `${normalizeTransitionDuration(duration as any, type)}ms` };

    return cloneElement(children as any, { className, style });
  }
}
