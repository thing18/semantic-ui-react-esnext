import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

interface FeedDateProps extends StrictFeedDateProps {
  [key: string]: any;
}

interface StrictFeedDateProps {
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
 * An event or an event summary can contain a date.
 */
const FeedDate: React.FC<FeedDateProps> = props => ChildrenOrContent('date', props);

export { FeedDate, FeedDateProps, StrictFeedDateProps };
