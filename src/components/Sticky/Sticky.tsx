import React, { Component, createRef } from 'react';
import { isBrowser, getClassName } from '../../lib';
import { isRefObject } from '../Ref';
import { eventStack } from '../EventStack';

export interface StickyProps extends StrictStickyProps {
  [key: string]: any;
}

export interface StrictStickyProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A Sticky can be active. */
  active?: boolean;

  /** Offset in pixels from the bottom of the screen when fixing element to viewport. */
  bottomOffset?: number;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Context which sticky element should stick to. */
  context?: object | React.Ref<HTMLElement>;

  /** Offset in pixels from the top of the screen when fixing element to viewport. */
  offset?: number;

  /**
   * Callback when element is bound to bottom of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBottom?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void;

  /**
   * Callback when element is fixed to page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onStick?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void;

  /**
   * Callback when element is bound to top of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onTop?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void;

  /**
   * Callback when element is unfixed from page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onUnstick?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void;

  /** Whether element should be "pushed" by the viewport, attaching to the bottom of the screen when scrolling up. */
  pushing?: boolean;

  /** Context which sticky should attach onscroll events. */
  scrollContext?: object | React.Ref<HTMLElement>;

  /** Custom style for sticky element. */
  styleElement?: object;
}

interface StickyState {
  active: boolean;
  sticky: boolean;
  pushing: boolean;
  bound: boolean;
  bottom: number | null;
  top: number | null;
}

/**
 * Sticky content stays fixed to the browser viewport while another column of content is visible on the page.
 */
export class Sticky extends Component<StickyProps, StickyState> {

  static propTypes: any;

  static defaultProps = {
    active: true,
    bottomOffset: 0,
    offset: 0,
    scrollContext: isBrowser() ? window : null,
  };

  state = {
    active: true,
    sticky: false,
    pushing: false,
    bound: false,
    top: null,
    bottom: null,
  };

  stickyRef = createRef<any>();
  triggerRef = createRef<any>();
  ticking!: boolean;
  contextRect!: ClientRect;
  triggerRect!: ClientRect;
  stickyRect!: ClientRect;
  frameId!: number;

  componentDidMount() {
    if (!isBrowser()) return;
    const { active } = this.state;

    if (active) {
      this.handleUpdate();
      this.addListeners(this.props.scrollContext);
    }
  }

  static getDerivedStateFromProps(props: StickyProps, state: StickyState) {

    if (state.active !== props.active && !props.active) {
      return { active: props.active, sticky: false };
    }

    return { active: props.active };
  }

  componentDidUpdate(prevProps: StickyProps, prevState: StickyState) {

    if (prevState.active === this.state.active) {
      if (prevProps.scrollContext !== this.props.scrollContext) {
        this.removeListeners(prevProps.scrollContext);
        this.addListeners(this.props.scrollContext);
      }

      return;
    }

    if (this.state.active) {
      this.handleUpdate();
      this.addListeners(this.props.scrollContext);
      return;
    }

    this.removeListeners(prevProps.scrollContext);
  }

  componentWillUnmount() {

    if (!isBrowser() || !this.state.active) return;

    this.removeListeners(this.props.scrollContext);
    cancelAnimationFrame(this.frameId);
  }

  // ----------------------------------------
  // Events
  // ----------------------------------------

  addListeners = (scrollContext: any) => {

    const scrollContextNode = isRefObject(scrollContext) ? (scrollContext as React.MutableRefObject<any>).current : scrollContext;

    if (scrollContextNode) {
      eventStack.sub('resize', this.handleUpdate, { target: scrollContextNode });
      eventStack.sub('scroll', this.handleUpdate, { target: scrollContextNode });
    }
  }

  removeListeners = (scrollContext: any) => {

    const scrollContextNode = isRefObject(scrollContext) ? (scrollContext as React.MutableRefObject<any>).current : scrollContext;

    if (scrollContextNode) {
      eventStack.unsub('resize', this.handleUpdate, { target: scrollContextNode });
      eventStack.unsub('scroll', this.handleUpdate, { target: scrollContextNode });
    }
  }

  // ----------------------------------------
  // Handlers
  // ----------------------------------------

  update = (e?: any) => {

    const { pushing } = this.state;

    this.ticking = false;
    this.assignRects();

    if (pushing) {
      if (this.didReachStartingPoint()) return this.stickToContextTop(e);
      if (this.didTouchScreenBottom()) return this.stickToScreenBottom(e);
      return this.stickToContextBottom(e);
    }

    if (this.isOversized()) {
      if (this.contextRect.top > 0) return this.stickToContextTop(e);
      if (this.contextRect.bottom < window.innerHeight) return this.stickToContextBottom(e);
    }

    if (this.didTouchScreenTop()) {
      if (this.didReachContextBottom()) return this.stickToContextBottom(e);
      return this.stickToScreenTop(e);
    }

    return this.stickToContextTop(e);
  }

  handleUpdate = (e?: any) => {
    if (!this.ticking) {
      this.ticking = true;
      this.frameId = requestAnimationFrame(() => this.update(e));
    }
  }

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  assignRects = () => {
    const { context } = this.props;
    const contextNode = isRefObject(context) ? (context as React.MutableRefObject<any>).current : context || document.body;

    this.triggerRect = this.triggerRef.current.getBoundingClientRect();
    this.contextRect = contextNode.getBoundingClientRect();
    this.stickyRect = this.stickyRef.current.getBoundingClientRect();
  }

  computeStyle() {
    const { styleElement } = this.props;
    const { bottom, bound, sticky, top } = this.state;

    if (!sticky) return styleElement;
    return {
      bottom: bound ? 0 : bottom,
      top: bound ? undefined : top,
      width: this.triggerRect.width,
      ...styleElement,
    };
  }

  // Return true when the component reached the bottom of the context
  didReachContextBottom = () => {
    const { offset } = this.props;

    return this.stickyRect.height + offset! >= this.contextRect.bottom;
  }

  // Return true when the component reached the starting point
  didReachStartingPoint = () => this.stickyRect.top <= this.triggerRect.top;

  // Return true when the top of the screen overpasses the Sticky component
  didTouchScreenTop = () => this.triggerRect.top < this.props.offset!;

  // Return true when the bottom of the screen overpasses the Sticky component
  didTouchScreenBottom = () => {
    const { bottomOffset } = this.props;

    return this.contextRect.bottom + bottomOffset! > window.innerHeight;
  }

  // Return true if the height of the component is higher than the window
  isOversized = () => this.stickyRect.height > window.innerHeight;

  // ----------------------------------------
  // Stick helpers
  // ----------------------------------------

  // If true, the component will stick to the bottom of the screen instead of the top
  pushing = (pushing: boolean) => {
    const { pushing: possible } = this.props;

    if (possible) this.setState({ pushing });
  }

  stick = (e: any, bound: boolean) => {
    this.setState({ bound, sticky: true });
    this.props.onStick?.call(null, e, this.props);
  }

  unstick = (e: any, bound: boolean) => {
    this.setState({ bound, sticky: false });
    this.props.onUnstick?.call(null, e, this.props);
  }

  stickToContextBottom = (e?: any) => {
    this.props.onBottom?.call(null, e, this.props);

    this.stick(e, true);
    this.pushing(true);
  }

  stickToContextTop = (e?: any) => {
    this.props.onTop?.call(null, e, this.props);

    this.unstick(e, false);
    this.pushing(false);
  }

  stickToScreenBottom = (e?: any) => {
    const { bottomOffset: bottom } = this.props;

    this.stick(e, false);
    this.setState({ bottom: bottom!, top: null });
  }

  stickToScreenTop = (e?: any) => {
    const { offset: top } = this.props;

    this.stick(e, false);
    this.setState({ top: top!, bottom: null });
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {

    const { as: ElementType = 'div', children, className, rest } = getProps(this.props);
    const { bottom, bound, sticky } = this.state;

    const containerClasses = getClassName(sticky && 'ui' as any, sticky && 'stuck-container' as any, sticky && (bound ? 'bound-container' : 'fixed-container') as any, className);
    const elementClasses = getClassName('ui', sticky && (bound ? 'bound bottom' : 'fixed') as any, sticky && !bound && (bottom === null ? 'top' : 'bottom') as any, 'sticky');
    const triggerStyles = sticky && this.stickyRect ? { height: this.stickyRect.height } : {};

    return (
      <ElementType {...rest} className={containerClasses}>
        <div ref={this.triggerRef} style={triggerStyles} />
        <div className={elementClasses} ref={this.stickyRef} style={this.computeStyle()}>
          {children}
        </div>
      </ElementType>
    );
  }
}

// tslint:disable-next-line: triple-equals
// const isRefObject = (v: any) => v != null && typeof v == 'object' && Object.prototype.hasOwnProperty.call(v, 'current');

const getProps = (props: StickyProps) => {

  const { as, active, bottomOffset, children, className, context, offset, onBottom, onStick, onTop, onUnstick, pushing, scrollContext, styleElement, ...rest } = { ...Sticky.defaultProps, ...props };

  // tslint:disable-next-line: object-shorthand-properties-first
  return { as: ((!as && (rest as any).href) ? 'a' : as), children, className, rest };
};
