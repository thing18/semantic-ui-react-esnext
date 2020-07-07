import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, createShorthandFactory, FCX, getClassName } from '../../lib';
import { IconProps, Icon } from '../../elements';

export interface DropdownHeaderProps extends StrictDropdownHeaderProps {
  [key: string]: any;
}

export interface StrictDropdownHeaderProps {
  /** An element type to render as (string or function). */
  as?: any;

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
const DropdownHeader: FCX<DropdownHeaderProps> = ({ as: ElementType = 'div', children, className, content, icon, ...rest }) => {

  const classes = getClassName('header', className);

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

DropdownHeader.propTypes = {
  /** An element type to render as (string or function) */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,
};

DropdownHeader.create = createShorthandFactory(DropdownHeader, (content) => ({ content }));

export { DropdownHeader };
