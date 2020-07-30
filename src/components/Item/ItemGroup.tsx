import React, { Children } from 'react';

import { SemanticShorthandCollection, SemanticShorthandContent, getClassName, Use, useKeys } from '../../lib';
import { Item, ItemProps } from './Item';

export interface ItemGroupProps extends StrictItemGroupProps {
  [key: string]: any;
}

export interface StrictItemGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Items can be divided to better distinguish between grouped content. */
  divided?: boolean;

  /** Shorthand array of props for Item. */
  items?: SemanticShorthandCollection<ItemProps>;

  /** An item can be formatted so that the entire contents link to another page. */
  link?: boolean;

  /** A group of items can relax its padding to provide more negative space. */
  relaxed?: boolean | 'very';

  /** Prevent items from stacking on mobile. */
  unstackable?: boolean;
}

/**
 * A group of items.
 */
export const ItemGroup: React.FC<ItemGroupProps> = ({ as: ElementType = 'div', children, className, content, divided, items, link, relaxed, unstackable, ...rest }) => {

  const keys = useKeys(items?.length ?? 0);
  const classes = getClassName('ui', { divided, link, unstackable }, [Use.KeyOrValueKey, { relaxed }], 'items', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }
  if (content != null) {
    return (
      <ElementType {...rest} className={classes}>
        {content}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {items && (items as ItemProps[]).map(({ childKey, ...props }, index) => <Item {...props} key={props.keys ?? childKey ?? keys[index]} />)}
    </ElementType>
  );
};
