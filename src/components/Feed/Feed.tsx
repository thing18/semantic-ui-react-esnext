import React, { Children, useState } from 'react';

import { SemanticShorthandCollection, getClassName, useKeys } from '../../lib';
import { FeedContent } from './FeedContent';
import { FeedDate } from './FeedDate';
import { FeedEvent, FeedEventProps } from './FeedEvent';
import { FeedExtra } from './FeedExtra';
import { FeedLabel } from './FeedLabel';
import { FeedMeta } from './FeedMeta';
import { FeedLike } from './FeedLike';
import { FeedSummary } from './FeedSummary';
import { FeedUser } from './FeedUser';
import { props } from 'lodash/fp';

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

  const keys = useKeys(events?.length ?? 0);
  const classes = getClassName('ui', size, 'feed', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  if (!Array.isArray(events)) return <ElementType {...rest} className={classes} />;

  return (
    <ElementType {...rest} className={classes}>
      {(events as FeedEventProps[]).map(({ key, childKey, ...p }, index) => <FeedEvent key={key ?? childKey ?? keys[index]}{...p} />)}
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
