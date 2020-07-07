import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, SemanticVERTICALALIGNMENTS, getClassName, Use } from '../../lib';
import { ItemDescriptionProps, ItemDescription } from './ItemDescription';
import { ItemExtraProps, ItemExtra } from './ItemExtra';
import { ItemHeaderProps, ItemHeader } from './ItemHeader';
import { ItemMetaProps, ItemMeta } from './ItemMeta';

interface ItemContentProps extends StrictItemContentProps {
  [key: string]: any;
}

interface StrictItemContentProps {
  /** An element type to render as (string or function). */
  as?: any;

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
const ItemContent: React.FC<ItemContentProps> = ({ as, children, className, content, description, extra, header, meta, verticalAlign, ...rest }) => {

  const classes = getClassName([Use.VerticalAlign, verticalAlign], 'content', className);
  const ElementType = as || 'div';

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

export { ItemContent, ItemContentProps, StrictItemContentProps };
