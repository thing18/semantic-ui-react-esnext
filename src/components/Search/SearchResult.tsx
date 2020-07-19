import React, { Component } from 'react';

import { SemanticShorthandContent, createHTMLImage, getClassName } from '../../lib';

export interface SearchResultProps extends StrictSearchResultProps {
  [key: string]: any;
}

export interface StrictSearchResultProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** The item currently selected by keyboard shortcut. */
  active?: boolean;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Additional text with less emphasis. */
  description?: string;

  /** A unique identifier. */
  id?: number | string;

  /** Add an image to the item. */
  image?: string;

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: SearchResultProps) => void;

  /** Customized text for price. */
  price?: string;

  /**
   * Renders the result contents.
   *
   * @param {object} props - The SearchResult props object.
   * @returns {*} - Renderable result contents.
   */
  renderer?: (props: SearchResultProps) => React.ReactElement<any>[];

  /** Display title. */
  title: string;
}

// Note: You technically only need the 'content' wrapper when there's an
// image. However, optionally wrapping it makes this function a lot more
// complicated and harder to read. Since always wrapping it doesn't affect
// the style in any way let's just do that.
//
// Note: To avoid requiring a wrapping div, we return an array here so to
// prevent rendering issues each node needs a unique key.
const defaultRenderer = ({ image, price, title, description }: SearchResultProps) => [
  image && (
    <div key='image' className='image'>
      {createHTMLImage(image, { autoGenerateKey: false })}
    </div>
  ),
  <div key='content' className='content'>
    {price && <div className='price'>{price}</div>}
    {title && <div className='title'>{title}</div>}
    {description && <div className='description'>{description}</div>}
  </div>,
];

const SearchResult: React.FC<SearchResultProps> = props => {

  const { as: ElementType = 'div', active, className, renderer = defaultRenderer, onClick, ...rest } = props;

  const handleClick = (e: any) => onClick?.call(null, e, props);

  const classes = getClassName({ active }, 'result', className);

  // Note: You technically only need the 'content' wrapper when there's an
  // image. However, optionally wrapping it makes this function a lot more
  // complicated and harder to read. Since always wrapping it doesn't affect
  // the style in any way let's just do that.
  return (
    <ElementType {...rest} className={classes} onClick={handleClick}>
      {renderer(props)}
    </ElementType>
  );
};

SearchResult.defaultProps = { renderer: defaultRenderer as any };

export { SearchResult };
