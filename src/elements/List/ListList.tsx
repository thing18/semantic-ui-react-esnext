import React from 'react';

import { SemanticProps, SemanticShorthandContent, childrenUtils, getClassNames } from '../../lib';

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
export const ListList: React.FC<ListListProps> = ({ as = 'div', children, className, content, ...rest }) => {

  const ElementType = !!rest.href ? 'a' : as;
  const classes = getClassNames({ useKey: { list: ElementType !== 'ul' && ElementType !== 'ol' }, useEnd: [className] });

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );
};
