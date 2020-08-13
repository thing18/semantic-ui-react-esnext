import { EventListener, documentRef } from '../EventListener';
import React, { useRef, useReducer, useEffect, Children, useState } from 'react';

import { SemanticShorthandContent, doesNodeContainClick, getClassName } from '../../lib';
import { SidebarPushable } from './SidebarPushable';
import { SidebarPusher } from './SidebarPusher';
import { Ref } from '../Ref';

export interface SidebarProps extends StrictSidebarProps {
  [key: string]: any;
}

export interface StrictSidebarProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

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
  visible?: boolean;

}

interface This {
  animationTimer?: NodeJS.Timeout;
  skipNextCallback?: boolean;
}

/**
 * A sidebar hides additional content beside a page.
 */
export const Sidebar: CSidebar = ({ children, content, ...props }) => {

  const ref = useRef<HTMLElement>();
  const $this = useRef<This>({});
  const [state, setState] = useState({ animationTick: 0, visible: props.visible });

  const handleAnimationStart = () => {

    clearTimeout($this.current.animationTimer!);
    $this.current.animationTimer = setTimeout(
      () => {
        setState({ ...state, animationTick: 0 });
        (props.visible ? props.onShow : props.onHidden)?.call(null, null as any, props);
      },
      Sidebar.animationDuration,
    );

    if ($this.current.skipNextCallback) {
      $this.current.skipNextCallback = false;
    } else {
      (props.visible ? props.onVisible : props.onHide)?.call(null, null as any, props);
    }
  };

  useEffect(
    () => {

      const incr = !!props.visible === !!state.visible ? 0 : 1;
      setState(prev => ({ animationTick: prev.animationTick + incr, visible: props.visible }));

      if (incr) handleAnimationStart();

      return () => clearTimeout($this.current.animationTimer!);
    },
    [props.visible],
  );

  const handleDocumentClick = (e: any) => {
    if (!doesNodeContainClick(ref.current!, e)) {
      $this.current.skipNextCallback = true;
      props.onHide?.call(null, e, { ...props, visible: false });
    }
  };

  const { ElementType, rest, target, visible, className } = sidebarRenderProps(props, state);

  return (
    <Ref innerRef={ref as any}>
      <ElementType {...rest} className={className}>
        {Children.count(children) ? children : content}
        {visible && <EventListener listener={handleDocumentClick} targetRef={target} type='click' />}
      </ElementType>
    </Ref>
  );
};

const sidebarRenderProps = (props: SidebarProps, state: SidebarState) => {

  const {
    as: ElementType = 'div',
    animation, className, children, content, direction, target, visible, width,
    onHide, onHidden, onShow, onVisible, ...rest } = props;

  // tslint:disable-next-line: object-shorthand-properties-first
  const classes = getClassName('ui', animation, direction, width, { animating: state.animationTick > 0, visible }, 'sidebar', className);

  return { ElementType, rest, visible, target, className: classes };
};

Sidebar.defaultProps = { direction: 'left', target: documentRef as any, visible: false };
Sidebar.animationDuration = 500;
Sidebar.Pushable = SidebarPushable;
Sidebar.Pusher = SidebarPusher;
