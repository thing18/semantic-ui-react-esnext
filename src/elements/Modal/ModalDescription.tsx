import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface ModalDescriptionProps extends StrictModalDescriptionProps {
  [key: string]: any;
}

export interface StrictModalDescriptionProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

/**
 * A modal can contain a description with one or more paragraphs.
 */
export const ModalDescription: React.FC<ModalDescriptionProps> = props => ChildrenOrContent(props, 'description');
