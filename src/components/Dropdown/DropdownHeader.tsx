import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, createShorthandFactory, FCX, getClassName1 } from '../../lib';
import { IconProps, Icon } from '../Icon';

export interface DropdownHeaderProps extends StrictDropdownHeaderProps {
  [key: string]: any;
}

export interface StrictDropdownHeaderProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for Icon. */
  icon?: SemanticShorthandItem<IconProps>;
}

/**
 * A dropdown menu can contain a header.
 */
export const DropdownHeader: FCX<DropdownHeaderProps> = ({ as: ElementType = 'div', children, className, content, icon, ...rest }) => {

  const classes = getClassName1('header', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {content}
    </ElementType>
  );
};

DropdownHeader.create = createShorthandFactory(DropdownHeader, (content) => ({ content }));
