import { Ref } from '@stardust-ui/react-component-ref';
import React, { Component, createRef } from 'react';
import { eventStack, getElementType, getUnhandledProps, normalizeOffset, isBrowser } from '../../lib';

export interface VisibilityProps extends StrictVisibilityProps {
  [key: string]: any;
}

export interface StrictVisibilityProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Context which sticky element should stick to. */
  context?: object;

  /**
   * When set to true a callback will occur anytime an element passes a condition not just immediately after the
   * threshold is met.
   */
  continuous?: boolean;

  /** Fires callbacks immediately after mount. */
  fireOnMount?: boolean;

  /**
   * Element's bottom edge has passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassed?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element's bottom edge has not passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassedReverse?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element's bottom edge has passed bottom of screen
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisible?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element's bottom edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisibleReverse?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Value that context should be adjusted in pixels. Useful for making content appear below content fixed to the
   * page.
   */
  offset?: number | string | (number | string)[];

  /** When set to false a callback will occur each time an element passes the threshold for a condition. */
  once?: boolean;

  /** Element is not visible on the screen. */
  onPassed?: VisibilityOnPassed;

  /**
   * Any part of an element is visible on screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassing?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element's top has not passed top of screen but bottom has.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassingReverse?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element is not visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOffScreen?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element is visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOnScreen?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element's top edge has passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassed?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element's top edge has not passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassedReverse?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisible?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element's top edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisibleReverse?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUpdate?: (nothing: null, data: VisibilityEventData) => void;

  /**
   * Allows to choose the mode of the position calculations:
   * - `events` - (default) update and fire callbacks only on scroll/resize events
   * - `repaint` - update and fire callbacks on browser repaint (animation frames)
   */
  updateOn?: 'events' | 'repaint';
}

export interface VisibilityCalculations {
  bottomPassed: boolean;
  bottomVisible: boolean;
  direction: 'down' | 'up';
  fits: boolean;
  height: number;
  passing: boolean;
  percentagePassed: number;
  pixelsPassed: number;
  offScreen: boolean;
  onScreen: boolean;
  topPassed: boolean;
  topVisible: boolean;
  width: number;
}

export interface VisibilityEventData extends VisibilityProps {
  calculations: VisibilityCalculations;
}

export interface VisibilityOnPassed {
  [key: string]: (nothing: null, data: VisibilityEventData) => void;
}

/**
 * Visibility provides a set of callbacks for when a content appears in the viewport.
 */
export class Visibility extends Component<VisibilityProps> {

  static defaultProps = {
    context: isBrowser() ? window : null,
    continuous: false,
    offset: [0, 0],
    once: true,
    updateOn: 'events',
  };

  calculations = {
    bottomPassed: false,
    bottomVisible: false,
    fits: false,
    passing: false,
    offScreen: false,
    onScreen: false,
    topPassed: false,
    topVisible: false,
  };

  firedCallbacks = [];
  ref = createRef();
  mounted = false;
  pageYOffset = 0;
  frameId = 0;

  // ----------------------------------------
  // Lifecycle
  // ----------------------------------------

  // eslint-disable-next-line camelcase
  // tslint:disable-next-line: function-name
  UNSAFE_componentWillReceiveProps({ continuous, once, context, updateOn }: VisibilityProps) {
    const cleanHappened =
      continuous !== this.props.continuous ||
      once !== this.props.once ||
      updateOn !== this.props.updateOn;

    // Heads up! We should clean up array of happened callbacks, if values of these props are changed
    if (cleanHappened) this.firedCallbacks = [];

    if (context !== this.props.context || updateOn !== this.props.updateOn) {
      this.unattachHandlers(this.props.context);
      this.attachHandlers(context, updateOn);
    }
  }

  componentDidMount() {
    this.mounted = true;

    if (!isBrowser()) return;
    const { context, fireOnMount, updateOn } = this.props;

    this.pageYOffset = this.getPageYOffset();
    this.attachHandlers(context, updateOn);

    if (fireOnMount) this.update();
  }

  componentWillUnmount() {
    const { context } = this.props;

    this.unattachHandlers(context);
    this.mounted = false;
  }

  attachHandlers(context: any, updateOn: string) {
    if (updateOn === 'events') {
      if (context) {
        eventStack.sub('resize', this.handleUpdate, { target: context });
        eventStack.sub('scroll', this.handleUpdate, { target: context });
      }

      return;
    }

    // Heads up!
    // We will deal with `repaint` there
    this.handleUpdate();
  }

  unattachHandlers(context: any) {
    if (context) {
      eventStack.unsub('resize', this.handleUpdate, { target: context });
      eventStack.unsub('scroll', this.handleUpdate, { target: context });
    }

    if (this.frameId) cancelAnimationFrame(this.frameId);
  }

  // ----------------------------------------
  // Callback handling
  // ----------------------------------------

  execute(callback: any, name: string) {
    const { continuous } = this.props;
    if (!callback) return;

    // Heads up! When `continuous` is true, callback will be fired always
    if (!continuous && _.includes(this.firedCallbacks, name)) return;

    callback(null, { ...this.props, calculations: this.calculations });
    this.firedCallbacks.push(name);
  }

  fire = ({ callback, name }, value, reverse = false) => {
    const { continuous, once } = this.props;

    // Heads up! For the execution is required:
    // - current value correspond to the fired direction
    // - `continuous` is true or calculation values are different
    const matchesDirection = this.calculations[value] !== reverse;
    const executionPossible = continuous || this.calculations[value] !== this.oldCalculations[value];

    if (matchesDirection && executionPossible) this.execute(callback, name);

    // Heads up! We should remove callback from the happened when it's not `once`
    if (!once) this.firedCallbacks = _.without(this.firedCallbacks, name);
  }

  fireOnPassed() {
    const { percentagePassed, pixelsPassed } = this.calculations;
    const { onPassed } = this.props;

    _.forEach(onPassed, (callback, passed) => {
      const pixelsValue = Number(passed);

      if (pixelsValue && pixelsPassed >= pixelsValue) {
        this.execute(callback, passed);
        return;
      }

      const matchPercentage = `${passed}`.match(/^(\d+)%$/);
      if (!matchPercentage) return;

      const percentageValue = Number(matchPercentage[1]) / 100;
      if (percentagePassed >= percentageValue) this.execute(callback, passed);
    });
  }

  handleUpdate = () => {
    if (this.ticking) return;

    this.ticking = true;
    this.frameId = requestAnimationFrame(this.update);
  }

  update = () => {
    if (!this.mounted) return;

    this.ticking = false;

    this.oldCalculations = this.calculations;
    this.calculations = this.computeCalculations();
    this.pageYOffset = this.getPageYOffset();

    const {
      onBottomPassed,
      onBottomPassedReverse,
      onBottomVisible,
      onBottomVisibleReverse,
      onPassing,
      onPassingReverse,
      onTopPassed,
      onTopPassedReverse,
      onTopVisible,
      onTopVisibleReverse,
      onOffScreen,
      onOnScreen,
      updateOn,
    } = this.props;
    const forward = {
      bottomPassed: { callback: onBottomPassed, name: 'onBottomPassed' },
      bottomVisible: { callback: onBottomVisible, name: 'onBottomVisible' },
      passing: { callback: onPassing, name: 'onPassing' },
      offScreen: { callback: onOffScreen, name: 'onOffScreen' },
      onScreen: { callback: onOnScreen, name: 'onOnScreen' },
      topPassed: { callback: onTopPassed, name: 'onTopPassed' },
      topVisible: { callback: onTopVisible, name: 'onTopVisible' },
    };

    const reverse = {
      bottomPassed: { callback: onBottomPassedReverse, name: 'onBottomPassedReverse' },
      bottomVisible: { callback: onBottomVisibleReverse, name: 'onBottomVisibleReverse' },
      passing: { callback: onPassingReverse, name: 'onPassingReverse' },
      topPassed: { callback: onTopPassedReverse, name: 'onTopPassedReverse' },
      topVisible: { callback: onTopVisibleReverse, name: 'onTopVisibleReverse' },
    };

    _.invoke(this.props, 'onUpdate', null, { ...this.props, calculations: this.calculations });
    this.fireOnPassed();

    // Heads up! Reverse callbacks should be fired first
    _.forEach(reverse, (data, value) => this.fire(data, value, true));
    _.forEach(forward, (data, value) => this.fire(data, value));

    if (updateOn === 'repaint') this.handleUpdate();
  }

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  computeCalculations() {
    const { offset } = this.props;
    const { bottom, height, top, width } = this.ref.current.getBoundingClientRect();
    const [topOffset, bottomOffset] = normalizeOffset(offset);

    const newOffset = this.getPageYOffset();
    const direction = newOffset > this.pageYOffset ? 'down' : 'up';
    const topPassed = top < topOffset;
    const bottomPassed = bottom < bottomOffset;

    const pixelsPassed = bottomPassed ? 0 : Math.max(top * -1, 0);
    const percentagePassed = pixelsPassed / height;

    const bottomVisible = bottom >= bottomOffset && bottom <= window.innerHeight;
    const topVisible = top >= topOffset && top <= window.innerHeight;

    const fits = topVisible && bottomVisible;
    const passing = topPassed && !bottomPassed;

    const onScreen = (topVisible || topPassed) && !bottomPassed;
    const offScreen = !onScreen;

    return {
      bottomPassed,
      bottomVisible,
      direction,
      fits,
      height,
      passing,
      percentagePassed,
      pixelsPassed,
      offScreen,
      onScreen,
      topPassed,
      topVisible,
      width,
    };
  }

  getPageYOffset() {
    const { context } = this.props;

    if (context) {
      // Heads up! `window` doesn't have `pageYOffset` property
      return context === window ? window.pageYOffset : context.scrollTop;
    }

    return 0;
  }

  // ----------------------------------------
  // Render
  // ----------------------------------------

  render() {

    const { as: ElementType = 'div', children } = this.props;

    const rest = getUnhandledProps(Visibility, this.props);

    return (
      <Ref innerRef={this.ref}>
        <ElementType {...rest}>{children}</ElementType>
      </Ref>
    );
  }
}
