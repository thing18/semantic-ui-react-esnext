import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, createShorthand, getClassName } from '../../lib';
import { FeedLike, FeedLikeProps } from './FeedLike';

export interface FeedMetaProps extends StrictFeedMetaProps {
  [key: string]: any;
}

export interface StrictFeedMetaProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for FeedLike. */
  like?: SemanticShorthandItem<FeedLikeProps>;
}
/**
 * A feed can contain a meta.
 */
export const FeedMeta: React.FC<FeedLikeProps> = ({ as: ElementType = 'div', children, className, content, like, ...rest }) => {

  const classes = getClassName('meta', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {createShorthand(FeedLike, (val) => ({ content: val }), like, { autoGenerateKey: false })}
      {content}
    </ElementType>
  );
};
