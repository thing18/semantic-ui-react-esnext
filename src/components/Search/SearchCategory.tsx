import React, { Children } from 'react';

import { SemanticShorthandContent, getClassName } from '../../lib';
import { SearchResult } from './SearchResult';
import { SearchCategoryLayout, SearchCategoryLayoutProps } from './SearchCategoryLayout';
import { SearchResultsProps } from './SearchResults';

export interface SearchCategoryProps extends StrictSearchCategoryProps {
  [key: string]: any;
}

export interface StrictSearchCategoryProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** The item currently selected by keyboard shortcut. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Display name. */
  name?: string;

  /**
   * Renders the SearchCategory layout.
   *
   * @param {object} categoryContent - The Renderable SearchCategory contents.
   * @param {object} resultsContent - The Renderable SearchResult contents.
   * @returns {*} - Renderable SearchCategory layout.
   */
  layoutRenderer?: React.FC<SearchCategoryLayoutProps>;

  /**
   * Renders the category contents.
   *
   * @param {object} props - The SearchCategory props object.
   * @returns {*} - Renderable category contents.
   */
  renderer?: React.FC<SearchCategoryProps>;

  /** Array of Search.Result props. */
  results?: SearchResultsProps[];
}

const defaultRenderer = ({ name }: SearchCategoryProps) => name;

const SearchCategory: React.FC<SearchCategoryProps> = props => {

  const { as: ElementType = 'div', active, children, className, content, layoutRenderer = SearchCategoryLayout, renderer = defaultRenderer, ...rest } = props;

  const classes = getClassName({ active }, 'category', className);

  const categoryContent = renderer(props) as any;
  const resultsContent = Children.count(children) ? children : content as any;

  return (
    <ElementType {...rest} className={classes}>
      {layoutRenderer({ categoryContent, resultsContent })}
    </ElementType>
  );
};

SearchCategory.defaultProps = { layoutRenderer: SearchCategoryLayout, renderer: defaultRenderer as any };

export { SearchCategory };
