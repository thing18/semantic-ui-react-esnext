import React from 'react';
import { SemanticShorthandContent, ChildrenOrContent, FCX, createShorthandFactory } from '../../lib';

export interface PopupHeaderProps extends StrictPopupHeaderProps {
  [key: string]: any;
}

export interface StrictPopupHeaderProps {
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
 * A PopupHeader displays a header in a Popover.
 */
export const PopupHeader: FCX<PopupHeaderProps> = props => ChildrenOrContent(props, 'header');

PopupHeader.create = createShorthandFactory(PopupHeader, (children) => ({ children }));
