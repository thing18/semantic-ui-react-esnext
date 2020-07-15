import React, { useState, useEffect } from 'react';

import { SemanticShorthandItem } from '../../lib';
import { Menu } from '..';
import { PaginationItem, PaginationItemProps } from './PaginationItem';
import { createPaginationItems } from './createPaginationItems';

export interface PaginationProps extends StrictPaginationProps {
  [key: string]: any;
}

export interface StrictPaginationProps {
  /** A pagination item can have an aria label. */
  'aria-label'?: string;

  /** Initial activePage value. */
  defaultActivePage?: number | string;

  /** Index of the currently active page. */
  activePage?: number | string;

  /** Number of always visible pages at the beginning and end. */
  boundaryRange?: number | string;

  /** A pagination can be disabled. */
  disabled?: boolean;

  /** A shorthand for PaginationItem. */
  ellipsisItem?: SemanticShorthandItem<PaginationItemProps>;

  /** A shorthand for PaginationItem. */
  firstItem?: SemanticShorthandItem<PaginationItemProps>;

  /** A shorthand for PaginationItem. */
  lastItem?: SemanticShorthandItem<PaginationItemProps>;

  /** A shorthand for PaginationItem. */
  nextItem?: SemanticShorthandItem<PaginationItemProps>;

  /** A shorthand for PaginationItem. */
  pageItem?: SemanticShorthandItem<PaginationItemProps>;

  /** A shorthand for PaginationItem. */
  prevItem?: SemanticShorthandItem<PaginationItemProps>;

  /**
   * Called on change of an active page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onPageChange?: (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => void;

  /** Number of always visible pages before and after the current one. */
  siblingRange?: number | string;

  /** Total number of pages. */
  totalPages: number | string;
}

interface CPagination extends React.FC<PaginationProps> {
  Item: typeof PaginationItem;
}

/**
 * A component to render a pagination.
 */
const Pagination: CPagination = props => {

  const {
    'aria-label': ariaLabel,
    children, boundaryRange, disabled, siblingRange, totalPages, activePage, defaultActivePage,
    firstItem, lastItem, nextItem, pageItem, prevItem, ellipsisItem,
    onPageChange, ...rest } = { ...Pagination.defaultProps, ...props };

  const [state, setState] = useState(+(activePage ?? defaultActivePage ?? -1));

  // tslint:disable-next-line: triple-equals
  useEffect(() => { activePage != null && state != activePage && setState(+activePage); }, [activePage]);

  const handleItemClick = (e: any, { value }: PaginationItemProps) => {

    // tslint:disable-next-line: triple-equals
    if (state == value) return;

    setState(+value);
    onPageChange?.call(null, e, { ...props, activePage: +value });
  };

  const handleItemOverrides = (active: boolean, type: string, value: number) => (pprops: PaginationItemProps) => ({
    active,
    type,
    key: `${type}-${value}`,
    onClick: (e: any, p: PaginationItemProps) => {
      pprops.onClick?.call(null, e, p);
      if (p.type !== 'ellipsisItem') handleItemClick(e, p);
    },
  });

  const items = createPaginationItems({ activePage: state, boundaryRange: +boundaryRange!, hideEllipsis: ellipsisItem == null, siblingRange: +siblingRange!, totalPages: +totalPages! });

  return (
    <Menu {...rest} aria-label={ariaLabel} pagination role='navigation'>
      {
        items.map(({ active, type, value }) => PaginationItem.create(props[type], { defaultProps: { disabled, value, content: value }, overrideProps: handleItemOverrides(active, type, value) }))
      }
    </Menu>
  );

};

Pagination.defaultProps = {
  'aria-label': 'Pagination Navigation',
  boundaryRange: 1,
  ellipsisItem: '...',
  firstItem: { 'aria-label': 'First item', content: '«' },
  lastItem: { 'aria-label': 'Last item', content: '»' },
  nextItem: { 'aria-label': 'Next item', content: '⟩' },
  pageItem: {},
  prevItem: { 'aria-label': 'Previous item', content: '⟨' },
  siblingRange: 1,
};

Pagination.Item = PaginationItem;

export { Pagination };
