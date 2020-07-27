import React from 'react';

import { createHTMLImage, htmlImageProps, partitionHTMLProps, getClassName } from '../../lib';

export interface CommentAvatarProps extends StrictCommentAvatarProps {
  [key: string]: any;
}

export interface StrictCommentAvatarProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Additional classes. */
  className?: string;

  /** Specifies the URL of the image. */
  src?: string;
}

/**
 * A comment can contain an image or avatar.
 */
export const CommentAvatar: React.FC<CommentAvatarProps> = ({ as: ElementType = 'div', className, src, ...unhanled }) => {

  const classes = getClassName('avatar', className);
  const [imageProps, rest] = partitionHTMLProps(unhanled, { htmlProps: htmlImageProps });

  return (
    <ElementType {...rest} className={classes}>
      {createHTMLImage(src, { autoGenerateKey: false, defaultProps: imageProps })}
    </ElementType>
  );
};
