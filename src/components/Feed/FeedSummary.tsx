import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, createShorthand, getClassName } from '../../lib';
import { FeedUser, FeedUserProps } from './FeedUser';
import { FeedDate, FeedDateProps } from './FeedDate';

interface FeedSummaryProps extends StrictFeedSummaryProps {
  [key: string]: any;
}

interface StrictFeedSummaryProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for FeedDate. */
  date?: SemanticShorthandItem<FeedDateProps>;

  /** Shorthand for FeedUser. */
  user?: SemanticShorthandItem<FeedUserProps>;
}

/**
 * A feed can contain a summary.
 */
const FeedSummary: React.FC<FeedSummaryProps> = ({ as, children, className, content, date, user, ...rest }) => {

  const classes = getClassName('summary', className);
  const ElementType = as || 'div';

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {createShorthand(FeedUser, (val) => ({ content: val }), user, { autoGenerateKey: false })}
      {/*
        Content styles require wrapping whitespace
        https://github.com/Semantic-Org/Semantic-UI-React/pull/3836
      */}
      {content && ' '}
      {content}
      {content && ' '}
      {createShorthand(FeedDate, (val) => ({ content: val }), date, { autoGenerateKey: false })}
    </ElementType>
  );
};

export { FeedSummary, FeedSummaryProps, StrictFeedSummaryProps };
