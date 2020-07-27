import React from 'react';

import { StrictDropdownProps, DropdownDivider, DropdownHeader, DropdownItem, DropdownItemProps, DropdownMenu, Dropdown } from '../Dropdown';

export interface SelectProps extends StrictSelectProps {
  [key: string]: any;
}

export interface StrictSelectProps extends StrictDropdownProps {
  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: DropdownItemProps[];
}

interface CSelect extends React.FC<SelectProps> {
  Divider: typeof DropdownDivider;
  Header: typeof DropdownHeader;
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
}

/**
 * A Select is sugar for <Dropdown selection />.
 * @see Dropdown
 * @see Form
 */
const Select: CSelect = props => <Dropdown {...props} selection />;

Select.Divider = Dropdown.Divider;
Select.Header = Dropdown.Header;
Select.Item = Dropdown.Item;
Select.Menu = Dropdown.Menu;

export { Select };
