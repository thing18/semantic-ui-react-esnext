import React, { Fragment } from 'react';

import { SemanticShorthandItem, FCX, createShorthandFactory } from '../../lib';
import { AccordionContentProps, AccordionContent } from './AccordionContent';
import { AccordionTitleProps, AccordionTitle } from './AccordionTitle';

export interface AccordionPanelProps extends StrictAccordionPanelProps {
  [key: string]: any;
}

export interface StrictAccordionPanelProps {
  /** Whether or not the title is in the open state. */
  active?: boolean;

  /** A shorthand for Accordion.Content. */
  content?: SemanticShorthandItem<AccordionContentProps>;

  /** A panel index. */
  index?: number | string;

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {AccordionTitleProps} data - All item props.
   */
  onTitleClick?: (event: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) => void;

  /** A shorthand for Accordion.Title. */
  title?: SemanticShorthandItem<AccordionTitleProps>;
}

/**
 * A panel sub-component for Accordion component.
 */
const AccordionPanel: FCX<AccordionPanelProps> = ({ active, content, index, title, onTitleClick }) => {

  const handleTitleOverrides = (pprops: any) => ({
    onClick: (e: any, titleProps: any) => {
      pprops.onClick?.call(null, e, titleProps);
      onTitleClick?.call(null, e, titleProps);
    },
  });

  return (
    <Fragment>
      {AccordionTitle.create(title, { autoGenerateKey: false, defaultProps: { active, index }, overrideProps: handleTitleOverrides })}
      {AccordionContent.create(content, { autoGenerateKey: false, defaultProps: { active } })}
    </Fragment>
  );
};

AccordionPanel.create = createShorthandFactory(AccordionPanel, null);

export { AccordionPanel };
