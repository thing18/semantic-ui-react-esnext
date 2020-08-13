import React from 'react';

import { SemanticShorthandContent, SemanticTEXTALIGNMENTS, ChildrenOrContent, Use } from '../../lib';

export interface CardDescriptionProps extends StrictCardDescriptionProps {
  [key: string]: any;
}

export interface StrictCardDescriptionProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A card description can adjust its text alignment. */
  textAlign?: Exclude<SemanticTEXTALIGNMENTS, 'justified'>;
}

/**
 * A card can contain a description with one or more paragraphs.
 */
export const CardDescription: React.FC<CardDescriptionProps> = ({ textAlign, ...props }) =>
  ChildrenOrContent(props, [Use.TextAlign, textAlign], 'description');
