import React, { Children } from 'react';

import { SemanticShorthandItem, SemanticShorthandContent, createShorthandFactory, FCX, getClassName } from '../../lib';
import { StepDescriptionProps, StepDescription } from './StepDescription';
import { StepTitleProps, StepTitle } from './StepTitle';

interface StrictStepContentProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for StepDescription. */
  description?: SemanticShorthandItem<StepDescriptionProps>;

  /** Shorthand for StepTitle. */
  title?: SemanticShorthandItem<StepTitleProps>;
}

interface StepContentProps extends StrictStepContentProps {
  [key: string]: any;
}

/**
 * A step can contain a content.
 */
const StepContent: FCX<StepContentProps> = ({ as, children, className, content, description, title, ...rest }) => {

  const classes = getClassName('content', className);
  const ElementType = rest.href ? 'a' : as ?? 'div';

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  if (content != null) {
    return (
      <ElementType {...rest} className={classes}>
        {content}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {StepTitle.create(title, { autoGenerateKey: false })}
      {StepDescription.create(description, { autoGenerateKey: false })}
    </ElementType>
  );
};

StepContent.create = createShorthandFactory(StepContent, (content) => ({ content }));

export { StepContent, StepContentProps, StrictStepContentProps };
