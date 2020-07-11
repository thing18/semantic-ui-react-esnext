import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

interface StrictPlaceholderParagraphProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

interface PlaceholderParagraphProps extends StrictPlaceholderParagraphProps {
  [key: string]: any;
}

/**
 * A placeholder can contain a paragraph.
 */
const PlaceholderParagraph: React.FC<PlaceholderParagraphProps> = props => ChildrenOrContent(props, 'paragraph');

export { PlaceholderParagraph, PlaceholderParagraphProps, StrictPlaceholderParagraphProps };
