import React from 'react';
import { SemanticShorthandContent, FCX, ChildrenOrContent, createShorthandFactory } from '../../lib';

export interface PopupContentProps extends StrictPopupContentProps {
  [key: string]: any;
}

export interface StrictPopupContentProps {
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
 * A PopupContent displays the content body of a Popover.
 */
export const PopupContent: FCX<PopupContentProps> = props => ChildrenOrContent(props, 'content');

PopupContent.create = createShorthandFactory(PopupContent, (children) => ({ children }));
