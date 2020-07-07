import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

interface ItemMetaProps extends StrictItemMetaProps {
  [key: string]: any;
}

interface StrictItemMetaProps {
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
 * An item can contain content metadata.
 */
const ItemMeta: FCX<ItemMetaProps> = props => ChildrenOrContent('meta', props);

ItemMeta.create = createShorthandFactory(ItemMeta, (content) => ({ content }));

export { ItemMeta, ItemMetaProps, StrictItemMetaProps };
