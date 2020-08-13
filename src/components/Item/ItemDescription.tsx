import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

export interface ItemDescriptionProps extends StrictItemDescriptionProps {
  [key: string]: any;
}

export interface StrictItemDescriptionProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

/**
 * An item can contain a description with a single or multiple paragraphs.
 */
export const ItemDescription: FCX<ItemDescriptionProps> = props => ChildrenOrContent(props, 'description');

ItemDescription.create = createShorthandFactory(ItemDescription, (content) => ({ content }));
