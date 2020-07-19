import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticSIZES, Use, getClassName } from '../../lib';

interface LoaderProps extends StrictLoaderProps {
  [key: string]: any;
}

interface StrictLoaderProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A loader can be active or visible. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A loader can be disabled or hidden. */
  disabled?: boolean;

  /** A loader can show it's unsure of how long a task will take. */
  indeterminate?: boolean;

  /** Loaders can appear inline with content. */
  inline?: boolean | 'centered';

  /** Loaders can have their colors inverted. */
  inverted?: boolean;

  /** Loaders can have different sizes. */
  size?: SemanticSIZES;
}

/**
 * A loader alerts a user to wait for an activity to complete.
 * @see Dimmer
 */
const Loader: React.FC<LoaderProps> = ({ as: ElementType = 'div', active, children, className, content, disabled, indeterminate, inline, inverted, size, ...rest }) => {

  const classes = getClassName('ui', size, [Use.Key, { active, disabled, indeterminate, inverted, text: children || content }], [Use.KeyOrValueKey, { inline }], 'loader', className);

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

export { Loader, LoaderProps, StrictLoaderProps };
