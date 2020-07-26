import React, { Children } from 'react';

import { SemanticShorthandCollection, SemanticVERTICALALIGNMENTS, FCX, getClassName, Use, createShorthandFactory, SemanticTEXTALIGNMENTS } from '../../lib';
import { TableCell, TableCellProps } from './TableCell';

export interface TableRowProps extends StrictTableRowProps {
  [key: string]: any;
}

export interface StrictTableRowProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A row can be active or selected by a user. */
  active?: boolean;

  /** An element type to render as (string or function). */
  cellAs?: any;

  /** Shorthand array of props for TableCell. */
  cells?: SemanticShorthandCollection<TableCellProps>;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A row can be disabled. */
  disabled?: boolean;

  /** A row may call attention to an error or a negative value. */
  error?: boolean;

  /** A row may let a user know whether a value is bad. */
  negative?: boolean;

  /** A row may let a user know whether a value is good. */
  positive?: boolean;

  /** A table row can adjust its text alignment. */
  textAlign?: Exclude<SemanticTEXTALIGNMENTS, 'justified'>;

  /** A table row can adjust its vertical alignment. */
  verticalAlign?: SemanticVERTICALALIGNMENTS;

  /** A row may warn a user. */
  warning?: boolean;
}

/**
 * A table can have rows.
 */
export const TableRow: FCX<TableRowProps> = ({ as: ElementType = 'tr', active, cellAs = 'td', cells, children, className, disabled, error, negative, positive, textAlign, verticalAlign, warning, ...rest }) => {

  const classes = getClassName({ active, disabled, error, negative, positive, warning }, [Use.TextAlign, textAlign], [Use.VerticalAlign, verticalAlign], className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {Array.isArray(cells) && cells.map((cell) => TableCell.create(cell, { defaultProps: { as: cellAs } }))}
    </ElementType>
  );
};

TableRow.defaultProps = { as: 'tr', cellAs: 'td' };
TableRow.create = createShorthandFactory(TableRow, (cells) => ({ cells }));
