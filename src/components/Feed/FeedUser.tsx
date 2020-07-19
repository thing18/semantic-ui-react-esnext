import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

interface FeedUserProps extends StrictFeedUserProps {
  [key: string]: any;
}

interface StrictFeedUserProps {
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
 * A feed can contain a user element.
 */
const FeedUser: React.FC<FeedUserProps> = ({ as = 'a', ...rest }) => ChildrenOrContent({ as, ...rest }, 'user');

FeedUser.defaultProps = { as: 'a' };

export { FeedUser, FeedUserProps, StrictFeedUserProps };
