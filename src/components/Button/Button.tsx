import React, { useCallback, forwardRef, Children } from 'react';

import { SemanticCOLORS, SemanticFLOATS, SemanticShorthandContent, SemanticShorthandItem, SemanticSIZES, createShorthandFactory, FCX, Use, getClassName } from '../../lib';
import { IconProps, Icon, LabelProps, Label } from '..';
import { ButtonContent } from './ButtonContent';
import { ButtonGroup } from './ButtonGroup';
import { ButtonOr } from './ButtonOr';

export interface StrictButtonProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** A button can show it is currently the active user selection. */
  active?: boolean;

  /** A button can animate to show hidden content. */
  animated?: boolean | 'fade' | 'vertical';

  /** A button can be attached to other content. */
  attached?: boolean | 'left' | 'right' | 'top' | 'bottom';

  /** A basic button is less pronounced. */
  basic?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** A button can be circular. */
  circular?: boolean;

  /** Additional classes. */
  className?: string;

  /** A button can have different colors. */
  color?:
  | SemanticCOLORS
  | 'facebook'
  | 'google plus'
  | 'vk'
  | 'twitter'
  | 'linkedin'
  | 'instagram'
  | 'youtube';

  /** A button can reduce its padding to fit into tighter spaces. */
  compact?: boolean;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A button can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** A button can be aligned to the left or right of its container. */
  floated?: SemanticFLOATS;

  /** A button can take the width of its container. */
  fluid?: boolean;

  /** Add an Icon by name, props object, or pass an <Icon />. */
  icon?: boolean | SemanticShorthandItem<IconProps>;

  /** A button can be formatted to appear on dark backgrounds. */
  inverted?: boolean;

  /** Add a Label by text, props object, or pass a <Label />. */
  label?: SemanticShorthandItem<LabelProps>;

  /** A labeled button can format a Label or Icon to appear on the left or right. */
  labelPosition?: 'right' | 'left';

  /** A button can show a loading indicator. */
  loading?: boolean;

  /** A button can hint towards a negative consequence. */
  negative?: boolean;

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void;

  /** A button can hint towards a positive consequence. */
  positive?: boolean;

  /** A button can be formatted to show different levels of emphasis. */
  primary?: boolean;

  /** The role of the HTML element. */
  role?: string;

  /** A button can be formatted to show different levels of emphasis. */
  secondary?: boolean;

  /** A button can have different sizes. */
  size?: SemanticSIZES;

  /** A button can receive focus. */
  tabIndex?: number | string;

  /** A button can be formatted to toggle on and off. */
  toggle?: boolean;
}

export interface ButtonProps extends StrictButtonProps {
  [key: string]: any;
}

interface CButton extends FCX<ButtonProps> {
  Content: typeof ButtonContent;
  Group: typeof ButtonGroup;
  Or: typeof ButtonOr;
}

// tslint:disable: triple-equals
const getElementType = ({ as, label, attached }: ButtonProps) =>
  as && as != 'button'
    ? as
    : ((attached != null) || (label != null))
      ? 'div'
      : 'button';

const getTabIndex = (elementType: string, { tabIndex, disabled }: ButtonProps) =>
  tabIndex != null
    ? +tabIndex
    : disabled
      ? -1
      : elementType == 'div'
        ? 0
        : undefined;
// tslint:enable: triple-equals

/**
 * A Button indicates a possible user action.
 * @see Form
 * @see Icon
 * @see Label
 */
export const Button: CButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {

  const {
    onClick,
    as, active, animated, attached, basic, children, circular, className, color, compact, content, disabled,
    floated, fluid, icon, inverted, label, labelPosition, loading, negative, positive, primary, secondary,
    size, toggle, role, tabIndex, ...rest } = { ...Button.defaultProps, ...props };

  const handleClick = (e: any) => {

    if (disabled) return e.preventDefault();
    onClick?.call(null, e, props);
  };

  // tslint:disable: object-shorthand-properties-first
  const baseClasses = getClassName(
    color, size,
    {
      active, basic, circular, compact, fluid,
      icon: (icon === true ? true : icon && (labelPosition || (!Children.count(children) && (content == null)))),
      inverted, loading, negative, positive, primary, secondary, toggle,
    },
    [Use.KeyOrValueKey, { animated, attached }],
  );

  const labeledClasses = getClassName([Use.KeyOrValueKey, { labeled: labelPosition || !!label }]);

  const wrapperClasses = getClassName({ disabled }, [Use.ValueKey, { floated }]);

  // tslint:enable: object-shorthand-properties-first
  const ElementType = getElementType(props);

  if (label != null) {

    const buttonClasses = getClassName('ui', baseClasses, 'button', className);
    const containerClasses = getClassName('ui', labeledClasses, 'button', className, wrapperClasses);
    const labelElement = Label.create(label, { defaultProps: { basic: true, pointing: labelPosition === 'left' ? 'right' : 'left' }, autoGenerateKey: false });

    return (
      <ElementType {...rest} className={containerClasses} onClick={handleClick} >
        {labelPosition === 'left' && labelElement}
        <button ref={ref} className={buttonClasses} aria-pressed={toggle ? !!active : undefined} disabled={disabled} tabIndex={getTabIndex(ElementType, props)} >
          {Icon.create(icon, { autoGenerateKey: false })}
          {content}
        </button>
        {(labelPosition === 'right' || !labelPosition) && labelElement}
      </ElementType>
    );
  }

  const classes = getClassName('ui', baseClasses, wrapperClasses, labeledClasses, 'button', className);
  const hasChildren = !!Children.count(children);

  // tslint:disable: triple-equals
  return (
    <ElementType
      {...rest}
      className={classes}
      aria-pressed={toggle ? !!active : undefined}
      disabled={(disabled && ElementType === 'button') || undefined}
      onClick={handleClick}
      role={role != null ? role : ElementType != 'button' ? 'button' : undefined}
      tabIndex={getTabIndex(ElementType, props)}
      ref={ref}
    >
      {hasChildren && children}
      {!hasChildren && Icon.create(icon, { autoGenerateKey: false })}
      {!hasChildren && content}
    </ElementType>
    // tslint:enable: triple-equals
  );
}) as any;

Button.defaultProps = { as: 'button' };
Button.Group = ButtonGroup;
Button.Or = ButtonOr;
Button.Content = ButtonContent;
Button.create = createShorthandFactory(Button, (value) => ({ content: value }));
