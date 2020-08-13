import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

export interface ItemExtraProps extends StrictItemExtraProps {
  [key: string]: any;
}

export interface StrictItemExtraProps {
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
 * An item can contain extra content meant to be formatted separately from the main content.
 */
export const ItemExtra: FCX<ItemExtraProps> = props => ChildrenOrContent(props, 'extra');

ItemExtra.create = createShorthandFactory(ItemExtra, (content) => ({ content }));
