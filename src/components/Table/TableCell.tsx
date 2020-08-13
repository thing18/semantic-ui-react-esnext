import React, { Children } from 'react';

import { SemanticShorthandContent, SemanticShorthandItem, SemanticVERTICALALIGNMENTS, SemanticWIDTHS, SemanticTEXTALIGNMENTS, createShorthandFactory, FCX, getClassName, Use } from '../../lib';
import { Icon, IconProps } from '..';

export interface TableCellProps extends StrictTableCellProps {
  [key: string]: any;
}

export interface StrictTableCellProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** A cell can be active or selected by a user. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A table can be collapsing, taking up only as much space as its rows. */
  collapsing?: boolean;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A cell can be disabled. */
  disabled?: boolean;

  /** A cell may call attention to an error or a negative value. */
  error?: boolean;

  /** Add an Icon by name, props object, or pass an <Icon /> */
  icon?: SemanticShorthandItem<IconProps>;

  /** A cell may let a user know whether a value is bad. */
  negative?: boolean;

  /** A cell may let a user know whether a value is good. */
  positive?: boolean;

  /** A cell can be selectable. */
  selectable?: boolean;

  /** A cell can specify that its contents should remain on a single line and not wrap. */
  singleLine?: boolean;

  /** A table cell can adjust its text alignment. */
  textAlign?: Exclude<SemanticTEXTALIGNMENTS, 'justified'>;

  /** A table cell can adjust its text alignment. */
  verticalAlign?: SemanticVERTICALALIGNMENTS;

  /** A cell may warn a user. */
  warning?: boolean;

  /** A table can specify the width of individual columns independently. */
  width?: SemanticWIDTHS;
}

/**
 * A table row can have cells.
 */
export const TableCell: FCX<TableCellProps> = ({ as: ElementType = 'td', active, children, className, collapsing, content, disabled, error, icon, negative, positive, selectable, singleLine, textAlign, verticalAlign, warning, width, ...rest }) => {

  const classes = getClassName(
    { active, collapsing, disabled, error, negative, positive, selectable, singleLine, warning },
    [Use.TextAlign, textAlign],
    [Use.VerticalAlign, verticalAlign],
    [Use.Width, width, 'wide'],
    className,
  );

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {Icon.create(icon)}
      {content}
    </ElementType>
  );
};

TableCell.defaultProps = { as: 'td' };
TableCell.create = createShorthandFactory(TableCell, (content) => ({ content }));
