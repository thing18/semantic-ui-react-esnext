import React, { Children } from 'react';

import { SemanticShorthandContent, getClassName, Use } from '../../lib';

interface StrictPlaceholderHeaderProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A placeholder can contain an image. */
  image?: boolean;
}

interface PlaceholderHeaderProps extends StrictPlaceholderHeaderProps {
  [key: string]: any;
}

/**
 * A placeholder can contain a header.
 */
const PlaceholderHeader: React.FC<PlaceholderHeaderProps> = ({ as, children, className, content, image, ...rest }) => {

  const classes = getClassName([Use.Key, { image }], 'header', className);

  const ElementType = as || 'div';

  return (
    <ElementType {...rest} className={classes}>
      {/* {childrenUtils.isNil(children) ? content : children} */}
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

export { PlaceholderHeader, PlaceholderHeaderProps, StrictPlaceholderHeaderProps };
