// import * as PropTypes from 'prop-types'
import React, { cloneElement, Children } from 'react';
import { isForwardRef } from 'react-is';

import { RefFindNode } from './RefFindNode';
import { RefForward } from './RefForward';
import { RefProps } from './types';

export const Ref: React.FunctionComponent<RefProps> = ({ children, innerRef, ...rest }) => {

  const child = Children.only(children);
  const ElementType = isForwardRef(child) ? RefForward : RefFindNode;
  const childWithProps = child && rest && Object.keys(rest).length > 0 ? cloneElement(child, rest) : child;

  return <ElementType innerRef={innerRef}>{childWithProps}</ElementType>;
};
