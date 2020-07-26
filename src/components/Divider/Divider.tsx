import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface StrictDividerProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Divider can clear the content above it. */
  clearing?: boolean;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Divider can be fitted without any space above or below it. */
  fitted?: boolean;

  /** Divider can divide content without creating a dividing line. */
  hidden?: boolean;

  /** Divider can segment content horizontally. */
  horizontal?: boolean;

  /** Divider can have its colours inverted. */
  inverted?: boolean;

  /** Divider can provide greater margins to divide sections of content. */
  section?: boolean;

  /** Divider can segment content vertically. */
  vertical?: boolean;
}

export interface DividerProps extends StrictDividerProps {
  [key: string]: any;
}

/**
 * A divider visually segments content into groups.
 */
export const Divider: React.FC<DividerProps> = ({ clearing, fitted, hidden, horizontal, inverted, section, vertical, ...props }) =>
  ChildrenOrContent(props, 'ui', { clearing, fitted, hidden, horizontal, inverted, section, vertical }, 'divider');
