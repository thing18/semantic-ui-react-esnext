import { EventListener, documentRef } from '..';
import React, { useRef, useReducer, useEffect, Children } from 'react';

import { SemanticShorthandContent, doesNodeContainClick, getClassName } from '../../lib';
import { SidebarPushable } from './SidebarPushable';
import { SidebarPusher } from './SidebarPusher';

export interface SidebarProps extends StrictSidebarProps {
  [key: string]: any;
}

export interface StrictSidebarProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Animation style. */
  animation?: 'overlay' | 'push' | 'scale down' | 'uncover' | 'slide out' | 'slide along';

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Direction the sidebar should appear on. */
  direction?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Called before a sidebar begins to animate out.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onHide?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void;

  /**
   * Called after a sidebar has finished animating out.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onHidden?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void;

  /**
   * Called when a sidebar has finished animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onShow?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void;

  /**
   * Called when a sidebar begins animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onVisible?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void;

  /** A sidebar can handle clicks on the passed element. */
  target?: React.RefObject<HTMLElement>;

  /** Controls whether or not the sidebar is visible on the page. */
  visible?: boolean;

  /** Sidebar width. */
  width?: 'very thin' | 'thin' | 'wide' | 'very wide';
}

interface CSidebar extends React.FC<SidebarProps> {
  Pushable: typeof SidebarPushable;
  Pusher: typeof SidebarPusher;
  animationDuration: number;
}

interface SidebarState {
  animationTick: number;
  visible: boolean;

}

/**
 * A sidebar hides additional content beside a page.
 */
export const Sidebar: CSidebar = props => {

  const {
    as: ElementType = 'div',
    animation, className, children, content, direction, target, visible, width,
    onHide, onHidden, onShow, onVisible, ...rest } = { ...Sidebar.defaultProps, ...props };

  const ref = useRef<any>();
  const $this = useRef({ animationTimer: null as unknown as NodeJS.Timeout, skipNextCallback: false });
  const [state, setState] = useReducer((p: SidebarState, n: Partial<SidebarState>) => ({ ...p, ...n }), { animationTick: 0, visible: !!visible });

  useEffect(
    () => {

      const incr = visible === !!state.visible ? 0 : 1;
      setState({ animationTick: state.animationTick + incr, visible: !!visible });

      if (incr) {

        clearTimeout($this.current.animationTimer);
        $this.current.animationTimer = setTimeout(
          () => {
            setState({ animationTick: 0 });
            (visible ? onShow : onHidden)?.call(null, null as any, props);
          },
          Sidebar.animationDuration,
        );

        if ($this.current.skipNextCallback) {
          $this.current.skipNextCallback = false;
        } else {
          (visible ? onVisible : onHide)?.call(null, null as any, props);
        }
      }

      return () => clearTimeout($this.current.animationTimer);
    },
    [visible],
  );

  const handleDocumentClick = (e: any) => {
    if (!doesNodeContainClick(ref.current, e)) {
      $this.current.skipNextCallback = true;
      onHide?.call(null, e, { ...props, visible: false });
    }
  };

  // tslint:disable-next-line: object-shorthand-properties-first
  const classes = getClassName('ui', animation, direction, width, { animating: state.animationTick > 0, visible }, 'sidebar', className);

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {Children.count(children) ? children : content}
      {visible && <EventListener listener={handleDocumentClick} targetRef={target!} type='click' />}
    </ElementType>
  );
};

// const isRefObject = (ref: any): ref is React.RefObject<any> => typeof ref === 'object' && ref.hasOwnProperty('current');

Sidebar.defaultProps = { direction: 'left', target: documentRef as any, visible: false };

Sidebar.animationDuration = 500;
// Sidebar.autoControlledProps = ['visible'];
Sidebar.Pushable = SidebarPushable;
Sidebar.Pusher = SidebarPusher;
