import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface FeedUserProps extends StrictFeedUserProps {
  [key: string]: any;
}

export interface StrictFeedUserProps {
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
 * A feed can contain a user element.
 */
export const FeedUser: React.FC<FeedUserProps> = ({ as = 'a', ...props }) =>
  ChildrenOrContent({ as, ...props }, 'user');

FeedUser.defaultProps = { as: 'a' };
