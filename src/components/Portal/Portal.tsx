import keyboardKey from 'keyboard-key';
import React, { cloneElement, createRef, Fragment, PureComponent } from 'react';

import { doesNodeContainClick } from '../../lib';
import { EventStack } from '../EventStack';
import { handleRef, Ref } from '../Ref';
import { PortalInner } from './PortalInner';
import { validateTrigger } from './lib/validateTrigger';

export interface PortalProps extends StrictPortalProps {
  [key: string]: any;
}

export interface StrictPortalProps {
  /** Primary content. */
  children?: React.ReactNode;

  /** Controls whether or not the portal should close on a click outside. */
  closeOnDocumentClick?: boolean;

  /** Controls whether or not the portal should close when escape is pressed is displayed. */
  closeOnEscape?: boolean;

  /**
   * Controls whether or not the portal should close when mousing out of the portal.
   * NOTE: This will prevent `closeOnTriggerMouseLeave` when mousing over the
   * gap from the trigger to the portal.
   */
  closeOnPortalMouseLeave?: boolean;

  /** Controls whether or not the portal should close on blur of the trigger. */
  closeOnTriggerBlur?: boolean;

  /** Controls whether or not the portal should close on click of the trigger. */
  closeOnTriggerClick?: boolean;

  /** Controls whether or not the portal should close when mousing out of the trigger. */
  closeOnTriggerMouseLeave?: boolean;

  /** Initial value of open. */
  defaultOpen?: boolean;

  /** Event pool namespace that is used to handle component events. */
  eventPool?: string;

  /** The node where the portal should mount. */
  mountNode?: any;

  /** Milliseconds to wait before opening on mouse over */
  mouseEnterDelay?: number;

  /** Milliseconds to wait before closing on mouse leave */
  mouseLeaveDelay?: number;

  /**
   * Called when a close event happens
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose?: (event: React.MouseEvent<HTMLElement>, data: PortalProps) => void;

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount?: (nothing: null, data: PortalProps) => void;

  /**
   * Called when an open event happens
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>, data: PortalProps) => void;

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount?: (nothing: null, data: PortalProps) => void;

  /** Controls whether or not the portal is displayed. */
  open?: boolean;

  /** Controls whether or not the portal should open when the trigger is clicked. */
  openOnTriggerClick?: boolean;

  /** Controls whether or not the portal should open on focus of the trigger. */
  openOnTriggerFocus?: boolean;

  /** Controls whether or not the portal should open when mousing over the trigger. */
  openOnTriggerMouseEnter?: boolean;

  /** Element to be rendered in-place where the portal is defined. */
  trigger?: React.ReactNode;

  /** Called with a ref to the trigger node. */
  triggerRef?: React.Ref<any>;
}

interface PortalState {
  open: boolean;
}

/**
 * A component that allows you to render children outside their parent.
 * @see Modal
 * @see Popup
 * @see Dimmer
 * @see Confirm
 */

export class Portal extends PureComponent<PortalProps, PortalState> {

  static propTypes: any;

  static defaultProps = {
    closeOnDocumentClick: true,
    closeOnEscape: true,
    eventPool: 'default',
    openOnTriggerClick: true,
  };

  static Inner = PortalInner;

  contentRef = createRef<HTMLElement>();
  triggerRef = createRef<HTMLElement>();
  latestDocumentMouseDownEvent = null;
  mouseEnterTimer: any;
  mouseLeaveTimer: any;
  triggerEvents: any;

  constructor(props: PortalProps, context: any) {
    super(props, context);

    this.state = { open: props.open ?? props.defaultOpen } as any;

    this.triggerEvents = {
      onBlur: (e: any, ...rest: any[]) => {
        const { trigger, closeOnTriggerBlur } = this.props;

        // Call original event handler
        (trigger as any)?.props?.onBlur?.call(null, e, ...rest);

        // IE 11 doesn't work with relatedTarget in blur events
        const target = e.relatedTarget || document.activeElement;
        // do not close if focus is given to the portal
        const didFocusPortal = this.contentRef.current?.contains?.call(null, target);

        if (!closeOnTriggerBlur || didFocusPortal) return;

        this.close(e);
      },
      onClick: (e: any, ...rest: any[]) => {

        const { trigger, closeOnTriggerClick, openOnTriggerClick } = this.props;
        const { open } = this.state;

        // Call original event handler
        (trigger as any)?.props.onClick?.call(null, e, ...rest);

        if (open && closeOnTriggerClick) {
          this.close(e);
        } else if (!open && openOnTriggerClick) {
          this.open(e);
        }
      },
      onFocus: (e: any, ...rest: any[]) => {
        const { trigger, openOnTriggerFocus } = this.props;

        // Call original event handler
        (trigger as any)?.props.onFocus?.call(null, e, ...rest);

        if (!openOnTriggerFocus) return;

        this.open(e);
      },
      onMouseLeave: (e: any, ...rest: any[]) => {

        clearTimeout(this.mouseEnterTimer);

        const { trigger, closeOnTriggerMouseLeave, mouseLeaveDelay } = this.props;

        // Call original event handler
        (trigger as any)?.props.onMouseLeave?.call(null, e, ...rest);

        if (!closeOnTriggerMouseLeave) return;

        this.mouseLeaveTimer = this.closeWithTimeout(e, mouseLeaveDelay);
      },
      onMouseEnter: (e: any, ...rest: any[]) => {
        clearTimeout(this.mouseLeaveTimer);

        const { trigger, mouseEnterDelay, openOnTriggerMouseEnter } = this.props;

        // Call original event handler
        (trigger as any)?.props.onMouseEnter?.call(null, e, ...rest);

        if (!openOnTriggerMouseEnter) return;

        this.mouseEnterTimer = this.openWithTimeout(e, mouseEnterDelay);
      },
    };
  }

  static getDerivedStateFromProps({ open }: PortalProps) {

    return open != null ? { open } : null;
  }

  componentWillUnmount() {
    // Clean up timers
    clearTimeout(this.mouseEnterTimer);
    clearTimeout(this.mouseLeaveTimer);
  }

  // ----------------------------------------
  // Document Event Handlers
  // ----------------------------------------

  handleDocumentMouseDown = (e: any) => this.latestDocumentMouseDownEvent = e;

  handleDocumentClick = (e: any) => {
    const { closeOnDocumentClick } = this.props;

    const currentMouseDownEvent = this.latestDocumentMouseDownEvent;
    this.latestDocumentMouseDownEvent = null;

    if (
      !this.contentRef.current || // no portal
      doesNodeContainClick(this.triggerRef.current!, e) || // event happened in trigger (delegate to trigger handlers)
      (currentMouseDownEvent &&
        doesNodeContainClick(this.contentRef.current!, currentMouseDownEvent)) || // event originated in the portal but was ended outside
      doesNodeContainClick(this.contentRef.current!, e) // event happened in the portal
    ) {
      return;
    } // ignore the click

    if (closeOnDocumentClick) {
      this.close(e);
    }
  }

  handleEscape = (e: any) => {
    if (!this.props.closeOnEscape) return;
    if (keyboardKey.getCode(e) !== keyboardKey.Escape) return;
    this.close(e);
  }

  // ----------------------------------------
  // Component Event Handlers
  // ----------------------------------------

  handlePortalMouseLeave = (e: any) => {
    const { closeOnPortalMouseLeave, mouseLeaveDelay } = this.props;

    if (!closeOnPortalMouseLeave) return;

    // Do not close the portal when 'mouseleave' is triggered by children
    if (e.target !== this.contentRef.current) return;

    this.mouseLeaveTimer = this.closeWithTimeout(e, mouseLeaveDelay);
  }

  handlePortalMouseEnter = () => {
    // In order to enable mousing from the trigger to the portal, we need to
    // clear the mouseleave timer that was set when leaving the trigger.
    const { closeOnPortalMouseLeave } = this.props;

    if (!closeOnPortalMouseLeave) return;

    clearTimeout(this.mouseLeaveTimer);
  }

  // ----------------------------------------
  // Behavior
  // ----------------------------------------

  open = (e: any) => {

    this.props.onOpen?.call(null, e, this.props);

    this.setState({ open: true });
  }

  openWithTimeout = (e: any, delay?: number) => {

    // React wipes the entire event object and suggests using e.persist() if
    // you need the event for async access. However, even with e.persist
    // certain required props (e.g. currentTarget) are null so we're forced to clone.
    const eventClone = { ...e };
    return setTimeout(() => this.open(eventClone), delay ?? 0);
  }

  close = (e: any) => {

    this.props.onClose?.call(null, e, this.props);

    this.setState({ open: false });
  }

  closeWithTimeout = (e: any, delay?: number) => {

    // React wipes the entire event object and suggests using e.persist() if
    // you need the event for async access. However, even with e.persist
    // certain required props (e.g. currentTarget) are null so we're forced to clone.
    const eventClone = { ...e };
    return setTimeout(() => this.close(eventClone), delay ?? 0);
  }

  handleMount = () => this.props.onMount?.call(null, null, this.props);

  handleUnmount = () => this.props.onUnmount?.call(null, null, this.props);

  handleTriggerRef = (c: any) => {

    (this.triggerRef as React.MutableRefObject<any>).current = c;
    handleRef(this.props.triggerRef!, c);
  }

  render() {
    const { children, eventPool, mountNode, trigger } = this.props;
    const { open } = this.state;

    if (process.env.NODE_ENV !== 'production') {
      validateTrigger(trigger);
    }

    return (
      <Fragment>
        {open && (
          <Fragment>
            <PortalInner
              innerRef={this.contentRef}
              mountNode={mountNode}
              onMount={this.handleMount}
              onUnmount={this.handleUnmount}
            >
              {children}
            </PortalInner>

            <EventStack name='mouseleave' on={this.handlePortalMouseLeave} pool={eventPool} target={this.contentRef} />
            <EventStack name='mouseenter' on={this.handlePortalMouseEnter} pool={eventPool} target={this.contentRef} />
            <EventStack name='mousedown' on={this.handleDocumentMouseDown} pool={eventPool} />
            <EventStack name='click' on={this.handleDocumentClick} pool={eventPool} />
            <EventStack name='keydown' on={this.handleEscape} pool={eventPool} />
          </Fragment>
        )}
        {trigger && (
          <Ref innerRef={this.handleTriggerRef}>
            {cloneElement(trigger as any, this.triggerEvents)}
          </Ref>
        )}
      </Fragment>
    );
  }
}
