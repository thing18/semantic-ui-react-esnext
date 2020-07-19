import React from 'react';

import { createHTMLImage, htmlImageProps, partitionHTMLProps, getClassName } from '../../lib';

interface CommentAvatarProps extends StrictCommentAvatarProps {
  [key: string]: any;
}

interface StrictCommentAvatarProps {
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
const CommentAvatar: React.FC<CommentAvatarProps> = ({ as: ElementType = 'div', className, src, ...rest }) => {

  const classes = getClassName('avatar', className);
  const [imageProps, rootProps] = partitionHTMLProps(rest, { htmlProps: htmlImageProps });

  return (
    <ElementType {...rootProps} className={classes}>
      {createHTMLImage(src, { autoGenerateKey: false, defaultProps: imageProps })}
    </ElementType>
  );
};

export { CommentAvatar, CommentAvatarProps, StrictCommentAvatarProps };
