import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, getClassName } from '../../lib';
import { ItemContent } from './ItemContent';
import { ItemDescription, ItemDescriptionProps } from './ItemDescription';
import { ItemExtra, ItemExtraProps } from './ItemExtra';
import { ItemGroup } from './ItemGroup';
import { ItemHeader, ItemHeaderProps } from './ItemHeader';
import { ItemImage, ItemImageProps } from './ItemImage';
import { ItemMeta, ItemMetaProps } from './ItemMeta';

export interface ItemProps extends StrictItemProps {
  [key: string]: any;
}

export interface StrictItemProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for ItemContent component. */
  content?: SemanticShorthandContent;

  /** Shorthand for ItemDescription component. */
  description?: SemanticShorthandItem<ItemDescriptionProps>;

  /** Shorthand for ItemExtra component. */
  extra?: SemanticShorthandItem<ItemExtraProps>;

  /** Shorthand for ItemHeader component. */
  header?: SemanticShorthandItem<ItemHeaderProps>;

  /** Shorthand for ItemImage component. */
  image?: SemanticShorthandItem<ItemImageProps>;

  /** Shorthand for ItemMeta component. */
  meta?: SemanticShorthandItem<ItemMetaProps>;
}

interface CItem extends React.FC<ItemProps> {
  Content: typeof ItemContent;
  Description: typeof ItemDescription;
  Extra: typeof ItemExtra;
  Group: typeof ItemGroup;
  Header: typeof ItemHeader;
  Image: typeof ItemImage;
  Meta: typeof ItemMeta;
}

/**
 * An item view presents large collections of site content for display.
 */
export const Item: CItem = ({ as: ElementType = 'div', children, className, content, description, extra, header, image, meta, ...rest }) => {

  const classes = getClassName('item', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {ItemImage.create(image, { autoGenerateKey: false })}

      <ItemContent
        content={content}
        description={description}
        extra={extra}
        header={header}
        meta={meta}
      />
    </ElementType>
  );
};

Item.Content = ItemContent;
Item.Description = ItemDescription;
Item.Extra = ItemExtra;
Item.Group = ItemGroup;
Item.Header = ItemHeader;
Item.Image = ItemImage;
Item.Meta = ItemMeta;
