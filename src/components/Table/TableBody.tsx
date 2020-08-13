import React from 'react';
// import { getClassName } from '../../lib';

export interface TableBodyProps extends StrictTableBodyProps {
  [key: string]: any;
}

export interface StrictTableBodyProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({ as: ElementType = 'tbody', children, ...rest }) => (
  <ElementType {...rest} >
    {children}
  </ElementType>
);

TableBody.defaultProps = { as: 'tbody' };
