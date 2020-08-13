import React, { Children } from 'react';

import { SemanticShorthandCollection, SemanticShorthandContent, SemanticWIDTHS, SemanticTEXTALIGNMENTS, getClassName, Use, createShorthand, useKeys } from '../../lib';
import { Card, CardProps } from './Card';

export interface CardGroupProps extends StrictCardGroupProps {
  [key: string]: any;
}

export interface StrictCardGroupProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** A group of cards can center itself inside its container. */
  centered?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A group of cards can double its column width for mobile. */
  doubling?: boolean;

  /** Shorthand array of props for Card. */
  items?: SemanticShorthandCollection<CardProps>;

  /** A group of cards can set how many cards should exist in a row. */
  itemsPerRow?: SemanticWIDTHS;

  /** A group of cards can automatically stack rows to a single columns on mobile devices. */
  stackable?: boolean;

  /** A card group can adjust its text alignment. */
  textAlign?: Exclude<SemanticTEXTALIGNMENTS, 'justified'>;
}

/**
 * A group of cards.
 */
export const CardGroup: React.FC<CardGroupProps> = ({ as: ElementType = 'div', centered, children, className, content, doubling, items, itemsPerRow, stackable, textAlign, ...rest }) => {

  const keys = useKeys(items?.length ?? 0);
  const classes = getClassName('ui', { centered, doubling, stackable }, [Use.TextAlign, textAlign], [Use.Width, itemsPerRow], 'cards', className);

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
      {Array.isArray(items) && items.map(({ key, ...p }: any, index) => <Card {...p} key={key ?? keys[index]} />)}
    </ElementType>
  );
};
