import React, { isValidElement, useCallback, Children } from 'react';

import { createShorthandFactory, FCX, SemanticShorthandItem, isPlainObject, getClassName, Use, SemanticProps } from '../../lib';
import { Image, ImageProps } from '..';
import { ListContent, ListContentProps } from './ListContent';
import { ListDescription, ListDescriptionProps } from './ListDescription';
import { ListHeader, ListHeaderProps } from './ListHeader';
import { ListIcon, ListIconProps } from './ListIcon';

export interface StrictListItemProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A list item can active. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandItem<ListContentProps>;

  /** Shorthand for ListDescription. */
  description?: SemanticShorthandItem<ListDescriptionProps>;

  /** A list item can disabled. */
  disabled?: boolean;

  /** Shorthand for ListHeader. */
  header?: SemanticShorthandItem<ListHeaderProps>;

  /** Shorthand for ListIcon. */
  icon?: SemanticShorthandItem<ListIconProps>;

  /** Shorthand for Image. */
  image?: SemanticShorthandItem<ImageProps>;

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: ListItemProps) => void;

  /** A value for an ordered list. */
  value?: string;
}

export type ListItemProps = SemanticProps<StrictListItemProps>;

/**
 * A list item can contain a set of items.
 */
export const ListItem: FCX<ListItemProps> = (props) => {

  const { as = 'div', active, children, className, content, description, disabled, header, icon, image, onClick, value, ...rest } = props;

  const handleClick = useCallback((e) => !disabled && onClick?.call(null, e, props), []);

  const ElementType = !!rest.href ? 'a' : as;
  const valueProp = ElementType === 'li' ? { value } : { 'data-value': value };

  const classes = getClassName([Use.Key, { active, disabled, item: ElementType !== 'li' }], className);

  if (Children.count(children)) {
    return (
      <ElementType {...valueProp} role='listitem' className={classes} onClick={handleClick} {...rest}>
        {children}
      </ElementType>
    );
  }

  const iconElement = ListIcon.create(icon, { autoGenerateKey: false });
  const imageElement = Image.create(image, { autoGenerateKey: false });

  // See description of `content` prop for explanation about why this is necessary.
  if (!isValidElement(content) && isPlainObject(content)) {
    return (
      <ElementType {...valueProp} role='listitem' className={classes} onClick={handleClick} {...rest}>
        {iconElement || imageElement}
        {ListContent.create(content, { autoGenerateKey: false, defaultProps: { header, description } })}
      </ElementType>
    );
  }

  const headerElement = ListHeader.create(header, { autoGenerateKey: false });
  const descriptionElement = ListDescription.create(description, { autoGenerateKey: false });

  if (iconElement || imageElement) {
    return (
      <ElementType {...valueProp} role='listitem' className={classes} onClick={handleClick} {...rest} >
        {iconElement || imageElement}
        {(content || headerElement || descriptionElement) && (
          <ListContent>
            {headerElement}
            {descriptionElement}
            {content}
          </ListContent>
        )}
      </ElementType>
    );
  }

  return (
    <ElementType {...valueProp} role='listitem' className={classes} onClick={handleClick} {...rest} >
      {headerElement}
      {descriptionElement}
      {content}
    </ElementType>
  );
};

ListItem.create = createShorthandFactory(ListItem, (content) => ({ content }));
