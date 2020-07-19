import React, { Children } from 'react';

import { SemanticShorthandContent, Use, getClassName } from '../../lib';

interface StrictRevealContentProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A reveal may contain content that is visible before interaction. */
  hidden?: boolean;

  /** A reveal may contain content that is hidden before user interaction. */
  visible?: boolean;
}

interface RevealContentProps extends StrictRevealContentProps {
  [key: string]: any;
}

/**
 * A content sub-component for the Reveal.
 */
const RevealContent: React.FC<RevealContentProps> = ({ as = 'div', children, className, content, hidden, visible, ...rest }) => {

  const classes = getClassName('ui', [Use.Key, { hidden, visible }], 'content', className);

  const ElementType = !!rest.href ? 'a' : as;

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

export { RevealContent, RevealContentProps, StrictRevealContentProps };
