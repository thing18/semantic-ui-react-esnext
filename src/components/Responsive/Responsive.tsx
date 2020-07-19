import React, { Component } from 'react';

import { isBrowser, eventStack } from '../../lib';
import { isVisible } from './lib/isVisible';

export interface ResponsiveProps extends StrictResponsiveProps {
  [key: string]: any;
}

export interface StrictResponsiveProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Fires callbacks immediately after mount. */
  fireOnMount?: boolean;

  /**
   * Called to get width of screen. Defaults to using `window.innerWidth` when in a browser;
   * otherwise, assumes a width of 0.
   */
  getWidth?: () => number;

  /** The maximum width at which content will be displayed. */
  maxWidth?: number | string;

  /** The minimum width at which content will be displayed. */
  minWidth?: number | string;

  /**
   * Called on update.
   *
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onUpdate?: (event: React.SyntheticEvent<HTMLElement>, data: ResponsiveOnUpdateData) => void;
}

export interface ResponsiveOnUpdateData extends ResponsiveProps {
  width: number;
}

export interface ResponsiveWidthShorthand {
  minWidth?: number | string;
  maxWidth?: number | string;
}

interface ResponsiveState {
  visible: boolean;
}

/**
 * Responsive can control visibility of content.
 */
export class Responsive extends Component<ResponsiveProps, ResponsiveState> {

  static propTypes: any;

  static defaultProps = {
    getWidth: () => (isBrowser() ? window.innerWidth : 0),
  };

  static onlyMobile = { minWidth: 320, maxWidth: 767 };
  static onlyTablet = { minWidth: 768, maxWidth: 991 };
  static onlyComputer = { minWidth: 992 };
  static onlyLargeScreen = { minWidth: 1200, maxWidth: 1919 };
  static onlyWidescreen = { minWidth: 1920 };

  state = {
    visible: true,
  };
  frameId!: number;
  ticking!: boolean;

  static getDerivedStateFromProps(props: ResponsiveProps) {

    const width = props.getWidth?.call(null)!;
    const visible = isVisible(width, props);

    return { visible };
  }

  componentDidMount() {

    const { fireOnMount } = this.props;

    eventStack.sub('resize', this.handleResize, { target: 'window' });
    if (fireOnMount) this.handleUpdate();
  }

  componentWillUnmount() {
    eventStack.unsub('resize', this.handleResize, { target: 'window' });
    cancelAnimationFrame(this.frameId);
  }

  // ----------------------------------------
  // Event handlers
  // ----------------------------------------

  handleResize = (e?: any) => {
    if (this.ticking) return;

    this.ticking = true;
    this.frameId = requestAnimationFrame(() => this.handleUpdate(e));
  }

  handleUpdate = (e?: any) => {
    this.ticking = false;

    const { visible } = this.state;
    const width = this.props.getWidth?.call(null)!;
    const nextVisible = isVisible(width, this.props);

    if (visible !== nextVisible) this.setState({ visible: nextVisible });
    this.props.onUpdate?.call(null, e, { ...this.props, width });
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {

    const { as: ElementType, children, rest } = renderProps(this.props);
    const { visible } = this.state;

    if (visible) return <ElementType {...rest}>{children}</ElementType>;
    return null;
  }
}

const renderProps = ({ as = 'div', children, fireOnMount, getWidth, maxWidth, minWidth, onUpdate, ...rest }: ResponsiveProps) => ({ as, children, rest });
