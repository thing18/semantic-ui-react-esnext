import React, { Children } from 'react';

import { SemanticShorthandContent, Use, getClassName } from '../../lib';
import { RevealContent } from './RevealContent';

type SEMANTICRevealAnimation = 'fade' | 'small fade' | 'move' | 'move right' | 'move up' | 'move down' | 'rotate' | 'rotate left';

interface StrictRevealProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** An active reveal displays its hidden content. */
  active?: boolean;

  /** An animation name that will be applied to Reveal. */
  animated?: SEMANTICRevealAnimation;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A disabled reveal will not animate when hovered. */
  disabled?: boolean;

  /** An element can show its content without delay. */
  instant?: boolean;
}

interface RevealProps extends StrictRevealProps {
  [key: string]: any;
}

interface CReveal extends React.FC<RevealProps> {
  Content: typeof RevealContent;
}

/**
 * A reveal displays additional content in place of previous content when activated.
 */
const Reveal: CReveal = ({ as = 'div', active, animated, children, className, content, disabled, instant, ...rest }) => {

  const classes = getClassName('ui', animated, [Use.Key, { active, disabled, instant }], 'reveal', className);

  const ElementType = !!rest.ref ? 'a' : as;

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};

Reveal.Content = RevealContent;

export { Reveal, RevealProps, StrictRevealProps };
