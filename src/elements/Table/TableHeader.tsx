import React, { Children } from 'react';

import { SemanticShorthandContent, getClassName, Use } from '../../lib';

export interface TableHeaderProps extends StrictTableHeaderProps {
  [key: string]: any;
}

export interface StrictTableHeaderProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A definition table can have a full width header or footer, filling in the gap left by the first column. */
  fullWidth?: boolean;
}

/**
 * A table can have a header.
 */
export const TableHeader: React.FC<TableHeaderProps> = ({ as: ElementType = 'thead', children, className, content, fullWidth, ...rest }) => (
  <ElementType {...rest} className={getClassName([Use.Key, { 'full-width': fullWidth }], className)}>
    {Children.count(children) ? children : content}
  </ElementType>
);

TableHeader.defaultProps = { as: 'thead' };
