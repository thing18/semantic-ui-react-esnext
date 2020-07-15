import keyboardKey from 'keyboard-key';
import React from 'react';

import { createShorthandFactory, FCX } from '../../lib';
import { MenuItem } from '..';

export interface PaginationItemProps extends StrictPaginationItemProps {
  [key: string]: any;
}

export interface StrictPaginationItemProps {
  /** A pagination item can be active. */
  active?: boolean;

  /** A pagination item can be disabled. */
  disabled?: boolean;

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationItemProps) => void;

  /**
   * Called on key down.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onKeyDown?: (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationItemProps) => void;

  /** A pagination should have a type. */
  type?: 'ellipsisItem' | 'firstItem' | 'prevItem' | 'pageItem' | 'nextItem' | 'lastItem';
}

/**
 * An item of a pagination.
 */
const PaginationItem: FCX<PaginationItemProps> = props => {

  const { active, type, disabled, onClick, onKeyDown } = { ...PaginationItem.defaultProps, ...props };

  const handleClick = (e: any) => onClick?.call(null, e, props);

  const handleKeyDown = (e: any) => {
    onKeyDown?.call(null, e, props);
    if (keyboardKey.getCode(e) === keyboardKey.Enter) onClick?.call(null, e, props);
  };

  const handleOverrides = () => ({ onClick: handleClick, onKeyDown: handleKeyDown });

  const isDisabled = disabled || type === 'ellipsisItem';

  return MenuItem.create(props, {
    defaultProps: { active, 'aria-current': active, 'aria-disabled': isDisabled, disabled: isDisabled, onClick: handleClick, onKeyDown: handleKeyDown, tabIndex: isDisabled ? -1 : 0 },
    overrideProps: handleOverrides,
  });
};

PaginationItem.create = createShorthandFactory(PaginationItem, (content) => ({ content }));
PaginationItem.defaultProps = {};

export { PaginationItem };
