import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, createShorthand, getClassName } from '../../lib';
import { FeedDateProps, FeedDate } from './FeedDate';
import { FeedExtraProps, FeedExtra } from './FeedExtra';
import { FeedMetaProps, FeedMeta } from './FeedMeta';
import { FeedSummaryProps, FeedSummary } from './FeedSummary';

export interface FeedContentProps extends StrictFeedContentProps {
  [key: string]: any;
}

export interface StrictFeedContentProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** An event can contain a date. */
  date?: SemanticShorthandItem<FeedDateProps>;

  /** Shorthand for FeedExtra with images. */
  extraImages?: SemanticShorthandItem<FeedExtraProps>;

  /** Shorthand for FeedExtra with text. */
  extraText?: SemanticShorthandItem<FeedExtraProps>;

  /** Shorthand for FeedMeta. */
  meta?: SemanticShorthandItem<FeedMetaProps>;

  /** Shorthand for FeedSummary. */
  summary?: SemanticShorthandItem<FeedSummaryProps>;
}

export const FeedContent: React.FC<FeedContentProps> = ({ as: ElementType = 'div', children, className, content, extraImages, extraText, date, meta, summary, ...rest }) => {

  const classes = getClassName('content', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {createShorthand(FeedDate, (val) => ({ content: val }), date, { autoGenerateKey: false })}
      {createShorthand(FeedSummary, (val) => ({ content: val }), summary, { autoGenerateKey: false })}
      {content}
      {createShorthand(FeedExtra, (val) => ({ text: true, content: val }), extraText, { autoGenerateKey: false })}
      {createShorthand(FeedExtra, (val) => ({ images: val }), extraImages, { autoGenerateKey: false })}
      {createShorthand(FeedMeta, (val) => ({ content: val }), meta, { autoGenerateKey: false })}
    </ElementType>
  );
};
