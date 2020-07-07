import React, { Children } from 'react';

import { SemanticCOLORS, SemanticShorthandContent, SemanticSIZES, getClassName, Use } from '../../lib';

export interface StrictLabelGroupProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Labels can share shapes. */
  circular?: boolean;

  /** Additional classes. */
  className?: string;

  /** Label group can share colors together. */
  color?: SemanticCOLORS;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Label group can share sizes together. */
  size?: SemanticSIZES;

  /** Label group can share tag formatting. */
  tag?: boolean;
}

export interface LabelGroupProps extends StrictLabelGroupProps {
  [key: string]: any;
}

/**
 * A label can be grouped.
 */
export const LabelGroup: React.FC<LabelGroupProps> = ({ as: ElementType = 'div', children, circular, className, color, content, size, tag, ...rest }) => {

  const classes = getClassName('ui', color, size, [Use.Key, { circular, tag }], 'labels', className);

  return (
    <ElementType {...rest} className={classes}>
      {Children.count(children) ? children : content}
    </ElementType>
  );
};
