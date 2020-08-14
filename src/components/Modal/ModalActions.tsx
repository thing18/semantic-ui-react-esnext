import React, { Children } from 'react';

import { SemanticShorthandCollection, SemanticShorthandContent, FCX, createShorthandFactory, getClassName1 } from '../../lib';
import { ButtonProps, Button } from '../Button';

export interface ModalActionsProps extends StrictModalActionsProps {
  [key: string]: any;
}

export interface StrictModalActionsProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

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
function ModalActions(props: ModalActionsProps) {

  const { as: ElementType = 'div', actions, children, className, content, onActionClick, ...rest } = props;

  function handleButtonOverrides(bp: ButtonProps) {

    return {
      onClick: (e: any, bprops: ButtonProps) => {
        bp.onClick?.call(null, e, bprops);
        props.onActionClick?.call(null, e, bprops);
      },
    };
  }

  const classes = getClassName1('actions', className);

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
}

ModalActions.create = createShorthandFactory(ModalActions, (actions) => ({ actions }));

export { ModalActions };
