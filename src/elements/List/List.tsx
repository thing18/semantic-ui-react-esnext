import React, { useCallback, Children } from 'react';

import { SemanticFLOATS, SemanticShorthandCollection, SemanticShorthandContent, SemanticSIZES, SemanticVERTICALALIGNMENTS, Use, getClassName, SemanticProps } from '../../lib';
import { ListItem, ListItemProps } from './ListItem';
import { ListContent } from './ListContent';
import { ListDescription } from './ListDescription';
import { ListHeader } from './ListHeader';
import { ListIcon } from './ListIcon';
import { ListList } from './ListList';

interface StrictListProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A list can animate to set the current item apart from the list. */
  animated?: boolean;

  /** A list can mark items with a bullet. */
  bulleted?: boolean;

  /** A list can divide its items into cells. */
  celled?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A list can show divisions between content. */
  divided?: boolean;

  /** An list can be floated left or right. */
  floated?: SemanticFLOATS;

  /** A list can be formatted to have items appear horizontally. */
  horizontal?: boolean;

  /** A list can be inverted to appear on a dark background. */
  inverted?: boolean;

  /** Shorthand array of props for ListItem. */
  items?: SemanticShorthandCollection<ListItemProps>;

  /** A list can be specially formatted for navigation links. */
  link?: boolean;

  /**
   * onClick handler for ListItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: ListItemProps) => void;

  /** A list can be ordered numerically. */
  ordered?: boolean;

  /** A list can relax its padding to provide more negative space. */
  relaxed?: boolean | 'very';

  /** A selection list formats list items as possible choices. */
  selection?: boolean;

  /** A list can vary in size. */
  size?: SemanticSIZES;

  /** An element inside a list can be vertically aligned. */
  verticalAlign?: SemanticVERTICALALIGNMENTS;
}

type ListProps = SemanticProps<StrictListProps>;

interface CList extends React.FC<ListProps> {
  Content: typeof ListContent;
  Description: typeof ListDescription;
  Header: typeof ListHeader;
  Icon: typeof ListIcon;
  Item: typeof ListItem;
  List: typeof ListList;
}

/**
 * A list groups related content.
 */
const List: CList = ({ as = 'div', animated, bulleted, celled, children, className, content, divided, floated, horizontal, inverted, items, link, onItemClick, ordered, relaxed, selection, size, verticalAlign, ...rest }) => {

  const classes = getClassName(
    'ui', size,
    [Use.Key, { animated, bulleted, celled, divided, horizontal, inverted, link, ordered, selection }],
    [Use.KeyOrValueKey, { relaxed }],
    [Use.ValueKey, { floated }],
    [Use.VerticalAlign, verticalAlign],
    'list', className);

  const handleItemOverrides = useCallback(
    pp => ({
      onClick: (e: React.MouseEvent<any, any>, p: ListItemProps) => {
        pp?.onClick && pp.onClick(e, p);
        onItemClick?.call(null, e, p);
      },
    }),
    [onItemClick],
  );

  const ElementType = !!rest.href ? 'a' : as;

  if (Children.count(children)) {
    return (
      <ElementType role='list' className={classes} {...rest}>
        {children}
      </ElementType>
    );
  }

  if (content != null) {
    return (
      <ElementType role='list' className={classes} {...rest}>
        {content}
      </ElementType>
    );
  }

  return (
    <ElementType role='list' className={classes} {...rest}>
      {items && items.map(item => ListItem.create(item, { overrideProps: handleItemOverrides }))}
    </ElementType>
  );
};

List.Icon = ListIcon;
List.Item = ListItem;
List.Content = ListContent;
List.Description = ListDescription;
List.Header = ListHeader;
List.List = ListList;

export { List, ListProps, StrictListProps };
