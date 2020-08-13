import React, { useCallback, Children } from 'react';

import { SemanticCOLORS, SemanticShorthandContent, SemanticShorthandItem, getClassName } from '../../lib';
import { Image, ImageProps } from '../Image';
import { CardContent } from './CardContent';
import { CardDescription, CardDescriptionProps } from './CardDescription';
import { CardGroup } from './CardGroup';
import { CardHeader, CardHeaderProps } from './CardHeader';
import { CardMeta, CardMetaProps } from './CardMeta';

export interface CardProps extends StrictCardProps {
  [key: string]: any;
}

export interface StrictCardProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** A Card can center itself inside its container. */
  centered?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A Card can be formatted to display different colors. */
  color?: SemanticCOLORS;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for CardDescription. */
  description?: SemanticShorthandItem<CardDescriptionProps>;

  /** Shorthand for primary content of CardContent. */
  extra?: SemanticShorthandContent;

  /** A Card can be formatted to take up the width of its container. */
  fluid?: boolean;

  /** Shorthand for CardHeader. */
  header?: SemanticShorthandItem<CardHeaderProps>;

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href?: string;

  /** A card can contain an Image component. */
  image?: SemanticShorthandItem<ImageProps>;

  /** A card can be formatted to link to other content. */
  link?: boolean;

  /** Shorthand for CardMeta. */
  meta?: SemanticShorthandItem<CardMetaProps>;

  /**
   * Called on click. When passed, the component renders as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: CardProps) => void;

  /** A Card can be formatted to raise above the page. */
  raised?: boolean;
}

interface CCard extends React.FC<CardProps> {
  Content: typeof CardContent;
  Description: typeof CardDescription;
  Group: typeof CardGroup;
  Header: typeof CardHeader;
  Meta: typeof CardMeta;
}

/**
 * A card displays site content in a manner similar to a playing card.
 */
export const Card: CCard = props => {

  const { as, centered, children, className, color, content, description, extra, fluid, header, image, link, meta, onClick, raised, ...rest } = props;

  const classes = getClassName('ui', color, { centered, fluid, link, raised }, 'card', className);

  const handleClick = onClick ? (e: any) => onClick(e, props) : undefined;
  const ElementType = onClick ? 'a' : rest.href ? 'a' : as ?? 'div';

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes} onClick={handleClick}>
        {children}
      </ElementType>
    );
  }

  if (content != null) {
    return (
      <ElementType {...rest} className={classes} onClick={handleClick}>
        {content}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {Image.create(image, { autoGenerateKey: false, defaultProps: { ui: false, wrapped: true } })}
      {(description || header || meta) && (<CardContent description={description} header={header} meta={meta} />)}
      {extra && <CardContent extra>{extra}</CardContent>}
    </ElementType>
  );
};

Card.Content = CardContent;
Card.Description = CardDescription;
Card.Group = CardGroup;
Card.Header = CardHeader;
Card.Meta = CardMeta;
