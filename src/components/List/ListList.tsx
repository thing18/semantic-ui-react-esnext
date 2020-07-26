import React from 'react';

import { SemanticProps, SemanticShorthandContent, childrenUtils, getClassName } from '../../lib';

export interface StrictListListProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;
}

export type ListListProps = SemanticProps<StrictListListProps>;

/**
 * A list can contain a sub list.
 */
export const ListList: React.FC<ListListProps> = ({ as, children, className, content, ...rest }) => {

  // tslint:disable-next-line: triple-equals
  const ElementType = as && as != 'div' ? as : !!rest.href ? 'a' : 'div';
  const classes = getClassName({ list: ElementType !== 'ul' && ElementType !== 'ol' }, className);

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};
