import React from 'react';

import { createShorthandFactory, FCX, getClassName, Use } from '../../lib';
import { IconProps } from './types';
import { IconGroup } from './IconGroup';

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
