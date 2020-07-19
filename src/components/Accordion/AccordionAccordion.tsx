import React, { useState, useEffect, Children } from 'react';

import { SemanticShorthandCollection, createShorthandFactory, FCX, getClassName } from '../../lib';
import { AccordionPanelProps, AccordionPanel } from './AccordionPanel';
import { AccordionTitleProps } from './AccordionTitle';

export interface AccordionAccordionProps extends StrictAccordionAccordionProps {
  [key: string]: any;
}

export interface StrictAccordionAccordionProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Index of the currently active panel. */
  activeIndex?: number | number[];

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Initial activeIndex value. */
  defaultActiveIndex?: number | number[];

  /** Only allow one panel open at a time. */
  exclusive?: boolean;

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {AccordionTitleProps} data - All item props.
   */
  onTitleClick?: (event: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) => void;

  /** Shorthand array of props for Accordion. */
  panels?: SemanticShorthandCollection<AccordionPanelProps>;
}

/**
 * An Accordion can contain sub-accordions.
 */
const AccordionAccordion: FCX<AccordionAccordionProps> = props => {

  const { as: ElementType = 'div', activeIndex, defaultActiveIndex, exclusive, onTitleClick, className, children, panels, ...rest } = props;

  const [__activeIndex, __setActiveIndex] = useState(activeIndex ?? defaultActiveIndex ?? (exclusive ? -1 : ([] as number[])));

  useEffect(
    () => {
      if (process.env.NODE_ENV !== 'production') {

        if (exclusive && typeof activeIndex !== 'number') {
          console.error('`activeIndex` must be a number if `exclusive` is true');
        } else if (!exclusive && !Array.isArray(activeIndex)) {
          console.error('`activeIndex` must be an array if `exclusive` is false');
        }
      }
      __setActiveIndex(activeIndex ?? exclusive ? -1 : []);
    },
    [activeIndex],
  );

  const handleTitleClick = (e: any, titleProps: any) => {

    __setActiveIndex(calcIndex(titleProps.index, __activeIndex, exclusive));
    onTitleClick?.call(null, e, titleProps);
  };

  const classes = getClassName('accordion', className);

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children)
        ? children
        : panels!.map((panel, index) => AccordionPanel.create(panel, { defaultProps: { index, active: isActive(index, __activeIndex, exclusive), onTitleClick: handleTitleClick } }))
      }
    </ElementType>
  );
};

AccordionAccordion.defaultProps = { exclusive: true };
AccordionAccordion.create = createShorthandFactory(AccordionAccordion, (content) => ({ content }));

export { AccordionAccordion };

const isActive = (index: number, activeIndex: number | number[], exclusive: boolean | undefined) => exclusive
  ? activeIndex === index
  : (activeIndex as number[]).includes(index);

const calcIndex = (index: number, activeIndex: number | number[], exclusive: boolean | undefined) => exclusive
  ? (
    index === activeIndex ? -1 : index
  )
  : (
    (activeIndex as number[]).includes(index)
      // tslint:disable-next-line: triple-equals
      ? (activeIndex as number[]).filter(x => x != index)
      : [...(activeIndex as number[]), index]
  );
