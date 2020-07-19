import React, { Children } from 'react';

import { SemanticShorthandContent, Use, getClassName, ChildrenOrContent } from '../../lib';

export interface StrictButtonContentProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Initially hidden, visible on hover. */
  hidden?: boolean;

  /** Initially visible, hidden on hover. */
  visible?: boolean;
}

export interface ButtonContentProps extends StrictButtonContentProps {
  [key: string]: any;
}

/**
 * Used in some Button types, such as `animated`.
 */
export const ButtonContent: React.FC<ButtonContentProps> = ({ hidden, visible, ...props }) =>
  ChildrenOrContent(props, { visible, hidden }, 'content');
