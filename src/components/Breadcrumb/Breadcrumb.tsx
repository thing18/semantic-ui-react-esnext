import React, { Children } from 'react';

import { SemanticShorthandCollection, SemanticShorthandContent, SemanticShorthandItem, SemanticSIZES, getClassName } from '../../lib';
import { IconProps } from '../Icon';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import { BreadcrumbSection, BreadcrumbSectionProps } from './BreadcrumbSection';

export interface BreadcrumbProps extends StrictBreadcrumbProps {
  [key: string]: any;
}

export interface StrictBreadcrumbProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content of the Breadcrumb.Divider. */
  divider?: SemanticShorthandContent;

  /** For use with the sections prop. Render as an `Icon` component with `divider` class instead of a `div` in
   *  Breadcrumb.Divider.
   */
  icon?: SemanticShorthandItem<IconProps>;

  /** Shorthand array of props for Breadcrumb.Section. */
  sections?: SemanticShorthandCollection<BreadcrumbSectionProps>;

  /** Size of Breadcrumb */
  size?: Exclude<SemanticSIZES, 'medium'>;
}

interface CBreadcrumb extends React.FC<BreadcrumbProps> {
  Divider: typeof BreadcrumbDivider;
  Section: typeof BreadcrumbSection;
}

/**
 * A breadcrumb is used to show hierarchy between content.
 */
export const Breadcrumb: CBreadcrumb = ({ as: ElementType = 'div', children, className, divider, icon, sections, size, ...rest }) => {

  const classes = getClassName('ui', size, 'breadcrumb', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const childElements = sections
    ? sections.reduce<any[]>(
      (acc, section, index) => {

        const breadcrumbElement = BreadcrumbSection.create(section);
        acc.push(breadcrumbElement);

        // divider
        if (index !== sections.length - 1) {
          const key = `${breadcrumbElement.key}_divider` || JSON.stringify(section);
          // tslint:disable-next-line: object-shorthand-properties-first
          acc.push(BreadcrumbDivider.create({ content: divider, icon, key }));
        }
        return acc;
      },
      [],
    )
    : null;

  return (
    <ElementType {...rest} className={classes}>
      {childElements}
    </ElementType>
  );
};

Breadcrumb.Divider = BreadcrumbDivider;
Breadcrumb.Section = BreadcrumbSection;
