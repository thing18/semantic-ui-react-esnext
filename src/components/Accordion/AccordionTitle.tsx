import React, { Children } from 'react';

import { IconProps, Icon } from '..';
import { SemanticShorthandContent, SemanticShorthandItem, FCX, getClassName, createShorthandFactory } from '../../lib';

export interface AccordionTitleProps extends StrictAccordionTitleProps {
  [key: string]: any;
}

export interface StrictAccordionTitleProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Whether or not the title is in the open state. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for Icon. */
  icon?: SemanticShorthandItem<IconProps>;

  /** AccordionTitle index inside Accordion. */
  index?: number | string;

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) => void;
}

/**
 * A title sub-component for Accordion component.
 */
const AccordionTitle: FCX<AccordionTitleProps> = props => {

  const { as: ElementType = 'div', active, children, className, content, icon = 'dropdown', onClick, ...rest } = props;

  const handleClick = (e: any) => onClick?.call(null, e, props);

  const classes = getClassName({ active }, 'title', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes} onClick={handleClick}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {content}
    </ElementType>
  );
};

AccordionTitle.create = createShorthandFactory(AccordionTitle, (content) => ({ content }));

export { AccordionTitle };
