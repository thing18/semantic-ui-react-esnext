import React, { Children } from 'react';

import { SemanticFLOATS, SemanticShorthandContent, SemanticShorthandItem, SemanticVERTICALALIGNMENTS, createShorthandFactory, FCX, getClassName, Use } from '../../lib';
import { ListDescription, ListDescriptionProps } from './ListDescription';
import { ListHeader, ListHeaderProps } from './ListHeader';

interface ListContentProps extends StrictListContentProps {
  [key: string]: any;
}

interface StrictListContentProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for ListDescription. */
  description?: SemanticShorthandItem<ListDescriptionProps>;

  /** An list content can be floated left or right. */
  floated?: SemanticFLOATS;

  /** Shorthand for ListHeader. */
  header?: SemanticShorthandItem<ListHeaderProps>;

  /** An element inside a list can be vertically aligned. */
  verticalAlign?: SemanticVERTICALALIGNMENTS;
}

/**
 * A list item can contain a content.
 */
const ListContent: FCX<ListContentProps> = ({ as: ElementType = 'div', children, className, content, description, floated, header, verticalAlign, ...rest }) => {

  const classes = getClassName([Use.ValueKey, { floated }], [Use.VerticalAlign, verticalAlign], 'content', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {ListHeader.create(header)}
      {ListDescription.create(description)}
      {content}
    </ElementType>
  );
};

ListContent.create = createShorthandFactory(ListContent, (content) => ({ content }));

export { ListContent, ListContentProps, StrictListContentProps };
