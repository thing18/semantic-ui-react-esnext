import { Component } from 'react';

import { getNodeRefFromProps } from './lib/getNodeRefFromProps';
import { handleClassNamesChange } from './lib/handleClassNamesChange';
import { NodeRegistry } from './lib/NodeRegistry';

export interface MountNodeProps extends StrictMountNodeProps {
  [key: string]: any;
}

export interface StrictMountNodeProps {
  /** Additional classes. */
  className?: string;

  /** The DOM node where we will apply class names. Defaults to document.body. */
  node?: HTMLElement | React.Ref<any>;
}

const nodeRegistry = new NodeRegistry();

/**
 * A component that allows to manage classNames on a DOM node in declarative manner.
 */
export class MountNode extends Component<MountNodeProps, {}> {

  static propTypes: any;

  shouldComponentUpdate({ className: nextClassName }: MountNodeProps) {

    const { className: currentClassName } = this.props;

    return nextClassName !== currentClassName;
  }

  componentDidMount() {
    const nodeRef = getNodeRefFromProps(this.props);

    nodeRegistry.add(nodeRef, this);
    nodeRegistry.emit(nodeRef, handleClassNamesChange);
  }

  componentDidUpdate() {
    nodeRegistry.emit(getNodeRefFromProps(this.props), handleClassNamesChange);
  }

  componentWillUnmount() {
    const nodeRef = getNodeRefFromProps(this.props);

    nodeRegistry.del(nodeRef, this);
    nodeRegistry.emit(nodeRef, handleClassNamesChange);
  }

  render() {
    return null;
  }
}
