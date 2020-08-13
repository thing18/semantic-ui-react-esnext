import React, { useCallback, Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, createShorthandFactory, FCX, getClassName } from '../../lib';
import { IconProps, Icon } from '../Icon';
import { StepContent } from './StepContent';
import { StepGroup } from './StepGroup';
import { StepDescription, StepDescriptionProps } from './StepDescription';
import { StepTitle, StepTitleProps } from './StepTitle';

interface StrictStepProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** A step can be highlighted as active. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A step can show that a user has completed it. */
  completed?: boolean;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Shorthand for StepDescription. */
  description?: SemanticShorthandItem<StepDescriptionProps>;

  /** Show that the Loader is inactive. */
  disabled?: boolean;

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href?: string;

  /** Shorthand for Icon. */
  icon?: SemanticShorthandItem<IconProps>;

  /** A step can be link. */
  link?: boolean;

  /**
   * Called on click. When passed, the component will render as an `a`.
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: StepProps) => void;

  /** A step can show a ordered sequence of steps. Passed from StepGroup. */
  ordered?: boolean;

  /** Shorthand for StepTitle. */
  title?: SemanticShorthandItem<StepTitleProps>;
}

interface StepProps extends StrictStepProps {
  [key: string]: any;
}

interface CStep extends FCX<StepProps> {
  Content: typeof StepContent;
  Description: typeof StepDescription;
  Group: typeof StepGroup;
  Title: typeof StepTitle;
}

/**
 * A step shows the completion status of an activity in a series of activities.
 */
const Step: CStep = (props) => {

  const { as, active, children, className, completed, content, description, disabled, href, icon, link, onClick, ordered, title, ...rest } = props;

  const handleClick = (e: any) => !disabled && !!onClick?.call(null, e, props);
  const classes = getClassName({ active, completed, disabled, link }, 'step', className);
  const ElementType = as && as !== 'div' ? as : !!onClick ? 'a' : 'div';

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes} href={href} onClick={handleClick}>
        {children}
      </ElementType>
    );
  }

  if (content != null) {
    return (
      <ElementType {...rest} className={classes} href={href} onClick={handleClick}>
        {content}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes} href={href} onClick={handleClick}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {StepContent.create({ description, title }, { autoGenerateKey: false })}
    </ElementType>
  );
};

Step.Content = StepContent;
Step.Description = StepDescription;
Step.Group = StepGroup;
Step.Title = StepTitle;
Step.create = createShorthandFactory(Step, (content) => ({ content }));

export { Step, StepProps, StrictStepProps };
