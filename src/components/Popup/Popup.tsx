import React, { Component, createRef, Children } from 'react';
import { Popper } from 'react-popper';
import shallowEqual from 'shallowequal';

import { SemanticShorthandItem, getClassName, Use } from '../../lib';
import { StrictPortalProps, Portal, PortalProps } from '../Portal';
import { Ref } from '../Ref';
import { EventStack, eventStack } from '../EventStack';
import { PopupContent, PopupContentProps } from './PopupContent';
import { PopupHeader, PopupHeaderProps } from './PopupHeader';
import { placementMapping, positionsMapping } from './lib/positions';
import { createReferenceProxy } from './lib/createReferenceProxy';

export interface PopupProps extends StrictPopupProps {
  [key: string]: any;
}

export interface StrictPopupProps extends StrictPortalProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Display the popup without the pointing arrow */
  basic?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Simple text content for the popover. */
  content?: SemanticShorthandItem<PopupContentProps>;

  /** Existing element the pop-up should be bound to. */
  context?: object | React.RefObject<HTMLElement>;

  /** A disabled popup only renders its trigger. */
  disabled?: boolean;

  /** A flowing Popup has no maximum width and continues to flow to fit its content. */
  flowing?: boolean;

  /** Header displayed above the content in bold. */
  header?: SemanticShorthandItem<PopupHeaderProps>;

  /** Hide the Popup when scrolling the window. */
  hideOnScroll?: boolean;

  /** Whether the popup should not close on hover. */
  hoverable?: boolean;

  /** Invert the colors of the popup */
  inverted?: boolean;

  /** Offset values in px unit to apply to rendered popup. The basic offset accepts an
   * array with two numbers in the form [skidding, distance].
   *
   * The first number, skidding, displaces the popper along the reference element.
   *
   * The second number, distance, displaces the popper away from, or toward, the
   * reference element in the direction of its placement. A positive number displaces
   * it further away, while a negative number lets it overlap the reference.
   */
  offset?: number | string;

  /** Events triggering the popup. */
  on?: 'hover' | 'click' | 'focus' | ('hover' | 'click' | 'focus')[];

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose?: (event: React.MouseEvent<HTMLElement>, data: PopupProps) => void;

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount?: (nothing: null, data: PopupProps) => void;

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>, data: PopupProps) => void;

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount?: (nothing: null, data: PopupProps) => void;

  /** Disables automatic repositioning of the component, it will always be placed according to the position value. */
  pinned?: boolean;

  /** Position for the popover. */
  position?:
  | 'top left'
  | 'top right'
  | 'bottom right'
  | 'bottom left'
  | 'right center'
  | 'left center'
  | 'top center'
  | 'bottom center';

  /** Tells `Popper.js` to use the `position: fixed` strategy to position the popover. */
  positionFixed?: boolean;

  /** An array containing custom settings for the Popper.js modifiers. */
  popperModifiers?: any[];

  /** A popup can have dependencies which update will schedule a position update. */
  popperDependencies?: any[];

  /** Popup size. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'huge';

  /** Custom Popup style. */
  style?: Object;

  /** Element to be rendered in-place where the popup is defined. */
  trigger?: React.ReactNode;

  /** Popup width. */
  wide?: boolean | 'very';
}

interface PopupState {

  closed: boolean;
  disabled: boolean;
  contentRestProps: any;
  portalRestProps: any;
}

/**
 * A Popup displays additional information on top of a page.
 */
export class Popup extends Component<PopupProps, PopupState> {

  static propTypes: any;

  static defaultProps = { disabled: false, offset: [0, 0], on: ['click', 'hover'], pinned: false, position: 'top left' };

  static Content = PopupContent;
  static Header = PopupHeader;

  state: PopupState = {} as any;

  open = false;
  triggerRef = createRef();
  timeoutId!: NodeJS.Timeout;
  positionUpdate!: any;

  static PortalProps = [
    'children', 'closeOnDocumentClick', 'closeOnEscape', 'closeOnPortalMouseLeave', 'closeOnTriggerBlur', 'closeOnTriggerClick',
    'closeOnTriggerMouseLeave', 'defaultOpen', 'eventPool', 'mountNode', 'mouseEnterDelay', 'mouseLeaveDelay', 'onClose', 'onMount',
    'onOpen', 'onUnmount', 'open', 'openOnTriggerClick', 'openOnTriggerFocus', 'openOnTriggerMouseEnter', 'trigger', 'triggerRef',
  ];

  static PopupProps = [
    'as', 'basic', 'children', 'className', 'content', 'context', 'disabled', 'flowing', 'header', 'hideOnScroll', 'hoverable', 'inverted',
    'offset', 'on', 'onClose', 'onMount', 'onOpen', 'onUnmount', 'pinned', 'positionFixed', 'popperModifiers', 'popperDependencies', 'size',
    'style', 'trigger', 'wide',
  ];

  static getDerivedStateFromProps(props: PopupProps, state: PopupState) {

    if (state.closed || state.disabled) return {};

    const unhandledProps = Object.keys(props).filter(x => !Popup.PopupProps.includes(x));
    return unhandledProps.reduce(
      (acc, key) => {
        if (Popup.PortalProps.includes(key)) {
          acc.portalRestProps[key] = props[key];
        } else {
          acc.contentRestProps[key] = props[key];
        }

        return acc;
      },
      { contentRestProps: {}, portalRestProps: {} } as any,
    );
  }

  componentDidUpdate(prevProps: PopupProps) {
    const depsEqual = shallowEqual(this.props.popperDependencies, prevProps.popperDependencies);

    if (!depsEqual) {
      this.handleUpdate();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  hideOnScroll = (e: any) => {

    this.setState({ closed: true });

    eventStack.unsub('scroll', this.hideOnScroll, { target: window });
    this.timeoutId = setTimeout(() => this.setState({ closed: false }), 50);

    this.handleClose(e);
  }

  handleClose = (e: any) => this.props.onClose?.call(null, e, this.props);

  handleOpen = (e: any) => this.props.onOpen?.call(null, e, this.props);

  handlePortalMount = (e: any) => this.props.onMount?.call(null, e, this.props);

  handlePortalUnmount = (e: any) => {

    this.positionUpdate = null;
    this.props.onUnmount?.call(null, e, this.props);
  }

  handleUpdate() {
    if (this.positionUpdate) this.positionUpdate();
  }

  renderContent = ({ placement: popperPlacement, ref: popperRef, scheduleUpdate, style: popperStyle }: any) => {

    const { as: ElementType = 'div', basic, children, className, content, hideOnScroll, flowing, header, inverted, size, style, wide } = this.props;
    const { contentRestProps } = this.state;

    this.positionUpdate = scheduleUpdate;

    const classes = getClassName('ui', placementMapping[popperPlacement], size, [Use.KeyOrValueKey, { wide }], { basic, flowing, inverted }, 'popup transition visible', className);

    const styles = {
      // Heads up! We need default styles to get working correctly `flowing`
      left: 'auto',
      right: 'auto',
      ...popperStyle,
      ...style,
    };

    return (
      <Ref innerRef={popperRef}>
        <ElementType {...contentRestProps} className={classes} style={styles}>
          {!Children.count(children)
            ? (
              <React.Fragment>
                {PopupHeader.create(header, { autoGenerateKey: false })}
                {PopupContent.create(content, { autoGenerateKey: false })}
              </React.Fragment>
            )
            : (
              children
            )}
          {hideOnScroll && <EventStack on={this.hideOnScroll} name='scroll' target='window' />}
        </ElementType>
      </Ref>
    );
  }

  render() {
    const { context, disabled, offset, pinned, popperModifiers, position, positionFixed, trigger } = this.props;
    const { closed, portalRestProps } = this.state;

    if (closed || disabled) return trigger;

    const defaultModifiers = [
      { name: 'arrow', enabled: false },
      { name: 'flip', enabled: !pinned },
      { name: 'preventOverflow', enabled: !!offset },
      { name: 'offset', options: { offset } },
    ];

    const modifiers = popperModifiers
      ? defaultModifiers.reduce((acc, val) => { if (!acc.find(x => x.name === val.name)) acc.push(val); return acc; }, popperModifiers)  // _.unionBy(popperModifiers, defaultModifiers, 'name')
      : defaultModifiers;

    const referenceElement = createReferenceProxy(context == null ? this.triggerRef : context);

    const mergedPortalProps = { ...getPortalProps(this.props), ...portalRestProps };

    return (
      <Portal
        {...mergedPortalProps}
        onClose={this.handleClose}
        onMount={this.handlePortalMount}
        onOpen={this.handleOpen}
        onUnmount={this.handlePortalUnmount}
        trigger={trigger}
        triggerRef={this.triggerRef}
      >
        <Popper
          modifiers={modifiers}
          placement={positionsMapping[position!] as any}
          strategy={positionFixed ? 'fixed' : undefined}
          referenceElement={referenceElement}
        >
          {this.renderContent}
        </Popper>
      </Portal>
    );
  }
}

const getPortalProps = ({ on, hoverable }: PopupProps) => {

  const portalProps: PortalProps = {} as any;

  const normalizedOn = Array.isArray(on) ? on : [on];

  if (hoverable) {
    portalProps.closeOnPortalMouseLeave = true;
    portalProps.mouseLeaveDelay = 300;
  }
  if (normalizedOn.includes('hover')) {
    portalProps.openOnTriggerClick = false;
    portalProps.closeOnTriggerClick = false;
    portalProps.openOnTriggerMouseEnter = true;
    portalProps.closeOnTriggerMouseLeave = true;
    // Taken from SUI: https://git.io/vPmCm
    portalProps.mouseLeaveDelay = 70;
    portalProps.mouseEnterDelay = 50;
  }
  if (normalizedOn.includes('click')) {
    portalProps.openOnTriggerClick = true;
    portalProps.closeOnTriggerClick = true;
    portalProps.closeOnDocumentClick = true;
  }
  if (normalizedOn.includes('focus')) {
    portalProps.openOnTriggerFocus = true;
    portalProps.closeOnTriggerBlur = true;
  }

  return portalProps;
};
