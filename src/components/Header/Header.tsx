import React, { Children } from 'react';

import { SemanticCOLORS, SemanticFLOATS, SemanticTEXTALIGNMENTS, Use, getClassName } from '../../lib';
import { Icon } from '../Icon';
import { Image } from '../Image';
import { HeaderSubheader } from './HeaderSubheader';
import { HeaderContent } from './HeaderContent';

export interface StrictHeaderProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Attach header  to other content, like a segment. */
  attached?: boolean | 'top' | 'bottom';

  /** Format header to appear inside a content block. */
  block?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Color of the header. */
  color?: SemanticCOLORS;

  /** Shorthand for primary content. */
  content?: React.ReactNode;

  /** Show that the header is inactive. */
  disabled?: boolean;

  /** Divide header from the content below it. */
  dividing?: boolean;

  /** Header can sit to the left or right of other content. */
  floated?: SemanticFLOATS;

  /** Add an icon by icon name or pass an Icon. */
  icon?: any;

  /** Add an image by img src or pass an Image. */
  image?: any;

  /** Inverts the color of the header for dark backgrounds. */
  inverted?: boolean;

  /** Content headings are sized with em and are based on the font-size of their container. */
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge';

  /** Headers may be formatted to label smaller or de-emphasized content. */
  sub?: boolean;

  /** Shorthand for Header.Subheader. */
  subheader?: any;

  /** Align header content. */
  textAlign?: SemanticTEXTALIGNMENTS;
}

export interface HeaderProps extends StrictHeaderProps {
  [key: string]: any;
}

interface CHeader extends React.FC<HeaderProps> {
  Content: typeof HeaderContent;
  Subheader: typeof HeaderSubheader;
}

/**
 * A header provides a short summary of content
 */
export const Header: CHeader = ({ as, attached, block, children, className, color, content, disabled, dividing, floated, icon, image, inverted, size, sub, subheader, textAlign, ...rest }) => {

  const classes = getClassName(
    'ui', color, size,
    { block, disabled, dividing },
    [Use.ValueKey, { floated }],
    // tslint:disable-next-line: object-shorthand-properties-first
    { icon: icon === true, image: image === true, inverted, sub },
    [Use.KeyOrValueKey, { attached }],
    [Use.TextAlign, textAlign],
    'header', className,
  );

  // tslint:disable-next-line: triple-equals
  const ElementType = as && as != 'div' ? as : rest.href ? 'a' : 'div';

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const iconElement = Icon.create(icon, { autoGenerateKey: false });
  const imageElement = Image.create(image, { autoGenerateKey: false });
  const subheaderElement = HeaderSubheader.create(subheader, { autoGenerateKey: false });

  if (iconElement || imageElement) {
    return (
      <ElementType {...rest} className={classes}>
        {iconElement || imageElement}
        {(content || subheaderElement) && (
          <HeaderContent>
            {content}
            {subheaderElement}
          </HeaderContent>
        )}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {content}
      {subheaderElement}
    </ElementType>
  );
};

Header.Content = HeaderContent;
Header.Subheader = HeaderSubheader;
