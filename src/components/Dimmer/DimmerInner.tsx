import React, { useRef, useEffect, Children } from 'react';

import { SemanticShorthandContent, doesNodeContainClick, getClassName, Use } from '../../lib';

export interface DimmerInnerProps extends StrictDimmerInnerProps {
  [key: string]: any;
}

export interface StrictDimmerInnerProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** An active dimmer will dim its parent container. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A disabled dimmer cannot be activated */
  disabled?: boolean;

  /**
   * Called when the dimmer is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: DimmerInnerProps) => void;

  /**
   * Handles click outside Dimmer's content, but inside Dimmer area.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClickOutside?: (event: React.MouseEvent<HTMLDivElement>, data: DimmerInnerProps) => void;

  /** A dimmer can be formatted to have its colors inverted. */
  inverted?: boolean;

  /** A dimmer can be formatted to be fixed to the page. */
  page?: boolean;

  /** A dimmer can be controlled with simple prop. */
  simple?: boolean;

  /** A dimmer can have its content top or bottom aligned. */
  verticalAlign?: 'bottom' | 'top';
}

/**
 * An inner element for a Dimmer.
 */
export const DimmerInner: React.FC<DimmerInnerProps> = props => {

  const { as: ElementType = 'div', active, children, className, content, disabled, inverted, page, simple, verticalAlign, onClick, onClickOutside, ...rest } = props;

  const containerRef = useRef<any>();
  const contentRef = useRef<any>();

  useEffect(
    () => {

      const c = containerRef.current;

      if (!c || !c.style) return;
      if (active) {
        c.style.setProperty('display', 'flex', 'important');
      } else {
        c.style.removeProperty('display');
      }
    },
    [active],
  );

  const handleClick = (e: any) => {

    onClick?.call(null, e, props);

    const c = contentRef.current;
    if (c && (c !== e.target && doesNodeContainClick(c, e))) return;

    onClickOutside?.call(null, e, props);
  };

  // tslint:disable-next-line: object-shorthand-properties-first
  const classes = getClassName('ui', { 'active transition visible': active, disabled, inverted, page, simple }, [Use.VerticalAlign, verticalAlign], 'dimmer', className);

  const childrenContent = Children.count(children) ? children : content;

  return (
    <ElementType {...rest} className={classes} onClick={handleClick} ref={containerRef}>
      {childrenContent && (
        <div className='content' ref={contentRef}>
          {childrenContent}
        </div>
      )}
    </ElementType>
  );
};
