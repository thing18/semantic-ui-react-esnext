import { handleRef, Ref } from '..';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { isBrowser } from '../../lib';

export interface PortalInnerProps extends StrictPortalInnerProps {
  [key: string]: any;
}

export interface StrictPortalInnerProps {
  /** Primary content. */
  children: React.ReactNode;

  /** Called with a ref to the inner node. */
  innerRef?: React.Ref<any>;

  /** The node where the portal should mount. */
  mountNode?: any;

  /**
   * Called when the PortalInner is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount?: (nothing: null, data: PortalInnerProps) => void;

  /**
   * Called when the PortalInner is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount?: (nothing: null, data: PortalInnerProps) => void;
}

/**
 * An inner component that allows you to render children outside their parent.
 */
export const PortalInner: React.FC<PortalInnerProps> = props => {

  useEffect(
    () => {
      props.onMount?.call(null, null, props);

      return () => props.onUnmount?.call(null, null, props);
    },
    [],
  );

  const _handleRef = (c: any) => handleRef(props.innerRef!, c);

  if (!isBrowser()) return null;

  return createPortal(<Ref innerRef={_handleRef}>{props.children as any}</Ref>, props.mountNode ?? document.body);
};
