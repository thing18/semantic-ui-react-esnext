import React from 'react';

import { SemanticVERTICALALIGNMENTS, createShorthandFactory, FCX, getClassName, Use } from '../../lib';
import { Icon, StrictIconProps } from '..';

interface ListIconProps extends StrictListIconProps {
  [key: string]: any;
}

interface StrictListIconProps extends StrictIconProps {
  /** Additional classes. */
  className?: string;

  /** An element inside a list can be vertically aligned. */
  verticalAlign?: SemanticVERTICALALIGNMENTS;
}

/**
 * A list item can contain an icon.
 */
const ListIcon: FCX<ListIconProps> = ({ className, verticalAlign, ...rest }) => <Icon {...rest} className={getClassName([Use.VerticalAlign, verticalAlign], className)} />;

ListIcon.create = createShorthandFactory(ListIcon, (name) => ({ name }));

export { ListIcon, ListIconProps, StrictListIconProps };
