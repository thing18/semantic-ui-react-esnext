
import { computeClassNames } from './computeClassNames';
import { computeClassNamesDifference } from './computeClassNamesDifference';

const prevClassNames = new Map();

/**
 * @param {React.RefObject} nodeRef
 * @param {Object[]} components
 */
export const handleClassNamesChange = (nodeRef: React.RefObject<any>, components: Set<any>) => {

  const currentClassNames = computeClassNames(components);

  const [forAdd, forRemoval] = computeClassNamesDifference(prevClassNames.get(nodeRef), currentClassNames);

  if (nodeRef.current) {

    forAdd.forEach((className: string) => nodeRef.current.classList.add(className));
    forRemoval.forEach((className: string) => nodeRef.current.classList.remove(className));
  }

  prevClassNames.set(nodeRef, currentClassNames);
};
