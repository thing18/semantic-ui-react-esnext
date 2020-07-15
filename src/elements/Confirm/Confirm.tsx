import React, { Component } from 'react';

import { customPropTypes, SemanticShorthandItem } from '../../lib';
import { StrictModalProps, ButtonProps, ModalContentProps, ModalHeaderProps, Modal, ModalHeader, ModalContent, ModalActions, Button } from '..';
export interface ConfirmProps extends StrictConfirmProps {
  [key: string]: any;
}

export interface StrictConfirmProps extends StrictModalProps {
  /** The cancel button text. */
  cancelButton?: SemanticShorthandItem<ButtonProps>;

  /** The OK button text. */
  confirmButton?: SemanticShorthandItem<ButtonProps>;

  /** The ModalContent text. */
  content?: SemanticShorthandItem<ModalContentProps>;

  /** The ModalHeader text. */
  header?: SemanticShorthandItem<ModalHeaderProps>;

  /**
   * Called when the Modal is closed without clicking confirm.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onCancel?: (event: React.MouseEvent<HTMLAnchorElement>, data: ConfirmProps) => void;

  /**
   * Called when the OK button is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onConfirm?: (event: React.MouseEvent<HTMLAnchorElement>, data: ConfirmProps) => void;

  /** Whether or not the modal is visible. */
  open?: boolean;

  /** A confirm can vary in size. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';
}

/**
 * A Confirm modal gives the user a choice to confirm or cancel an action/
 * @see Modal
 */
const Confirm: React.FC<ConfirmProps> = props => {

  const { cancelButton, confirmButton, content, header, open, size, onCancel, onConfirm, ...rest } = { ...Confirm.defaultProps, ...props };

  const handleCancel = (e: any) => onCancel?.call(null, e, props);

  const handleCancelOverrides = (pprops: ButtonProps) => ({
    onClick: (e: any, bprops: ButtonProps) => {
      pprops.onClick?.call(null, e, bprops);
      onCancel?.call(null, e, props);
    },
  });

  const handleConfirmOverrides = (pprops: ButtonProps) => ({
    onClick: (e: any, bprops: ButtonProps) => {
      pprops.onClick?.call(null, e, bprops);
      onConfirm?.call(null, e, props);
    },
  });

  // `open` is auto controlled by the Modal
  // It cannot be present (even undefined) with `defaultOpen`
  // only apply it if the user provided an open prop
  const openProp = {} as any;
  if (props.hasOwnProperty('open')) openProp.open = open;

  return (
    <Modal {...rest} {...openProp} size={size} onClose={handleCancel}>
      {ModalHeader.create(header, { autoGenerateKey: false })}
      {ModalContent.create(content, { autoGenerateKey: false })}
      <ModalActions>
        {Button.create(cancelButton, { autoGenerateKey: false, overrideProps: handleCancelOverrides })}
        {Button.create(confirmButton, { autoGenerateKey: false, defaultProps: { primary: true }, overrideProps: handleConfirmOverrides })}
      </ModalActions>
    </Modal>
  );
};

Confirm.defaultProps = {
  cancelButton: 'Cancel',
  confirmButton: 'OK',
  content: 'Are you sure?',
  size: 'small',
};

export { Confirm };
