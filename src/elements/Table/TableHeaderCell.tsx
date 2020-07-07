import React from 'react';

import { TableCell, StrictTableCellProps } from './TableCell';
import { TableHeaderProps } from './TableHeader';
import { getClassName, Use } from '../../lib';

export interface TableHeaderCellProps extends StrictTableHeaderCellProps {
  [key: string]: any;
}

export interface StrictTableHeaderCellProps extends StrictTableCellProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Additional classes. */
  className?: string;

  /** A header cell can be sorted in ascending or descending order. */
  sorted?: 'ascending' | 'descending';
}

/**
 * A table can have a header cell.
 */
export const TableHeaderCell: React.FC<TableHeaderProps> = ({ as = 'th', className, sorted, ...rest }) => <TableCell {...rest} as={as} className={getClassName([Use.ValueKey, { sorted }], className)} />;

TableHeaderCell.defaultProps = { as: 'th' };
