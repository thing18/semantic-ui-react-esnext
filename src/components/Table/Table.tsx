import React, { Children } from 'react';

import { SemanticCOLORS, SemanticShorthandCollection, SemanticShorthandItem, SemanticVERTICALALIGNMENTS, SemanticWIDTHS, SemanticTEXTALIGNMENTS, getClassName, Use } from '../../lib';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow, TableRowProps } from './TableRow';

export interface TableProps extends StrictTableProps {
  [key: string]: any;
}

export interface StrictTableProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Attach table to other content */
  attached?: boolean | 'top' | 'bottom';

  /** A table can reduce its complexity to increase readability. */
  basic?: boolean | 'very';

  /** A table may be divided each row into separate cells. */
  celled?: boolean | 'internally';

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A table can be collapsing, taking up only as much space as its rows. */
  collapsing?: boolean;

  /** A table can be given a color to distinguish it from other tables. */
  color?: SemanticCOLORS;

  /** A table can specify its column count to divide its content evenly. */
  columns?: SemanticWIDTHS;

  /** A table may sometimes need to be more compact to make more rows visible at a time. */
  compact?: boolean | 'very';

  /** A table may be formatted to emphasize a first column that defines a rows content. */
  definition?: boolean;

  /**
   * A table can use fixed a special faster form of table rendering that does not resize table cells based on content.
   */
  fixed?: boolean;

  /** Shorthand for a TableRow to be placed within Table.Footer. */
  footerRow?: SemanticShorthandItem<TableRowProps>;

  /** Shorthand for a TableRow to be placed within Table.Header. */
  headerRow?: SemanticShorthandItem<TableRowProps>;

  /** Shorthand for multiple TableRows to be placed within Table.Header. */
  headerRows?: SemanticShorthandCollection<TableRowProps>;

  /** A table's colors can be inverted. */
  inverted?: boolean;

  /** A table may sometimes need to be more padded for legibility. */
  padded?: boolean | 'very';

  /**
   * Mapped over `tableData` and should return shorthand for each Table.Row to be placed within Table.Body.
   *
   * @param {*} data - An element in the `tableData` array.
   * @param {number} index - The index of the current element in `tableData`.
   * @returns {*} Shorthand for a Table.Row.
   */
  renderBodyRow?: (data: any, index: number) => any;

  /** A table can have its rows appear selectable. */
  selectable?: boolean;

  /** A table can specify that its cell contents should remain on a single line and not wrap. */
  singleLine?: boolean;

  /** A table can also be small or large. */
  size?: 'small' | 'large';

  /** A table may allow a user to sort contents by clicking on a table header. */
  sortable?: boolean;

  /** A table can specify how it stacks table content responsively. */
  stackable?: boolean;

  /** A table can stripe alternate rows of content with a darker color to increase contrast. */
  striped?: boolean;

  /** A table can be formatted to display complex structured data. */
  structured?: boolean;

  /** Data to be passed to the renderBodyRow function. */
  tableData?: any[];

  /** A table can adjust its text alignment. */
  textAlign?: Exclude<SemanticTEXTALIGNMENTS, 'justified'>;

  /** A table can specify how it stacks table content responsively. */
  unstackable?: boolean;

  /** A table can adjust its text alignment. */
  verticalAlign?: SemanticVERTICALALIGNMENTS;
}

interface CTable extends React.FC<TableProps> {
  Body: typeof TableBody;
  Cell: typeof TableCell;
  Footer: typeof TableFooter;
  Header: typeof TableHeader;
  HeaderCell: typeof TableHeaderCell;
  Row: typeof TableRow;
}
/**
 * A table displays a collections of data grouped into rows.
 */
export const Table: CTable = ({ as: ElementType = 'table', attached, basic, celled, children, className, collapsing, color, columns, compact, definition, fixed, footerRow, headerRow, headerRows, inverted, padded, renderBodyRow, selectable, singleLine, size, sortable, stackable, striped, structured, tableData, textAlign, unstackable, verticalAlign, ...rest }) => {

  const classes = getClassName(
    'ui', color, size,
    // tslint:disable-next-line: object-shorthand-properties-first
    [Use.Key, { celled, collapsing, definition, fixed, inverted, selectable, 'single line': singleLine, sortable, stackable, striped, structured, unstackable }],
    [Use.KeyOrValueKey, { attached, basic, compact, padded }],
    [Use.TextAlign, textAlign], [Use.VerticalAlign, verticalAlign],
    [Use.Width, columns, 'column'],
    'table', className,
  );

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const hasHeaderRows = headerRow || headerRows;
  const headerShorthandOptions = { defaultProps: { cellAs: 'th' } };
  const headerElement = hasHeaderRows && (
    <TableHeader>
      {TableRow.create(headerRow, headerShorthandOptions)}
      {headerRows!.map((data) => TableRow.create(data, headerShorthandOptions))}
    </TableHeader>
  );

  return (
    <ElementType {...rest} className={classes}>
      {headerElement}
      <TableBody>
        {renderBodyRow &&
          tableData!.map((data, index) => TableRow.create(renderBodyRow(data, index)))}
      </TableBody>
      {footerRow && <TableFooter>{TableRow.create(footerRow)}</TableFooter>}
    </ElementType>
  );
};

Table.defaultProps = { as: 'table' };
Table.Body = TableBody;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Header = TableHeader;
Table.HeaderCell = TableHeaderCell;
Table.Row = TableRow;
