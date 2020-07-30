import React from 'react';

import { SemanticShorthandContent, SemanticTEXTALIGNMENTS, Use, ChildrenOrContent } from '../../lib';

export interface CardHeaderProps extends StrictCardHeaderProps {
  [key: string]: any;
}

export interface StrictCardHeaderProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A card header can adjust its text alignment. */
  textAlign?: Exclude<SemanticTEXTALIGNMENTS, 'justified'>;
}

/**
 * A card can contain a header.
 */
export const CardHeader: React.FC<CardHeaderProps> = ({ textAlign, ...props }) =>
  ChildrenOrContent(props, [Use.TextAlign, textAlign], 'header');
