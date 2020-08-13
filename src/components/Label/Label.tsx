import React, { Children } from 'react';

import { SemanticCOLORS, SemanticShorthandContent, SemanticShorthandItem, SemanticSIZES, childrenUtils, createShorthandFactory, FCX, Use, getClassName } from '../../lib';
import { Image } from '../Image';
import { IconProps, Icon } from '../Icon';
import { LabelDetail, LabelDetailProps } from './LabelDetail';
import { LabelGroup } from './LabelGroup';

export interface StrictLabelProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** A label can be active. */
  active?: boolean;

  /** A label can attach to a content segment. */
  attached?: 'top' | 'bottom' | 'top right' | 'top left' | 'bottom left' | 'bottom right';

  /** A label can reduce its complexity. */
  basic?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** A label can be circular. */
  circular?: boolean;

  /** Additional classes. */
  className?: string;

  /** Color of the label. */
  color?: SemanticCOLORS;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A label can position itself in the corner of an element. */
  corner?: boolean | 'left' | 'right';

  /** Shorthand for LabelDetail. */
  detail?: SemanticShorthandItem<LabelDetailProps>;

  /** Formats the label as a dot. */
  empty?: any;

  /** Float above another element in the upper right corner. */
  floating?: boolean;

  /** A horizontal label is formatted to label content along-side it horizontally. */
  horizontal?: boolean;

  /** Add an icon by icon name or pass an <Icon /.> */
  icon?: SemanticShorthandItem<IconProps>;

  /** A label can be formatted to emphasize an image or prop can be used as shorthand for Image. */
  image?: any;

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>, data: LabelProps) => void;

  /**
   * Adds an "x" icon, called when "x" is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onRemove?: (event: React.MouseEvent<HTMLElement>, data: LabelProps) => void;

  /** A label can point to content next to it. */
  pointing?: boolean | 'above' | 'below' | 'left' | 'right';

  /** A label can prompt for an error in your forms. */
  prompt?: boolean;

  /** Shorthand for Icon to appear as the last child and trigger onRemove. */
  removeIcon?: SemanticShorthandItem<IconProps>;

  /** A label can appear as a ribbon attaching itself to an element. */
  ribbon?: boolean | 'right';

  /** A label can have different sizes. */
  size?: SemanticSIZES;

  /** A label can appear as a tag. */
  tag?: boolean;
}

export interface LabelProps extends StrictLabelProps {
  [key: string]: any;
}

interface CLabel extends FCX<LabelProps> {
  Detail: typeof LabelDetail;
  Group: typeof LabelGroup;
}

/**
 * A label displays content classification.
 */
export const Label: CLabel = (props) => {

  const { onClick, as, active, attached, basic, children, circular, className, color, content, corner, detail, empty, floating, horizontal, icon, image, onRemove, pointing, prompt, removeIcon, ribbon, size, tag, ...rest } = props;

  const ElementType = as && as !== 'div' ? as : rest.href ? 'a' : 'div';

  const pointingClass = (pointing === true && 'pointing') || ((pointing === 'left' || pointing === 'right') && `${pointing} pointing`) || ((pointing === 'above' || pointing === 'below') && `pointing ${pointing}`) as any;

  const classes = getClassName('ui', color, pointingClass, size,
    // tslint:disable-next-line: object-shorthand-properties-first
    { active, basic, circular, empty, floating, horizontal, image: image === true, prompt, tag },
    [Use.KeyOrValueKey, { corner, ribbon }],
    [Use.ValueKey, { attached }],
    'label', className);

  const handleClick = (e: any) => onClick?.call(null, e, props);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes} onClick={handleClick}>
        {children}
      </ElementType>
    );
  }

  const handleIconOverrides = (pp: IconProps) => ({
    onClick: (e: any) => {
      pp.onClick?.call(null, e);
      onRemove?.call(null, e, props);
    },
  });

  const removeIconShorthand = removeIcon === undefined ? 'delete' : removeIcon;

  // tslint:disable: triple-equals
  return (
    <ElementType className={classes} onClick={handleClick} {...rest}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {typeof image != 'boolean' && Image.create(image, { autoGenerateKey: false })}
      {content}
      {LabelDetail.create(detail, { autoGenerateKey: false })}
      {onRemove && Icon.create(removeIconShorthand, { autoGenerateKey: false, overrideProps: handleIconOverrides })}
    </ElementType>
  );
};

Label.Detail = LabelDetail;
Label.Group = LabelGroup;
Label.create = createShorthandFactory(Label, (value) => ({ content: value }));
