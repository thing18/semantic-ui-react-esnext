import React, { cloneElement } from 'react';

import { handleRef } from './handleRef';
import { RefProps } from './types';

export const RefForward: React.FC<RefProps> = ({ children, innerRef }) => {

  const handleRefOverride = (node: HTMLElement) => {

    handleRef((children as React.ReactElement<any> & { ref: React.Ref<any> }).ref, node);
    handleRef(innerRef, node);
  };

  return cloneElement(children, { ref: handleRefOverride });
};
