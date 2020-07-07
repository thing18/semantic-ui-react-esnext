import React from 'react';

import { TableHeader, StrictTableHeaderProps } from './TableHeader';

export interface TableFooterProps extends StrictTableFooterProps {
  [key: string]: any;
}

export interface StrictTableFooterProps extends StrictTableHeaderProps {
  /** An element type to render as (string or function). */
  as?: any;
}

/**
 * A table can have a footer.
 */
export const TableFooter: React.FC<TableFooterProps> = ({ as = 'tfoot', ...rest }) => <TableHeader {...rest} as={as} />;

TableFooter.defaultProps = { as: 'tfoot' };
