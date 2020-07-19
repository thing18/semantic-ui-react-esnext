import React, { Children } from 'react';

import { HtmlImageProps, SemanticShorthandContent, SemanticShorthandCollection, createHTMLImage, getClassName } from '../../lib';

interface FeedExtraProps extends StrictFeedExtraProps {
  [key: string]: any;
}

interface StrictFeedExtraProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** An event can contain additional information like a set of images. */
  images?: boolean | SemanticShorthandCollection<HtmlImageProps>[];

  /** An event can contain additional text information. */
  text?: boolean;
}

/**
 * A feed can contain an extra content.
 */
const FeedExtra: React.FC<FeedExtraProps> = ({ as: ElementType = 'div', children, className, content, images, text, ...rest }) => {

  const classes = getClassName({ images, text: content || text } as any, 'extra', className);

  if (!Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  // TODO need a "collection factory" to handle creating multiple image elements and their keys
  const imageElements = Array.isArray(images) && images.map((image, index) => createHTMLImage(image, { key: [index, image].join('-') }));

  return (
    <ElementType {...rest} className={classes}>
      {content}
      {imageElements}
    </ElementType>
  );
};

export { FeedExtra, FeedExtraProps, StrictFeedExtraProps };
