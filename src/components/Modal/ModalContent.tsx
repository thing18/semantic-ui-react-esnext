import React from 'react';

import { SemanticShorthandContent, FCX, ChildrenOrContent, createShorthandFactory } from '../../lib';

export interface ModalContentProps extends StrictModalContentProps {
  [key: string]: any;
}

export interface StrictModalContentProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A modal can contain image content. */
  image?: boolean;

  /** A modal can use the entire size of the screen. */
  scrolling?: boolean;
}

/**
 * A modal can contain content.
 */
const ModalContent: FCX<ModalContentProps> = ({ className, image, scrolling, ...props }) =>
  ChildrenOrContent(props, className, { image, scrolling }, 'content');

ModalContent.create = createShorthandFactory(ModalContent, (content) => ({ content }));

export { ModalContent };
