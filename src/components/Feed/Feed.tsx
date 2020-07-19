import React, { Children } from 'react';

import { SemanticShorthandCollection, getClassName } from '../../lib';
import { FeedContent } from './FeedContent';
import { FeedDate } from './FeedDate';
import { FeedEvent, FeedEventProps } from './FeedEvent';
import { FeedExtra } from './FeedExtra';
import { FeedLabel } from './FeedLabel';
import { FeedMeta } from './FeedMeta';
import { FeedLike } from './FeedLike';
import { FeedSummary } from './FeedSummary';
import { FeedUser } from './FeedUser';

interface FeedProps extends StrictFeedProps {
  [key: string]: any;
}

interface StrictFeedProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand array of props for FeedEvent. */
  events?: SemanticShorthandCollection<FeedEventProps>;

  /** A feed can have different sizes. */
  size?: 'small' | 'large';
}

interface CFeed extends React.FC<FeedProps> {
  Content: typeof FeedContent;
  Date: typeof FeedDate;
  Event: typeof FeedEvent;
  Extra: typeof FeedExtra;
  Label: typeof FeedLabel;
  Meta: typeof FeedMeta;
  Like: typeof FeedLike;
  Summary: typeof FeedSummary;
  User: typeof FeedUser;
}

/**
 * A feed presents user activity chronologically.
 */
const Feed: CFeed = ({ as: ElementType = 'div', children, className, events, size, ...rest }) => {

  const classes = getClassName('ui', size, 'feed', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const eventElements = Array.isArray(events)
    ? events.map(({ childKey, date, meta, summary, ...data }: any) => <FeedEvent date={date} key={childKey || [date, meta, summary].join('-')} meta={meta} summary={summary} {...data} />)
    : null;

  return (
    <ElementType {...rest} className={classes}>
      {eventElements}
    </ElementType>
  );
};

Feed.Content = FeedContent;
Feed.Date = FeedDate;
Feed.Event = FeedEvent;
Feed.Extra = FeedExtra;
Feed.Label = FeedLabel;
Feed.Like = FeedLike;
Feed.Meta = FeedMeta;
Feed.Summary = FeedSummary;
Feed.User = FeedUser;

export { Feed, FeedProps, StrictFeedProps };
