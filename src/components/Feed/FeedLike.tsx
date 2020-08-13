import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, getClassName } from '../../lib';
import { Icon, IconProps } from '../Icon';

export interface FeedLikeProps extends StrictFeedLikeProps {
  [key: string]: any;
}

export interface StrictFeedLikeProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for icon. Mutually exclusive with children. */
  icon?: SemanticShorthandItem<IconProps>;
}

/**
 * A feed can contain a like element.
 */
export const FeedLike: React.FC<FeedLikeProps> = ({ as: ElementType = 'a', children, className, content, icon, ...rest }) => {

  const classes = getClassName('like', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {content}
    </ElementType>
  );
};

FeedLike.defaultProps = { as: 'a' };
