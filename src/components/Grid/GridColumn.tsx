import React from 'react';

import { SemanticCOLORS, SemanticFLOATS, SemanticTEXTALIGNMENTS, SemanticVERTICALALIGNMENTS, SemanticWIDTHS, createShorthandFactory, FCX, getClassName, Use } from '../../lib';

export type GridOnlyProp = string | 'computer' | 'largeScreen' | 'mobile' | 'tablet mobile' | 'tablet' | 'widescreen';

export interface GridColumnProps extends StrictGridColumnProps {
  [key: string]: any;
}

export interface StrictGridColumnProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A grid column can be colored. */
  color?: SemanticCOLORS;

  /** A column can specify a width for a computer. */
  computer?: SemanticWIDTHS;

  /** A column can sit flush against the left or right edge of a row. */
  floated?: SemanticFLOATS;

  /** A column can specify a width for a large screen device. */
  largeScreen?: SemanticWIDTHS;

  /** A column can specify a width for a mobile device. */
  mobile?: SemanticWIDTHS;

  /** A column can appear only for a specific device, or screen sizes. */
  only?: GridOnlyProp;

  /** An can stretch its contents to take up the entire grid or row height. */
  stretched?: boolean;

  /** A column can specify a width for a tablet device. */
  tablet?: SemanticWIDTHS;

  /** A row can specify its text alignment. */
  textAlign?: SemanticTEXTALIGNMENTS;

  /** A column can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign?: SemanticVERTICALALIGNMENTS;

  /** A column can specify a width for a wide screen device. */
  widescreen?: SemanticWIDTHS;

  /** Represents width of column. */
  width?: SemanticWIDTHS;
}

/**
 * A column sub-component for Grid.
 */
export const GridColumn: FCX<GridColumnProps> = ({ as: ElementType = 'div', children, className, computer, color, floated, largeScreen, mobile, only, stretched, tablet, textAlign, verticalAlign, widescreen, width, ...rest }) => {

  const classes = getClassName(color, [Use.Key, { stretched }], [Use.Multiple, { only }], [Use.TextAlign, textAlign], [Use.ValueKey, { floated }], [Use.VerticalAlign, verticalAlign],
    [Use.Width, [[computer, 'wide computer'], [largeScreen, 'wide large screen'], [mobile, 'wide mobile'], [tablet, 'wide tablet'], [widescreen, 'wide widescreen'], [width, 'wide']]],
    'column', className,
  );

  return (
    <ElementType {...rest} className={classes}>
      {children}
    </ElementType>
  );
};

GridColumn.create = createShorthandFactory(GridColumn, (children) => ({ children }));
