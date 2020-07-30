import React from 'react';

import { SemanticShorthandContent, SemanticTEXTALIGNMENTS, ChildrenOrContent, Use } from '../../lib';

export interface CardMetaProps extends StrictCardMetaProps {
  [key: string]: any;
}

export interface StrictCardMetaProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A card meta can adjust its text alignment. */
  textAlign?: Exclude<SemanticTEXTALIGNMENTS, 'justified'>;
}

/**
 * A card can contain content metadata.
 */
export const CardMeta: React.FC<CardMetaProps> = ({ textAlign, ...props }) =>
  ChildrenOrContent(props, [Use.TextAlign, textAlign], 'meta');
