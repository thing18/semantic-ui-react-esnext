import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, getClassName, ChildrenOrContent } from '../../lib';

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
const ListDescription: FCX<ListDescriptionProps> = ({ className, ...props }) =>
  ChildrenOrContent({ ...props, className: getClassName(className, 'description') });

ListDescription.create = createShorthandFactory(ListDescription, (content) => ({ content }));

export { ListDescription, ListDescriptionProps, StrictListDescriptionProps };
