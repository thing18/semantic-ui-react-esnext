import React from 'react';
import { findDOMNode } from 'react-dom';

import { handleRef } from './handleRef';
import { RefProps } from './types';

export class RefFindNode extends React.Component<RefProps> {

  prevNode: Node | null = null;

  componentDidMount() {
    this.prevNode = findDOMNode(this);

    handleRef(this.props.innerRef, this.prevNode);
  }

  componentDidUpdate(prevProps: RefProps) {
    const currentNode = findDOMNode(this);

    if (this.prevNode !== currentNode) {
      this.prevNode = currentNode;
      handleRef(this.props.innerRef, currentNode);
    }

    if (prevProps.innerRef !== this.props.innerRef) {
      handleRef(this.props.innerRef, currentNode);
    }
  }

  componentWillUnmount() {
    handleRef(this.props.innerRef, null);

    delete this.prevNode;
  }

  render() {
    const { children } = this.props;

    return children;
  }
}
