import React from 'react';

import { SemanticShorthandContent, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

export interface StrictHeaderSubheaderProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

export interface HeaderSubheaderProps extends StrictHeaderSubheaderProps {
  [key: string]: any;
}

/**
 * Headers may contain subheaders.
 */
export const HeaderSubheader: FCX<HeaderSubheaderProps> = props => ChildrenOrContent('sub header', props);

HeaderSubheader.create = createShorthandFactory<HeaderSubheaderProps>(HeaderSubheader, (content) => ({ content }));
