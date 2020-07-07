import React from 'react';

import { SemanticShorthandContent, childrenUtils, createShorthandFactory, FCX, getClassNames, ChildrenOrContent } from '../../lib';

interface ListHeaderProps extends StrictListHeaderProps {
  [key: string]: any;
}

interface StrictListHeaderProps {
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
 * A list item can contain a header.
 */
const ListHeader: FCX<ListHeaderProps> = props => ChildrenOrContent('header', props);

ListHeader.create = createShorthandFactory(ListHeader, (content) => ({ content }));

export { ListHeader, ListHeaderProps, StrictListHeaderProps };
