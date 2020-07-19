import React, { useCallback } from 'react';

import { SemanticCOLORS, SemanticICONS, createShorthandFactory, FCX, getClassName, Use } from '../../lib';
import { IconGroup } from './IconGroup';

export type IconSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';
export type IconCorner = 'bottom right' | 'top right' | 'top left' | 'bottom left';

export interface IconProps extends StrictIconProps {
  [key: string]: any;
}

export interface StrictIconProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Formatted to appear bordered */
  bordered?: boolean;

  /** Icon can formatted to appear circular. */
  circular?: boolean;

  /** Additional classes. */
  className?: string;

  /** Color of the icon. */
  color?: SemanticCOLORS;

  /** Icons can display a smaller corner icon. */
  corner?: boolean | IconCorner;

  /** Show that the icon is inactive. */
  disabled?: boolean;

  /** Fitted, without space to left or right of Icon. */
  fitted?: boolean;

  /** Icon can be flipped. */
  flipped?: 'horizontally' | 'vertically';

  /** Formatted to have its colors inverted for contrast. */
  inverted?: boolean;

  /** Icon can be formatted as a link. */
  link?: boolean;

  /** Icon can be used as a simple loader. */
  loading?: boolean;

  /** Name of the icon. */
  name?: SemanticICONS;

  /** Icon can rotated. */
  rotated?: 'clockwise' | 'counterclockwise';

  /** Size of the icon. */
  size?: IconSizeProp;

  /** Icon can have an aria hidden. */
  'aria-hidden'?: string;

  /** Icon can have an aria label. */
  'aria-label'?: string;
}

interface CIcon extends FCX<IconProps> {
  Group: typeof IconGroup;
}

/**
 * An icon is a glyph used to represent something else.
 * @see Image
 */
export const Icon: CIcon = props => {

  const {
    as: ElementType = 'i', bordered, circular, className, color, corner, disabled,
    fitted, flipped, inverted, link, loading, name, rotated, size, 'aria-label': ariaLabel,
    'aria-hidden': ariaHidden, children, onClick, ...rest } = props;

  const classes = getClassName(
    color, name, size,
    { bordered, circular, disabled, fitted, inverted, link, loading },
    [Use.KeyOrValueKey, { corner }],
    [Use.ValueKey, { flipped, rotated }],
    'icon', className,
  );

  const handleClick = (e: any) => disabled ? e.preventDefault() : onClick?.call(null, e, props);

  const ariaOptions = getIconAriaOptions(ariaLabel, ariaHidden);

  return <ElementType {...rest} {...ariaOptions} className={classes} onClick={handleClick} />;
};

const getIconAriaOptions = (ariaLabel: any, ariaHidden: any) => {

  const ariaOptions = {} as Record<string, any>;

  if (ariaLabel == null) {
    ariaOptions['aria-hidden'] = 'true';
  } else {
    ariaOptions['aria-label'] = ariaLabel;
  }

  if (ariaHidden != null) {
    ariaOptions['aria-hidden'] = ariaHidden;
  }

  return ariaOptions;
};

Icon.defaultProps = { as: 'i' };
Icon.Group = IconGroup;
Icon.create = createShorthandFactory(Icon, (value) => ({ name: value }));
