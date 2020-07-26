import React from 'react';

import { SemanticCOLORS, SemanticShorthandContent, SemanticSIZES, getClassName, Use, ChildrenOrContent } from '../../lib';

export interface StrictLabelGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Labels can share shapes. */
  circular?: boolean;

  /** Additional classes. */
  className?: string;

  /** Label group can share colors together. */
  color?: SemanticCOLORS;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Label group can share sizes together. */
  size?: SemanticSIZES;

  /** Label group can share tag formatting. */
  tag?: boolean;
}

export interface LabelGroupProps extends StrictLabelGroupProps {
  [key: string]: any;
}

/**
 * A label can be grouped.
 */
export const LabelGroup: React.FC<LabelGroupProps> = ({ circular, color, size, tag, ...props }) =>
  ChildrenOrContent(props, 'ui', color, size, { circular, tag }, 'labels');
