import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

interface ItemDescriptionProps extends StrictItemDescriptionProps {
  [key: string]: any;
}

interface StrictItemDescriptionProps {
  /** An element type to render as (string or function). */
  as?: any;

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
const ItemDescription: FCX<ItemDescriptionProps> = props => ChildrenOrContent(props, 'description');

ItemDescription.create = createShorthandFactory(ItemDescription, (content) => ({ content }));

export { ItemDescription, ItemDescriptionProps, StrictItemDescriptionProps };
