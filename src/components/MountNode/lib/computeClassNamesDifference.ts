
export const computeClassNamesDifference = (prevClassNames: string[], currentClassNames: string[]) => [

  currentClassNames.filter(x => !prevClassNames.includes(x)),
  prevClassNames.filter(x => !currentClassNames.includes(x)),
];
