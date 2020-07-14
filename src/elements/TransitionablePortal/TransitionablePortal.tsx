import React, { Component } from 'react';

import { TransitionEventData, TransitionProps, Transition } from '..';
import { PortalProps, Portal } from '../../addons/Portal';

export interface TransitionablePortalProps extends StrictTransitionablePortalProps {
  [key: string]: any;
}

export interface StrictTransitionablePortalProps {
  /** Primary content. */
  children: React.ReactNode;

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onClose?: (nothing: null, data: PortalProps & TransitionablePortalState) => void;

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onHide?: (nothing: null, data: TransitionEventData & TransitionablePortalState) => void;

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onOpen?: (nothing: null, data: PortalProps & TransitionablePortalState) => void;

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onStart?: (nothing: null, data: TransitionEventData & TransitionablePortalState) => void;

  /** Controls whether or not the portal is displayed. */
  open?: boolean;

  /** Transition props. */
  transition?: TransitionProps;
}

interface TransitionablePortalState {
  portalOpen: boolean | -1;
  transitionVisible: boolean;
}

/**
 * A sugar for `Portal` and `Transition`.
 * @see Portal
 * @see Transition
 */
export class TransitionablePortal extends Component<TransitionablePortalProps, TransitionablePortalState> {

  static propTypes: any;

  static defaultProps = {
    transition: {
      animation: 'scale',
      duration: 400,
    },
  };

  state = {} as any;

  // ----------------------------------------
  // Lifecycle
  // ----------------------------------------

  static getDerivedStateFromProps(props: TransitionablePortalProps, state: TransitionablePortalState) {
    // This is definitely a hack :(
    //
    // It's coupled with handlePortalClose() for force set the state of `portalOpen` omitting
    // props.open. It's related to implementation of the component itself as `onClose()` will be
    // called after a transition will end.
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/2382
    if (state.portalOpen === -1) {
      return { portalOpen: false };
    }

    if (props.open == null) {
      return null;
    }

    return { portalOpen: props.open };
  }

  // ----------------------------------------
  // Callback handling
  // ----------------------------------------

  handlePortalClose = () => this.setState({ portalOpen: -1 });

  handlePortalOpen = () => this.setState({ portalOpen: true });

  handleTransitionHide = (_e: any, data: any) => {

    const { portalOpen } = this.state;

    this.setState({ transitionVisible: false });
    this.props.onClose?.call(null, null, { ...data, portalOpen: false, transitionVisible: false });
    this.props.onHide?.call(null, null, { ...data, portalOpen, transitionVisible: false });
  }

  handleTransitionStart = (_e: any, data: any) => {

    const { portalOpen } = this.state;
    const { status } = data;
    const transitionVisible = status === 'ENTERING';

    this.props.onStart?.call(null, null, { ...data, portalOpen, transitionVisible });

    // Heads up! TransitionablePortal fires onOpen callback on the start of transition animation
    if (!transitionVisible) return;

    this.setState({ transitionVisible });
    this.props.onOpen?.call(null, null, { ...data, transitionVisible, portalOpen: true });
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {

    const { children, transition, rest } = renderProps(this.props);
    const { portalOpen, transitionVisible } = this.state;

    const open = portalOpen || transitionVisible;

    return (
      <Portal {...rest} open={open} onOpen={this.handlePortalOpen} onClose={this.handlePortalClose}>
        <Transition
          {...transition}
          transitionOnMount
          onStart={this.handleTransitionStart}
          onHide={this.handleTransitionHide}
          visible={portalOpen}
        >
          {children}
        </Transition>
      </Portal>
    );
  }
}

const renderProps = ({ open, children, transition, onClose, onHide, onOpen, onStart, ...rest }: TransitionablePortalProps) => ({ children, transition, rest });
