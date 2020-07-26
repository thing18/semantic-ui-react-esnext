import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface StrictSegmentInlineProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

export interface SegmentInlineProps extends StrictSegmentInlineProps {
  [key: string]: any;
}

/**
 * A placeholder segment can be inline.
 */
export const SegmentInline: React.FC<SegmentInlineProps> = props => ChildrenOrContent(props, 'inline');
