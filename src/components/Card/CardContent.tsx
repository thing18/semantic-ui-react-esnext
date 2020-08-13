import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, SemanticTEXTALIGNMENTS, Use, getClassName, createShorthand } from '../../lib';
import { CardDescription, CardDescriptionProps } from './CardDescription';
import { CardHeader, CardHeaderProps } from './CardHeader';
import { CardMeta, CardMetaProps } from './CardMeta';

export interface CardContentProps extends StrictCardContentProps {
  [key: string]: any;
}

export interface StrictCardContentProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for CardDescription. */
  description?: SemanticShorthandItem<CardDescriptionProps>;

  /** A card can contain extra content meant to be formatted separately from the main content. */
  extra?: boolean;

  /** Shorthand for CardHeader. */
  header?: SemanticShorthandItem<CardHeaderProps>;

  /** Shorthand for CardMeta. */
  meta?: SemanticShorthandItem<CardMetaProps>;

  /** A card content can adjust its text alignment. */
  textAlign?: Exclude<SemanticTEXTALIGNMENTS, 'justified'>;
}

/**
 * A card can contain blocks of content or extra content meant to be formatted separately from the main content.
 */
export const CardContent: React.FC<CardContentProps> = ({ as: ElementType = 'div', children, className, content, description, extra, header, meta, textAlign, ...rest }) => {

  const classes = getClassName({ extra }, [Use.TextAlign, textAlign], 'content', className);

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
      {createShorthand(CardHeader, (val) => ({ content: val }), header, { autoGenerateKey: false })}
      {createShorthand(CardMeta, (val) => ({ content: val }), meta, { autoGenerateKey: false })}
      {createShorthand(CardDescription, (val) => ({ content: val }), description, { autoGenerateKey: false })}
    </ElementType>
  );
};
