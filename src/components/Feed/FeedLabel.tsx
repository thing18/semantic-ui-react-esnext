import React, { Children } from 'react';

import { HtmlImageProps, SemanticShorthandContent, SemanticShorthandItem, createHTMLImage, getClassName } from '../../lib';
import { Icon, IconProps } from '../Icon';

export interface FeedLabelProps extends StrictFeedLabelProps {
  [key: string]: any;
}

export interface StrictFeedLabelProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** An event can contain icon label. */
  icon?: SemanticShorthandItem<IconProps>;

  /** An event can contain image label. */
  image?: SemanticShorthandItem<HtmlImageProps>;
}

/**
 * An event can contain an image or icon label.
 */
export const FeedLabel: React.FC<FeedLabelProps> = ({ as: ElementType = 'div', children, className, content, icon, image, ...rest }) => {

  const classes = getClassName('label', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {content}
      {Icon.create(icon, { autoGenerateKey: false })}
      {createHTMLImage(image)}
    </ElementType>
  );
};
