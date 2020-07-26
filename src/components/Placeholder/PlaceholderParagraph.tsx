import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface StrictPlaceholderParagraphProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

export interface PlaceholderParagraphProps extends StrictPlaceholderParagraphProps {
  [key: string]: any;
}

/**
 * A placeholder can contain a paragraph.
 */
export const PlaceholderParagraph: React.FC<PlaceholderParagraphProps> = props =>
  ChildrenOrContent(props, 'paragraph');
