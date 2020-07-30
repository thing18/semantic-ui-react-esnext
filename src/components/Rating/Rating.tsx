import React, { useState, useEffect, useReducer } from 'react';

import { RatingIcon, RatingIconProps } from './RatingIcon';
import { getClassName } from '../../lib';

export interface RatingProps extends StrictRatingProps {
  [key: string]: any;
}

export interface StrictRatingProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Additional classes. */
  className?: string;

  /**
   * You can clear the rating by clicking on the current start rating.
   * By default a rating will be only clearable if there is 1 icon.
   * Setting to `true`/`false` will allow or disallow a user to clear their rating.
   */
  clearable?: boolean | 'auto';

  /** The initial rating value. */
  defaultRating?: number;

  /** You can disable or enable interactive rating.  Makes a read-only rating. */
  disabled?: boolean;

  /** A rating can use a set of star or heart icons. */
  icon?: 'star' | 'heart';

  /** The total number of icons. */
  maxRating?: number;

  /**
   * Called after user selects a new rating.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onRate?: (event: React.MouseEvent<HTMLDivElement>, data: RatingProps) => void;

  /** The current number of active icons. */
  rating?: number;

  /** A progress bar can vary in size. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'huge' | 'massive';
}

interface CRating extends React.FC<RatingProps> {
  Icon: typeof RatingIcon;
}

interface RatingState {
  rating: number;
  selectedIndex: number;
  isSelecting: boolean;
}

/**
 * A rating indicates user interest in content.
 */
export const Rating: CRating = props => {

  const { as: ElementType = 'div', rating, defaultRating, className, disabled, icon, maxRating, size, clearable, onRate, ...rest } = { ...Rating.defaultProps, ...props };

  const [state, setState] = useReducer((p: RatingState, n: Partial<RatingState>) => ({ ...p, ...n }), { rating: 0, selectedIndex: -1, isSelecting: false });

  useEffect(
    () => {
      setState({ rating: rating ?? defaultRating ?? 0 });
    },
    [rating],
  );

  const handleIconClick = (e: any, { index }: RatingIconProps) => {

    if (disabled) return;

    // default newRating is the clicked icon
    // allow toggling a binary rating
    // allow clearing ratings
    let newRating = index! + 1;
    if (clearable === 'auto' && maxRating === 1) {
      newRating = +!rating;
    } else if (clearable === true && newRating === rating) {
      newRating = 0;
    }

    // set rating
    setState({ rating: newRating, isSelecting: false });
    onRate?.call(null, e, { ...props, rating: newRating });
  };

  const handleIconMouseEnter = (_e: any, { index }: RatingIconProps) => !props.disabled && setState({ selectedIndex: index, isSelecting: true });

  const handleMouseLeave = (e: any, p: any) => {
    props.onMouseLeave?.call(null, e, p);

    if (props.disabled) return;

    setState({ selectedIndex: -1, isSelecting: false });
  };

  const classes = getClassName('ui', icon, size, { disabled, selected: state.isSelecting && !disabled && state.selectedIndex >= 0 }, 'rating', className);

  return (
    <ElementType {...rest} className={classes} role='radiogroup' onMouseLeave={handleMouseLeave} tabIndex={disabled ? 0 : -1}>
      {
        Array.from({ length: maxRating! }, (_item, i) => (
          <RatingIcon
            tabIndex={disabled ? -1 : 0}
            active={state.rating >= i + 1}
            aria-checked={state.rating === i + 1}
            aria-posinset={i + 1}
            aria-setsize={maxRating}
            index={i}
            key={i}
            onClick={handleIconClick}
            onMouseEnter={handleIconMouseEnter}
            selected={state.selectedIndex >= i && state.isSelecting}
          />
        ))
      }
    </ElementType>
  );
};

// Rating.autoControlledProps = ['rating'];
Rating.defaultProps = { clearable: 'auto', maxRating: 1 };
Rating.Icon = RatingIcon;
