import React, { createRef, Fragment, isValidElement, useRef, useState, useEffect, Children, useReducer } from 'react';

import { SemanticShorthandItem, isBrowser, doesNodeContainClick, getClassName } from '../../lib';
import { ModalHeader, ModalHeaderProps } from './ModalHeader';
import { ModalContent, ModalContentProps } from './ModalContent';
import { ModalActions, ModalActionsProps } from './ModalActions';
import { ModalDescription } from './ModalDescription';
import { StrictPortalProps, Portal } from '../Portal';
import { eventStack } from '../EventStack';
import { Icon } from '../Icon';
import { MountNode } from '../MountNode';

export interface ModalProps extends StrictModalProps {
  [key: string]: any;
}

export interface StrictModalProps extends StrictPortalProps {
  /** An element type to render as (string or function). */
  as?: any;

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
  dimmer?: true | 'blurring' | 'inverted';

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

interface CModal extends React.FC<ModalProps> {
  Actions: typeof ModalActions;
  Content: typeof ModalContent;
  Description: typeof ModalDescription;
  Header: typeof ModalHeader;
}

interface ModalState {
  open: boolean;
  scrolling: boolean;
  mountClasses: string;
}

const reducer = (prev: ModalState, value: Partial<ModalState>) => ({ ...prev, ...value });

/**
 * A modal displays content that temporarily blocks interactions with the main view of a site.
 * @see Confirm
 * @see Portal
 */
const Modal: CModal = props => {

  // static autoControlledProps = ['open']
  const {
    as: ElementType = 'div', open, actions, basic, children, className, closeIcon, content, header, size, style, mountNode,
    closeOnDocumentClick, trigger, eventPool, centered, dimmer, onOpen, onClose, closeOnDimmerClick, onActionClick, onMount, onUnmount,
  } = { ...Modal.defaultProps, ...props };

  const ref = useRef<any>();
  const dimmerRef = useRef<any>();
  const $this = useRef({ latestDocumentMouseDownEvent: null, animationRequestId: 0 });
  const [state, setState] = useReducer(reducer, { open: open ?? props.defaultOpen ?? false, scrolling: false, mountClasses: '' });

  useEffect(
    () => {
      setState({ open });
      return handlePortalUnmount;
    },
    [open],
  );

  // Do not access document when server side rendering
  const getMountNode = () => (isBrowser() ? mountNode || document.body : null);

  const handleActionsOverrides = (pprops: any) => ({
    onActionClick: (e: any, actionProps: any) => {
      pprops.onActionClick?.call(null, e, actionProps);
      onActionClick?.call(null, e, props);

      handleClose(e);
    },
  });

  const handleClose = (e: any) => {

    onClose?.call(null, e, props);
    setState({ open: false });
  };

  const handleDocumentMouseDown = (e: any) => $this.current.latestDocumentMouseDownEvent = e;

  const handleDocumentClick = (e: any) => {

    const currentDocumentMouseDownEvent = $this.current.latestDocumentMouseDownEvent;
    $this.current.latestDocumentMouseDownEvent = null;

    if (!closeOnDimmerClick || doesNodeContainClick(ref.current, currentDocumentMouseDownEvent) || doesNodeContainClick(ref.current, e)) return;

    onClose?.call(null, e, props);
    setState({ open: false });
  };

  const handleIconOverrides = (pprops: any) => ({
    onClick: (e: any) => {
      pprops.onClick?.call(null, e);
      handleClose(e);
    },
  });

  const handleOpen = (e: any) => {

    onOpen?.call(null, e, props);
    setState({ open: true });
  };

  const handlePortalMount = (e: any) => {

    setState({ scrolling: false });
    setPositionAndClassNames();

    eventStack.sub('mousedown', handleDocumentMouseDown, { pool: eventPool, target: dimmerRef.current });
    eventStack.sub('click', handleDocumentClick, { pool: eventPool, target: dimmerRef.current });
    onMount?.call(null, e, props);
  };

  const handlePortalUnmount = (e?: any) => {

    cancelAnimationFrame($this.current.animationRequestId);
    eventStack.unsub('mousedown', handleDocumentMouseDown, { pool: eventPool, target: dimmerRef.current });
    eventStack.unsub('click', handleDocumentClick, { pool: eventPool, target: dimmerRef.current });
    onUnmount?.call(null, e, props);
  };

  const setDimmerNodeStyle = () => {

    const { current } = dimmerRef;

    if (current && current.style && current.style.display !== 'flex') {
      current.style.setProperty('display', 'flex', 'important');
    }
  };

  const setPositionAndClassNames = () => {

    let scrolling;
    const newState: Partial<ModalState> = {};

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const isFitted = canFit(rect);

      scrolling = !isFitted;
      // Styles should be computed for IE11
      if (state.scrolling !== scrolling) {
        newState.scrolling = scrolling;
      }
    }

    // tslint:disable-next-line: object-shorthand-properties-first
    const classes = getClassName({ 'dimmable dimmed': !!dimmer, blurring: dimmer === 'blurring', scrolling });

    if (state.mountClasses !== classes) newState.mountClasses = classes;
    if (Object.keys(newState)) setState(newState);

    $this.current.animationRequestId = requestAnimationFrame(setPositionAndClassNames);

    setDimmerNodeStyle();
  };

  // Short circuit when server side rendering
  if (!isBrowser()) {
    return isValidElement(trigger) ? trigger : null;
  }

  const { rest, portalProps } = getExtraProps(props);

  // wrap dimmer modals
  const dimmerClasses = getClassName('ui', dimmer === 'inverted' && 'inverted' as any, !centered && 'top aligned' as any, 'page modals dimmer transition visible active');
  const contentClasses = getClassName('ui', size, { basic, scrolling: state.scrolling }, 'modal transition visible active', className);

  const closeIconName = closeIcon === true ? 'close' : closeIcon;
  const closeIconJSX = Icon.create(closeIconName, { overrideProps: handleIconOverrides });

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
      mountNode={getMountNode()}
      open={state.open}
      onClose={handleClose}
      onMount={handlePortalMount}
      onOpen={handleOpen}
      onUnmount={handlePortalUnmount}
    >
      <div className={dimmerClasses} ref={dimmerRef}>
        <ElementType {...rest} className={contentClasses} style={style} ref={ref}>
          <MountNode className={state.mountClasses} node={mountNode} />

          {closeIconJSX}
          {Children.count(children)
            ? children
            : (
              <Fragment>
                {ModalHeader.create(header, { autoGenerateKey: false })}
                {ModalContent.create(content, { autoGenerateKey: false })}
                {ModalActions.create(actions, { overrideProps: handleActionsOverrides })}
              </Fragment>
            )
          }
        </ElementType>
      </div>
    </Portal>
  );
};

Modal.defaultProps = { centered: true, dimmer: true, closeOnDimmerClick: true, closeOnDocumentClick: false, eventPool: 'Modal' };
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Description = ModalDescription;
Modal.Actions = ModalActions;

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

// https://github.com/Semantic-Org/Semantic-UI/blob/2.4.1/src/definitions/modules/modal.js#L956
const OFFSET = 0;
// https://github.com/Semantic-Org/Semantic-UI/blob/2.4.1/src/definitions/modules/modal.js#L990
const PADDING = 50;

/**
 * Ensures that modal can fit viewport without scroll.
 *
 * @param modalRect {DOMRect}
 *
 * @see https://github.com/Semantic-Org/Semantic-UI/blob/2.4.1/src/definitions/modules/modal.js#L608
 */
const canFit = (modalRect: ClientRect) => {
  // original: scrollHeight = $module.prop('scrollHeight'),
  // is replaced by .height because scrollHeight provides integer which produces glitches
  // https://github.com/Semantic-Org/Semantic-UI-React/issues/2221
  const scrollHeight = modalRect.height + OFFSET;
  // $module.outerHeight() + settings.offset
  const height = modalRect.height + OFFSET;

  // original: $(window).height()
  const contextHeight = window.innerHeight;
  const verticalCenter = contextHeight / 2;
  const topOffset = -(height / 2);

  // padding with edge of page
  const paddingHeight = PADDING;
  const startPosition = verticalCenter + topOffset; // 0

  // original: scrollHeight > height
  //     ? startPosition + scrollHeight + paddingHeight < contextHeight
  //     : height + paddingHeight * 2 < contextHeight
  return startPosition + scrollHeight + paddingHeight < contextHeight;
};
