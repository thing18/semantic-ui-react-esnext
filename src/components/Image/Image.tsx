import React, { Children } from 'react';

import { SemanticFLOATS, SemanticShorthandContent, SemanticShorthandItem, SemanticSIZES, SemanticVERTICALALIGNMENTS, createShorthandFactory, htmlImageProps, partitionHTMLProps, FCX, getClassName, Use } from '../../lib';
import { Dimmer, DimmerProps } from '../Dimmer';
import { Label, LabelProps } from '../Label';
import { ImageGroup } from './ImageGroup';

export interface StrictImageProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** An image may be formatted to appear inline with text as an avatar. */
  avatar?: boolean;

  /** An image may include a border to emphasize the edges of white or transparent content. */
  bordered?: boolean;

  /** An image can appear centered in a content block. */
  centered?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** An image may appear circular. */
  circular?: boolean;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** An image can show that it is disabled and cannot be selected. */
  disabled?: boolean;

  /** Shorthand for Dimmer. */
  dimmer?: SemanticShorthandItem<DimmerProps>;

  /** An image can sit to the left or right of other content. */
  floated?: SemanticFLOATS;

  /** An image can take up the width of its container. */
  fluid?: boolean;

  /** An image can be hidden. */
  hidden?: boolean;

  /** Renders the Image as an <a> tag with this href. */
  href?: string;

  /** An image may appear inline. */
  inline?: boolean;

  /** Shorthand for Label. */
  label?: SemanticShorthandItem<LabelProps>;

  /** An image may appear rounded. */
  rounded?: boolean;

  /** An image may appear at different sizes. */
  size?: SemanticSIZES;

  /** An image can specify that it needs an additional spacing to separate it from nearby content. */
  spaced?: boolean | 'left' | 'right';

  /** Whether or not to add the ui className. */
  ui?: boolean;

  /** An image can specify its vertical alignment. */
  verticalAlign?: SemanticVERTICALALIGNMENTS;

  /** An image can render wrapped in a `div.ui.image` as alternative HTML markup. */
  wrapped?: boolean;

  // rest: html image props
  src?: string;
  srcSet?: string;
  alt?: string;
  height?: string;
  width?: string;
}

export interface ImageProps extends StrictImageProps {
  [key: string]: any;
}

interface CImage extends FCX<ImageProps> {
  Group: typeof ImageGroup;
}

/**
 * An image is a graphic representation of something.
 * @see Icon
 */
export const Image: CImage = ({ as = 'img', avatar, bordered, centered, children, circular, className, content, dimmer, disabled, floated, fluid, hidden, href, inline, label, rounded, size, spaced, verticalAlign, wrapped, ui = true, ...rest }) => {

  const classes = getClassName(
    { ui }, size,
    { avatar, bordered, circular, centered, disabled, fluid, hidden, inline, rounded },
    [Use.KeyOrValueKey, { spaced }],
    [Use.ValueKey, { floated }],
    [Use.VerticalAlign, verticalAlign],
    'image', className,
  );

  const [imgTagProps, rootProps] = partitionHTMLProps(rest, { htmlProps: htmlImageProps });

  // tslint:disable-next-line: triple-equals
  const ElementType = as && as != 'img'
    ? as
    : (dimmer != null || label != null || wrapped != null || !!Children.count(children) ? 'div' : 'img');

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

  // tslint:disable-next-line: triple-equals
  if (ElementType == 'img') {
    return <ElementType {...rootProps} {...imgTagProps} className={classes} />;
  }

  return (
    <ElementType {...rootProps} className={classes} href={href}>
      {Dimmer.create(dimmer, { autoGenerateKey: false })}
      {Label.create(label, { autoGenerateKey: false })}
      <img {...imgTagProps} />
    </ElementType>
  );
};

Image.defaultProps = { as: 'img', ui: true };
Image.Group = ImageGroup;
Image.create = createShorthandFactory(Image, (value) => ({ src: value }));
