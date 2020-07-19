import React from 'react';

import { SemanticShorthandContent } from '../../lib';
import { SearchResult } from './SearchResult';

export interface SearchCategoryLayoutProps extends StrictSearchCategoryLayoutProps {
  [key: string]: any;
}

export interface StrictSearchCategoryLayoutProps {
  /** The rendered category content */
  categoryContent: React.ReactElement<any>;

  /** The rendered results content */
  resultsContent: React.ReactElement<any>;
}

export const SearchCategoryLayout: React.FC<SearchCategoryLayoutProps> = ({ categoryContent, resultsContent }) => (
  <>
    <div className='name'>{categoryContent}</div>
    <div className='results'>{resultsContent}</div>
  </>
);
