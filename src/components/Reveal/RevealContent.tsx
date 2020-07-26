import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface StrictRevealContentProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A reveal may contain content that is visible before interaction. */
  hidden?: boolean;

  /** A reveal may contain content that is hidden before user interaction. */
  visible?: boolean;
}

export interface RevealContentProps extends StrictRevealContentProps {
  [key: string]: any;
}

/**
 * A content sub-component for the Reveal.
 */
export const RevealContent: React.FC<RevealContentProps> = ({ hidden, visible, ...props }) =>
  ChildrenOrContent(props, 'ui', { hidden, visible }, 'content');
