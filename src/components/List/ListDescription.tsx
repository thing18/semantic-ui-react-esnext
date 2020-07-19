import React, { Children } from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, getClassName } from '../../lib';

interface ListDescriptionProps extends StrictListDescriptionProps {
  [key: string]: any;
}

interface StrictListDescriptionProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

/**
 * A list item can contain a description.
 */
const ListDescription: FCX<ListDescriptionProps> = ({ as = 'div', children, className, content, ...rest }) => {

  const classes = getClassName(className, 'description');
  const ElementType = !!rest.href ? 'a' : as;

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

ListDescription.create = createShorthandFactory(ListDescription, (content) => ({ content }));

export { ListDescription, ListDescriptionProps, StrictListDescriptionProps };
