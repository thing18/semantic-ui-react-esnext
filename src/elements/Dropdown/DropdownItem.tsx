import React, { Children } from 'react';

import { HtmlSpanProps, SemanticShorthandContent, SemanticShorthandItem, FCX, getClassName, createShorthand, createShorthandFactory } from '../../lib';
import { FlagProps, Flag, IconProps, Icon, ImageProps, Image, LabelProps, Label } from '..';

export interface DropdownItemProps extends StrictDropdownItemProps {
  [key: string]: any;
}

export interface StrictDropdownItemProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Style as the currently chosen item. */
  active?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** Additional text with less emphasis. */
  description?: SemanticShorthandItem<HtmlSpanProps>;

  /** A dropdown item can be disabled. */
  disabled?: boolean;

  /** Shorthand for Flag. */
  flag?: SemanticShorthandItem<FlagProps>;

  /** Shorthand for Icon. */
  icon?: SemanticShorthandItem<IconProps>;

  /** Shorthand for Image. */
  image?: SemanticShorthandItem<ImageProps>;

  /** Shorthand for Label. */
  label?: SemanticShorthandItem<LabelProps>;

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: DropdownItemProps) => void;

  /**
   * The item currently selected by keyboard shortcut.
   * This is not the active item.
   */
  selected?: boolean;

  /** Display text. */
  text?: SemanticShorthandContent;

  /** Stored value. */
  value?: boolean | number | string;
}

/**
 * An item sub-component for Dropdown component.
 */
const DropdownItem: FCX<DropdownItemProps> = props => {

  const { as: ElementType = 'div', active, children, className, content, disabled, description, flag, icon, image, label, selected, text, onClick, ...rest } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onClick?.call(null, e, props);

  const classes = getClassName({ active, disabled, selected }, 'item', className);

  const ariaOptions = { role: 'option', 'aria-disabled': disabled, 'aria-checked': active, 'aria-selected': selected };

  if (Children.count(children)) {
    return (
      <ElementType {...rest} {...ariaOptions} className={classes} onClick={handleClick}>
        {children}
      </ElementType>
    );
  }

  // add default dropdown icon if item contains another menu
  const iconName = icon == null ? Children.toArray(children).some((c: any) => c.type === 'DropdownMenu') && 'dropdown' : icon;

  const flagElement = Flag.create(flag, { autoGenerateKey: false });
  const iconElement = Icon.create(iconName, { autoGenerateKey: false });
  const imageElement = Image.create(image, { autoGenerateKey: false });
  const labelElement = Label.create(label, { autoGenerateKey: false });
  const descriptionElement = createShorthand('span', (val: any) => ({ children: val }), description, { defaultProps: { className: 'description' }, autoGenerateKey: false });
  const textElement = createShorthand('span', (val: any) => ({ children: val }), content == null ? text : content, { defaultProps: { className: 'text' }, autoGenerateKey: false });

  return (
    <ElementType {...rest} {...ariaOptions} className={classes} onClick={handleClick}>
      {imageElement}
      {iconElement}
      {flagElement}
      {labelElement}
      {descriptionElement}
      {textElement}
    </ElementType>
  );
};

DropdownItem.create = createShorthandFactory(DropdownItem, (opts: any) => opts);

export { DropdownItem };
