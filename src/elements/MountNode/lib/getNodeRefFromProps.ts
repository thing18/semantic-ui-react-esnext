import { isRefObject, toRefObject } from '../../';

import { isBrowser } from '../../../lib';

/**
 * Given `this.props`, return a `node` value or undefined.
 *
 * @param {object|React.RefObject} props Component's props
 * @return {React.RefObject|undefined}
 */
export const getNodeRefFromProps = (props: any) => {
  const { node } = props;

  if (isBrowser()) {
    if (isRefObject(node)) return node;

    return node == null ? toRefObject(document.body) : toRefObject(node);
  }
};
