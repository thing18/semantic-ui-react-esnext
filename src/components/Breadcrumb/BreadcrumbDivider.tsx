import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, FCX, getClassName, createShorthandFactory } from '../../lib';
import { Icon, IconProps } from '../Icon';

export interface BreadcrumbDividerProps extends StrictBreadcrumbDividerProps {
  [key: string]: any;
}

export interface StrictBreadcrumbDividerProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Render as an `Icon` component with `divider` class instead of a `div`. */
  icon?: SemanticShorthandItem<IconProps>;
}

/**
 * A divider sub-component for Breadcrumb component.
 */
export const BreadcrumbDivider: FCX<BreadcrumbDividerProps> = ({ as: ElementType = 'div', children, className, content, icon, ...rest }) => {

  const classes = getClassName('divider', className);

  if (icon != null) {
    return Icon.create(icon, { defaultProps: { ...rest, className: classes }, autoGenerateKey: false });
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
      {Children.count(children) ? children : '/'}
    </ElementType>
  );
};

BreadcrumbDivider.create = createShorthandFactory(BreadcrumbDivider, (icon) => ({ icon }));
