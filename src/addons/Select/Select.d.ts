import * as React from 'react'

import { StrictDropdownProps } from '../../elements/Dropdown'
import DropdownDivider from '../../elements/Dropdown/DropdownDivider'
import DropdownHeader from '../../elements/Dropdown/DropdownHeader'
import DropdownItem, { DropdownItemProps } from '../../elements/Dropdown/DropdownItem'
import DropdownMenu from '../../elements/Dropdown/DropdownMenu'

export interface SelectProps extends StrictSelectProps {
  [key: string]: any
}

export interface StrictSelectProps extends StrictDropdownProps {
  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: DropdownItemProps[]
}

interface SelectComponent extends React.StatelessComponent<SelectProps> {
  Divider: typeof DropdownDivider
  Header: typeof DropdownHeader
  Item: typeof DropdownItem
  Menu: typeof DropdownMenu
}

declare const Select: SelectComponent

export default Select
