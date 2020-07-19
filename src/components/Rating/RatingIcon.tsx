import keyboardKey from 'keyboard-key';
import React from 'react';
import { getClassName } from '../../lib';

export interface RatingIconProps extends StrictRatingIconProps {
  [key: string]: any;
}

export interface StrictRatingIconProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Indicates activity of an icon. */
  active?: boolean;

  /** Additional classes. */
  className?: string;

  /** An index of icon inside Rating. */
  index?: number;

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>, data: RatingIconProps) => void;

  /**
   * Called on keyup.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onKeyUp?: (event: React.MouseEvent<HTMLElement>, data: RatingIconProps) => void;

  /**
   * Called on mouseenter.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>, data: RatingIconProps) => void;

  /** Indicates selection of an icon. */
  selected?: boolean;
}

/**
 * An internal icon sub-component for Rating component
 */
export const RatingIcon: React.FC<RatingIconProps> = props => {

  const { as: ElementType = 'i', index, active, className, selected, onClick, onMouseEnter, onKeyUp, ...rest } = props;

  const handleClick = (e: any) => onClick?.call(null, e, props);

  const handleKeyUp = (e: any) => {

    onKeyUp?.call(null, e, props);

    const code = keyboardKey.getCode(e);
    // tslint:disable-next-line: triple-equals
    if (code == keyboardKey.Enter || code == keyboardKey.Spacebar) {

      e.preventDefault();
      onClick?.call(null, e, props);
    }
  };

  const handleMouseEnter = (e: any) => onMouseEnter?.call(null, e, props);

  const classes = getClassName({ active, selected }, 'icon', className);

  return (
    <ElementType
      {...rest}
      className={classes}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      onMouseEnter={handleMouseEnter}
      role='radio'
    />
  );
};

RatingIcon.defaultProps = { as: 'i' };
