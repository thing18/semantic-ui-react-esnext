import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, SemanticVERTICALALIGNMENTS, getClassName, Use } from '../../lib';
import { ItemDescriptionProps, ItemDescription } from './ItemDescription';
import { ItemExtraProps, ItemExtra } from './ItemExtra';
import { ItemHeaderProps, ItemHeader } from './ItemHeader';
import { ItemMetaProps, ItemMeta } from './ItemMeta';

export interface ItemContentProps extends StrictItemContentProps {
  [key: string]: any;
}

export interface StrictItemContentProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for ItemDescription component. */
  description?: SemanticShorthandItem<ItemDescriptionProps>;

  /** Shorthand for ItemExtra component. */
  extra?: SemanticShorthandItem<ItemExtraProps>;

  /** Shorthand for ItemHeader component. */
  header?: SemanticShorthandItem<ItemHeaderProps>;

  /** Shorthand for ItemMeta component. */
  meta?: SemanticShorthandItem<ItemMetaProps>;

  /** Content can specify its vertical alignment. */
  verticalAlign?: SemanticVERTICALALIGNMENTS;
}

/**
 * An item can contain content.
 */
export const ItemContent: React.FC<ItemContentProps> = ({ as: ElementType = 'div', children, className, content, description, extra, header, meta, verticalAlign, ...rest }) => {

  const classes = getClassName([Use.VerticalAlign, verticalAlign], 'content', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {ItemHeader.create(header, { autoGenerateKey: false })}
      {ItemMeta.create(meta, { autoGenerateKey: false })}
      {ItemDescription.create(description, { autoGenerateKey: false })}
      {ItemExtra.create(extra, { autoGenerateKey: false })}
      {content}
    </ElementType>
  );
};
