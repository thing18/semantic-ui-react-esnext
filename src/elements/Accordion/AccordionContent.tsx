import React from 'react';

import { SemanticShorthandContent, FCX, ChildrenOrContent, createShorthandFactory } from '../../lib';

export interface AccordionContentProps extends StrictAccordionContentProps {
  [key: string]: any;
}

export interface StrictAccordionContentProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Whether or not the content is visible. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

/**
 * A content sub-component for Accordion component.
 */
const AccordionContent: FCX<AccordionContentProps> = ({ active, ...rest }) => ChildrenOrContent(rest, 'content', { active });

AccordionContent.create = createShorthandFactory(AccordionContent, (content) => ({ content }));

export { AccordionContent };
