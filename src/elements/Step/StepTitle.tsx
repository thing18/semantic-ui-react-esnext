import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

interface StrictStepTitleProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

interface StepTitleProps extends StrictStepTitleProps {
  [key: string]: any;
}

/**
 * A step can contain a title.
 */
const StepTitle: FCX<StepTitleProps> = props => ChildrenOrContent('title', props);

StepTitle.create = createShorthandFactory(StepTitle, (content) => ({ content }));

export { StepTitle, StepTitleProps, StrictStepTitleProps };
