import React from 'react';

import { SemanticShorthandContent, FCX, ChildrenOrContent, createShorthandFactory } from '../../lib';

export interface ModalHeaderProps extends StrictModalHeaderProps {
  [key: string]: any;
}

export interface StrictModalHeaderProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

/**
 * A modal can have a header.
 */
const ModalHeader: FCX<ModalHeaderProps> = props =>
  ChildrenOrContent(props, 'header');

ModalHeader.create = createShorthandFactory(ModalHeader, (content) => ({ content }));

export { ModalHeader };
