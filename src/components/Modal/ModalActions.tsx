import React, { Component, Children } from 'react';

import { ButtonProps, Button } from '..';
import { SemanticShorthandCollection, SemanticShorthandContent, FCX, createShorthandFactory, getClassName } from '../../lib';

export interface ModalActionsProps extends StrictModalActionsProps {
  [key: string]: any;
}

export interface StrictModalActionsProps {
  /** An element type to render as (string or function). */
  as?: any;

  /** Array of shorthand buttons. */
  actions?: SemanticShorthandCollection<ButtonProps>;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /**
   * onClick handler for an action. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onActionClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: ButtonProps) => void;
}

/**
 * A modal can contain a row of actions.
 */
const ModalActions: FCX<ModalActionsProps> = props => {

  const { as: ElementType = 'div', actions, children, className, content, onActionClick, ...rest } = props;

  const handleButtonOverrides = (pprops: ButtonProps) => ({
    onClick: (e: any, bprops: ButtonProps) => {
      pprops.onClick?.call(null, e, bprops);
      onActionClick?.call(null, e, bprops);
    },
  });

  const classes = getClassName('actions', className);

  if (Children.count(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }
  if (content != null) {
    return (
      <ElementType {...rest} className={classes}>
        {content}
      </ElementType>
    );
  }

  return (
    <ElementType {...rest} className={classes}>
      {actions && actions.map((action) => Button.create(action, { overrideProps: handleButtonOverrides }))}
    </ElementType>
  );
};

ModalActions.create = createShorthandFactory(ModalActions, (actions) => ({ actions }));

export { ModalActions };
