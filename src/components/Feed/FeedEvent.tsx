import React from 'react';

import { createShorthand, SemanticShorthandItem, getClassName } from '../../lib';
import { FeedContent, FeedContentProps } from './FeedContent';
import { FeedDateProps } from './FeedDate';
import { FeedLabelProps, FeedLabel } from './FeedLabel';
import { FeedMetaProps } from './FeedMeta';
import { FeedSummaryProps } from './FeedSummary';
import { FeedExtraProps } from './FeedExtra';

export interface FeedEventProps extends StrictFeedEventProps {
  [key: string]: any;
}

export interface StrictFeedEventProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for FeedContent. */
  content?: SemanticShorthandItem<FeedContentProps>;

  /** Shorthand for FeedDate. */
  date?: SemanticShorthandItem<FeedDateProps>;

  /** Shorthand for FeedExtra with images. */
  extraImages?: SemanticShorthandItem<FeedExtraProps>;

  /** Shorthand for FeedExtra with content. */
  extraText?: SemanticShorthandItem<FeedExtraProps>;

  /** An event can contain icon label. */
  icon?: SemanticShorthandItem<FeedLabelProps>;

  /** An event can contain image label. */
  image?: SemanticShorthandItem<FeedLabelProps>;

  /** Shorthand for FeedMeta. */
  meta?: SemanticShorthandItem<FeedMetaProps>;

  /** Shorthand for FeedSummary. */
  summary?: SemanticShorthandItem<FeedSummaryProps>;
}

/**
 * A feed contains an event.
 */
export const FeedEvent: React.FC<FeedEventProps> = ({ as: ElementType = 'div', content, children, className, date, extraImages, extraText, image, icon, meta, summary, ...rest }) => {

  const hasContentProp = content || date || extraImages || extraText || meta || summary;

  return (
    <ElementType {...rest} className={getClassName('event', className)}>
      {createShorthand(FeedLabel, (val) => ({ icon: val }), icon, { autoGenerateKey: false })}
      {createShorthand(FeedLabel, (val) => ({ image: val }), image, { autoGenerateKey: false })}
      {hasContentProp && <FeedContent content={content} date={date} extraImages={extraImages} extraText={extraText} meta={meta} summary={summary} />}
      {children}
    </ElementType>
  );
};
