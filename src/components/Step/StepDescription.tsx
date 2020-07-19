import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

interface StrictStepDescriptionProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

interface StepDescriptionProps extends StrictStepDescriptionProps {
  [key: string]: any;
}

const StepDescription: FCX<StepDescriptionProps> = props => ChildrenOrContent(props, 'description');

StepDescription.create = createShorthandFactory(StepDescription, (content) => ({ content }));

export { StepDescription, StepDescriptionProps, StrictStepDescriptionProps };
