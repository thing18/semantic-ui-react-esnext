import React from 'react';

import { getClassName } from '../../lib';
import { AccordionAccordion, StrictAccordionAccordionProps } from './AccordionAccordion';
import { AccordionContent } from './AccordionContent';
import { AccordionTitle } from './AccordionTitle';
import { AccordionPanel } from './AccordionPanel';

export interface AccordionProps extends StrictAccordionProps {
  [key: string]: any;
}

export interface StrictAccordionProps extends StrictAccordionAccordionProps {
  /** Additional classes. */
  className?: string;

  /** Format to take up the width of its container. */
  fluid?: boolean;

  /** Format for dark backgrounds. */
  inverted?: boolean;

  /** Adds some basic styling to accordion panels. */
  styled?: boolean;
}

interface CAccordion extends React.FC<AccordionProps> {
  Accordion: typeof AccordionAccordion;
  Content: typeof AccordionContent;
  Title: typeof AccordionTitle;
  Panel: typeof AccordionPanel;
}

/**
 * An accordion allows users to toggle the display of sections of content.
 */
const Accordion: CAccordion = ({ className, fluid, inverted, styled, ...rest }) => {

  const classes = getClassName('ui', { fluid, inverted, styled }, className);

  return <AccordionAccordion {...rest} className={classes} />;
};

Accordion.Accordion = AccordionAccordion;
Accordion.Content = AccordionContent;
Accordion.Panel = AccordionPanel;
Accordion.Title = AccordionTitle;

export { Accordion };
