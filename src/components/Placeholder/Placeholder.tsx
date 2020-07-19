import React, { Children } from 'react';

import { SemanticShorthandContent, Use, getClassName } from '../../lib';

import { PlaceholderHeader } from './PlaceholderHeader';
import { PlaceholderImage } from './PlaceholderImage';
import { PlaceholderLine } from './PlaceholderLine';
import { PlaceholderParagraph } from './PlaceholderParagraph';

interface StrictPlaceholderProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A fluid placeholder takes up the width of its container. */
  fluid?: boolean;

  /** A placeholder can have their colors inverted. */
  inverted?: boolean;
}

interface PlaceholderProps extends StrictPlaceholderProps {
  [key: string]: any;
}

interface CPlaceholder extends React.FC<PlaceholderProps> {
  Header: typeof PlaceholderHeader;
  Line: typeof PlaceholderLine;
  Image: typeof PlaceholderImage;
  Paragraph: typeof PlaceholderParagraph;
}

/**
 * A placeholder is used to reserve splace for content that soon will appear in a layout.
 */
const Placeholder: CPlaceholder = ({ as, children, className, content, fluid, inverted, ...rest }) => {

  const classes = getClassName('ui', [Use.Key, { fluid, inverted }], 'placeholder', className);

  const ElementType = as || 'div';

  return (
    <ElementType {...rest} className={classes}>
      {/* {childrenUtils.isNil(children) ? content : children} */}
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

Placeholder.Header = PlaceholderHeader;
Placeholder.Image = PlaceholderImage;
Placeholder.Line = PlaceholderLine;
Placeholder.Paragraph = PlaceholderParagraph;

export { Placeholder, PlaceholderProps, StrictPlaceholderProps };
