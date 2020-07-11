import React from 'react';

import { SemanticShorthandContent, ChildrenOrContent } from '../../lib';

export interface SearchResultsProps extends StrictSearchResultsProps {
  [key: string]: any;
}

export interface StrictSearchResultsProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

export const SearchResults: React.FC<SearchResultsProps> = props => ChildrenOrContent(props, 'results transition');
