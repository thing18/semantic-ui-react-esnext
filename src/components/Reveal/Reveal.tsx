import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';
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
const Reveal: CReveal = ({ active, animated, disabled, instant, ...props }) =>
  ChildrenOrContent(props, 'ui', animated, { active, disabled, instant }, 'reveal');

Reveal.Content = RevealContent;

export { Reveal, RevealProps, StrictRevealProps };
