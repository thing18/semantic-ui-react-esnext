import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

export interface ItemMetaProps extends StrictItemMetaProps {
  [key: string]: any;
}

export interface StrictItemMetaProps {
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
 * An item can contain content metadata.
 */
export const ItemMeta: FCX<ItemMetaProps> = props => ChildrenOrContent(props, 'meta');

ItemMeta.create = createShorthandFactory(ItemMeta, (content) => ({ content }));
