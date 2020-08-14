import React from 'react';

import { useClassNamesOnNode } from '../../lib';

export interface MountNodeProps extends StrictMountNodeProps {
  [key: string]: any;
}

export interface StrictMountNodeProps {
  /** Additional classes. */
  className?: string;

  /** The DOM node where we will apply class names. Defaults to document.body. */
  node?: HTMLElement | React.Ref<any>;
}

/**
 * A component that allows to manage classNames on a DOM node in declarative manner.
 */
export function MountNode(props: MountNodeProps) {
  useClassNamesOnNode(props.node, props.className);

  // A workaround for `react-docgen`: https://github.com/reactjs/react-docgen/issues/336
  if (process.env.NODE_ENV === 'test') {
    return <div />;
  }

  /* istanbul ignore next */
  return null;
}
