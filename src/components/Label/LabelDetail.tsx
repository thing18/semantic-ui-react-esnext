import React from 'react';

import { SemanticShorthandContent, childrenUtils, createShorthandFactory, FCX, ChildrenOrContent } from '../../lib';

export interface StrictLabelDetailProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

export interface LabelDetailProps extends StrictLabelDetailProps {
  [key: string]: any;
}

export const LabelDetail: FCX<LabelDetailProps> = props => ChildrenOrContent(props, 'detail');

LabelDetail.create = createShorthandFactory(LabelDetail, (val) => ({ content: val }));
