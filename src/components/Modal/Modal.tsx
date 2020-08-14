import React, { createRef, isValidElement, Children } from 'react';
import shallowEqual from 'shallowequal';

import { SemanticShorthandItem, isBrowser, doesNodeContainClick, getClassName, ModernAutoControlledComponent, isPlainObject } from '../../lib';
import { ModalHeader, ModalHeaderProps } from './ModalHeader';
import { ModalContent, ModalContentProps } from './ModalContent';
import { ModalActions, ModalActionsProps } from './ModalActions';
import { ModalDescription } from './ModalDescription';
import { ModalDimmerProps, ModalDimmer } from './ModalDimmer';
import { StrictPortalProps, Portal } from '../Portal';
import { eventStack } from '../EventStack';
import { Icon } from '../Icon';
import { isLegacy, canFit, getLegacyStyles } from './lib';
import { Ref } from '../Ref';

export interface ModalProps extends StrictModalProps {
  [key: string]: any;
}

export interface StrictModalProps extends StrictPortalProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Shorthand for Modal.Actions. Typically an array of button shorthand. */
  actions?: SemanticShorthandItem<ModalActionsProps>;

  /** A Modal can reduce its complexity */
  basic?: boolean;

  /** A modal can be vertically centered in the viewport */
  centered?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Icon. */
  closeIcon?: any;

  /** Whether or not the Modal should close when the dimmer is clicked. */
  closeOnDimmerClick?: boolean;

  /** Whether or not the Modal should close when the document is clicked. */
  closeOnDocumentClick?: boolean;

  /** A Modal can be passed content via shorthand. */
  content?: SemanticShorthandItem<ModalContentProps>;

  /** Initial value of open. */
  defaultOpen?: boolean;

  /** A modal can appear in a dimmer. */
  dimmer?: true | 'blurring' | 'inverted' | SemanticShorthandItem<ModalDimmerProps>;

  /** Event pool namespace that is used to handle component events */
  eventPool?: string;

  /** A Modal can be passed header via shorthand. */
  header?: SemanticShorthandItem<ModalHeaderProps>;

  /** The node where the modal should mount. Defaults to document.body. */
  mountNode?: any;

  /**
   * Action onClick handler when using shorthand `actions`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onActionClick?: (event: React.MouseEvent<HTMLElement>, data: ModalProps) => void;

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose?: (event: React.MouseEvent<HTMLElement>, data: ModalProps) => void;

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount?: (nothing: null, data: ModalProps) => void;

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>, data: ModalProps) => void;

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount?: (nothing: null, data: ModalProps) => void;

  /** Controls whether or not the Modal is displayed. */
  open?: boolean;

  /** A modal can vary in size. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';

  /** Custom styles. */
  style?: React.CSSProperties;

  /** Element to be rendered in-place where the portal is defined. */
  trigger?: React.ReactNode;
}

// interface CModal extends React.FC<ModalProps> {
//   Actions: typeof ModalActions;
//   Content: typeof ModalContent;
//   Description: typeof ModalDescription;
//   Header: typeof ModalHeader;
// }

interface ModalState {
  open: boolean;
  scrolling: boolean;
  mountClasses: string;
}

// const reducer = (prev: ModalState, value: Partial<ModalState>) => ({ ...prev, ...value });

/**
 * A modal displays content that temporarily blocks interactions with the main view of a site.
 * @see Confirm
 * @see Portal
 */
class Modal extends ModernAutoControlledComponent {

  static defaultProps: Partial<ModalProps>;
  static autoControlledProps: (keyof ModalProps)[];

  static Actions: typeof ModalActions;
  static Content: typeof ModalContent;
  static Description: typeof ModalDescription;
  static Dimmer: typeof ModalDimmer;
  static Header: typeof ModalHeader;

  legacy = isBrowser() && isLegacy();
  ref = createRef<any>();
  dimmerRef = createRef<any>();
  latestDocumentMouseDownEvent = null;
  animationRequestId!: number;

  componentWillUnmount() {

    this.handlePortalUnmount();
  }

  // Do not access document when server side rendering
  getMountNode = () => (isBrowser() ? this.props.mountNode || document.body : null);

  handleActionsOverrides = (p: any) => ({
    onActionClick: (e: any, ap: ModalActionsProps) => {
      p.onActionClick?.call(null, e, ap);
      this.props.onActionClick?.call(null, e, this.props);

      this.handleClose(e);
    },
  })

  handleClose = (e: any) => {

    this.props.onClose?.call(null, e, this.props);
    this.setState({ open: false });
  }

  handleDocumentMouseDown = (e: any) => {
    this.latestDocumentMouseDownEvent = e;
  }

  handleDocumentClick = (e: any) => {

    const { closeOnDimmerClick } = this.props;
    const currentDocumentMouseDownEvent = this.latestDocumentMouseDownEvent;
    this.latestDocumentMouseDownEvent = null;

    if (
      !closeOnDimmerClick ||
      doesNodeContainClick(this.ref.current, currentDocumentMouseDownEvent) ||
      doesNodeContainClick(this.ref.current, e)
    ) {
      return;
    }

    this.props.onClose?.call(null, e, this.props);
    this.setState({ open: false });
  }

  handleIconOverrides = (p: any) => ({
    onClick: (e: any) => {
      p.onClick?.call(null, e);
      this.handleClose(e);
    },
  })

  handleOpen = (e: any) => {

    this.props.onOpen?.call(null, e, this.props);
    this.setState({ open: true });
  }

  handlePortalMount = (e: any) => {
    const { eventPool } = this.props;

    this.setState({ scrolling: false });
    this.setPositionAndClassNames();

    eventStack.sub('mousedown', this.handleDocumentMouseDown, {
      pool: eventPool,
      target: this.dimmerRef.current,
    });
    eventStack.sub('click', this.handleDocumentClick, {
      pool: eventPool,
      target: this.dimmerRef.current,
    });
    this.props.onMount?.call(null, e, this.props);
  }

  handlePortalUnmount = (e?: any) => {
    const { eventPool } = this.props;

    cancelAnimationFrame(this.animationRequestId);
    eventStack.unsub('mousedown', this.handleDocumentMouseDown, {
      pool: eventPool,
      target: this.dimmerRef.current,
    });
    eventStack.unsub('click', this.handleDocumentClick, {
      pool: eventPool,
      target: this.dimmerRef.current,
    });
    this.props.onUnmount?.call(null, e, this.props);
  }

  setPositionAndClassNames = () => {
    const { centered } = this.props;

    let scrolling;
    const newState = {} as any;

    if (this.ref.current) {
      const rect = this.ref.current.getBoundingClientRect();
      const isFitted = canFit(rect);

      scrolling = !isFitted;
      // Styles should be computed for IE11
      const legacyStyles = this.legacy ? getLegacyStyles(isFitted, centered, rect) : {};

      if (!shallowEqual(this.state.legacyStyles, legacyStyles)) {
        newState.legacyStyles = legacyStyles;
      }

      if (this.state.scrolling !== scrolling) {
        newState.scrolling = scrolling;
      }
    }

    if (Object.keys(newState).length) this.setState(newState);
    this.animationRequestId = requestAnimationFrame(this.setPositionAndClassNames);
  }

  renderContent = (rest: any) => {
    const {
      actions,
      basic,
      children,
      className,
      closeIcon,
      content,
      header,
      size,
      style,
    } = this.props;
    const { legacyStyles, scrolling } = this.state;

    // tslint:disable-next-line: object-shorthand-properties-first
    const classes = getClassName('ui', size, { basic, legacy: this.legacy, scrolling }, 'modal transition visible active', className);
    const ElementType = this.props.as ?? 'div';

    const closeIconName = closeIcon === true ? 'close' : closeIcon;
    const closeIconJSX = Icon.create(closeIconName, { overrideProps: this.handleIconOverrides });

    return (
      <Ref innerRef={this.ref}>
        <ElementType {...rest} className={classes} style={{ ...legacyStyles, ...style }}>
          {closeIconJSX}
          {!Children.count(children) ? (
            <>
              {ModalHeader.create(header, { autoGenerateKey: false })}
              {ModalContent.create(content, { autoGenerateKey: false })}
              {ModalActions.create(actions, { overrideProps: this.handleActionsOverrides })}
            </>
          ) : (
              children
            )}
        </ElementType>
      </Ref>
    );
  }

  render() {
    const { centered, closeOnDocumentClick, dimmer, eventPool, trigger } = this.props;
    const { open, scrolling } = this.state;
    const mountNode = this.getMountNode();

    // Short circuit when server side rendering
    if (!isBrowser()) {
      return isValidElement(trigger) ? trigger : null;
    }

    const { rest, portalProps } = getExtraProps(this.props);

    // Heads up!
    //
    // The SUI CSS selector to prevent the modal itself from blurring requires an immediate .dimmer child:
    // .blurring.dimmed.dimmable>:not(.dimmer) { ... }
    //
    // The .blurring.dimmed.dimmable is the body, so that all body content inside is blurred.
    // We need the immediate child to be the dimmer to :not() blur the modal itself!
    // Otherwise, the portal div is also blurred, blurring the modal.
    //
    // We cannot them wrap the modalJSX in an actual <Dimmer /> instead, we apply the dimmer classes to the <Portal />.

    return (
      <Portal
        closeOnDocumentClick={closeOnDocumentClick}
        {...portalProps}
        trigger={trigger}
        eventPool={eventPool}
        mountNode={mountNode}
        open={open}
        onClose={this.handleClose}
        onMount={this.handlePortalMount}
        onOpen={this.handleOpen}
        onUnmount={this.handlePortalUnmount}
      >
        <Ref innerRef={this.dimmerRef}>
          {ModalDimmer.create(isPlainObject(dimmer) ? dimmer : {}, {
            autoGenerateKey: false,
            defaultProps: {
              blurring: dimmer === 'blurring',
              inverted: dimmer === 'inverted',
            },
            overrideProps: {
              children: this.renderContent(rest),
              // tslint:disable-next-line: object-shorthand-properties-first
              centered, mountNode, scrolling,
            },
          })}
        </Ref>
      </Portal>
    );
  }
}

Modal.defaultProps = {
  centered: true,
  dimmer: true,
  closeOnDimmerClick: true,
  closeOnDocumentClick: false,
  eventPool: 'Modal',
};

Modal.autoControlledProps = ['open'];

Modal.Actions = ModalActions;
Modal.Content = ModalContent;
Modal.Description = ModalDescription;
Modal.Dimmer = ModalDimmer;
Modal.Header = ModalHeader;

export { Modal };

/*
Portal handled

["children", "closeOnDocumentClick", "closeOnEscape", "closeOnPortalMouseLeave", "closeOnTriggerBlur", "closeOnTriggerClick", "closeOnTriggerMouseLeave", "defaultOpen", "eventPool", "mountNode", "mouseEnterDelay", "mouseLeaveDelay", "onClose", "onMount", "onOpen", "onUnmount", "open", "openOnTriggerClick", "openOnTriggerFocus", "openOnTriggerMouseEnter", "trigger", "triggerRef"]

Modal handled
["actions", "as", "basic", "centered", "children", "className", "closeIcon", "closeOnDimmerClick", "closeOnDocumentClick", "content", "defaultOpen", "dimmer", "eventPool", "header", "mountNode", "onActionClick", "onClose", "onMount", "onOpen", "onUnmount", "open", "size", "style", "trigger"]
*/
const getExtraProps = (props: ModalProps) => {

  const {
    // modal props
    as, actions, basic, centered, children, className, closeIcon, closeOnDimmerClick, closeOnDocumentClick, content, defaultOpen, dimmer, eventPool, header, mountNode, onActionClick, onClose, onMount, onOpen, onUnmount, open, size, style, trigger,
    // portal props not handled from Modal
    closeOnEscape, closeOnPortalMouseLeave, closeOnTriggerBlur, closeOnTriggerClick, closeOnTriggerMouseLeave, mouseEnterDelay, mouseLeaveDelay, openOnTriggerClick, openOnTriggerFocus, openOnTriggerMouseEnter, triggerRef,
    // any other
    ...rest } = props;

  const pprops = { closeOnEscape, closeOnPortalMouseLeave, closeOnTriggerBlur, closeOnTriggerClick, closeOnTriggerMouseLeave, mouseEnterDelay, mouseLeaveDelay, openOnTriggerClick, openOnTriggerFocus, openOnTriggerMouseEnter, triggerRef };

  return { rest, portalProps: Object.entries(pprops).reduce((acc, [key, val]) => { if (val !== undefined) acc[key] = val; }, {} as any) };
};
