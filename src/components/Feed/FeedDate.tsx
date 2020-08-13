import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface FeedDateProps extends StrictFeedDateProps {
  [key: string]: any;
}

export interface StrictFeedDateProps {
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
 * An event or an event summary can contain a date.
 */
export const FeedDate: React.FC<FeedDateProps> = props => ChildrenOrContent(props, 'date');
