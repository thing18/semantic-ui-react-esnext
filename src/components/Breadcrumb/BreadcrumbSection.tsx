import React, { Children } from 'react';

import { SemanticShorthandContent, FCX, createShorthandFactory, getClassName } from '../../lib';

export interface BreadcrumbSectionProps extends StrictBreadcrumbSectionProps {
  [key: string]: any;
}

export interface StrictBreadcrumbSectionProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Style as the currently active section. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href?: string;

  /** Render as an `a` tag instead of a `div`. */
  link?: boolean;

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: BreadcrumbSectionProps) => void;
}

/**
 * A section sub-component for Breadcrumb component.
 */
export const BreadcrumbSection: FCX<BreadcrumbSectionProps> = props => {

  const { as = 'div', link, active, children, className, content, onClick, ...rest } = props;

  const handleClick = onClick ? (e: any) => onClick(e, props) : undefined;

  const classes = getClassName({ active }, 'section', className);
  const ElementType = (link || onClick) ? 'a' : as;

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

BreadcrumbSection.create = createShorthandFactory(BreadcrumbSection, (content) => ({ content, link: true }));
