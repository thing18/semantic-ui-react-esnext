import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

export interface ItemHeaderProps extends StrictItemHeaderProps {
  [key: string]: any;
}

export interface StrictItemHeaderProps {
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
 * An item can contain a header.
 */
export const ItemHeader: FCX<ItemHeaderProps> = props => ChildrenOrContent(props, 'header');

ItemHeader.create = createShorthandFactory(ItemHeader, (content) => ({ content }));
