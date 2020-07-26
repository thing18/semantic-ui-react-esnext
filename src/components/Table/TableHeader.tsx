import React, { Children } from 'react';

import { SemanticShorthandContent, getClassName, Use, ChildrenOrContent } from '../../lib';

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
export const TableHeader: React.FC<TableHeaderProps> = ({ as = 'thead', fullWidth, ...props }) =>
  ChildrenOrContent({ as, ...props }, { 'full-width': fullWidth });

TableHeader.defaultProps = { as: 'thead' };
