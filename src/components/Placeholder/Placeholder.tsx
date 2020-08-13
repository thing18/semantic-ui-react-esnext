import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

import { PlaceholderHeader } from './PlaceholderHeader';
import { PlaceholderImage } from './PlaceholderImage';
import { PlaceholderLine } from './PlaceholderLine';
import { PlaceholderParagraph } from './PlaceholderParagraph';

interface StrictPlaceholderProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A fluid placeholder takes up the width of its container. */
  fluid?: boolean;

  /** A placeholder can have their colors inverted. */
  inverted?: boolean;
}

interface PlaceholderProps extends StrictPlaceholderProps {
  [key: string]: any;
}

interface CPlaceholder extends React.FC<PlaceholderProps> {
  Header: typeof PlaceholderHeader;
  Line: typeof PlaceholderLine;
  Image: typeof PlaceholderImage;
  Paragraph: typeof PlaceholderParagraph;
}

/**
 * A placeholder is used to reserve splace for content that soon will appear in a layout.
 */
const Placeholder: CPlaceholder = ({ fluid, inverted, ...props }) =>
  ChildrenOrContent(props, 'ui', { fluid, inverted }, 'placeholder');

Placeholder.Header = PlaceholderHeader;
Placeholder.Image = PlaceholderImage;
Placeholder.Line = PlaceholderLine;
Placeholder.Paragraph = PlaceholderParagraph;

export { Placeholder, PlaceholderProps, StrictPlaceholderProps };
