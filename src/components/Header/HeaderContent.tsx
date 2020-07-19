import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface StrictHeaderContentProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

export interface HeaderContentProps extends StrictHeaderContentProps {
  [key: string]: any;
}

/**
 * Header content wraps the main content when there is an adjacent Icon or Image.
 */
export const HeaderContent: React.FC<HeaderContentProps> = props => ChildrenOrContent(props, 'content');
