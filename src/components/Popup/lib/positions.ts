
export const positionsMapping = {
  'top center': 'top',
  'top left': 'top-start',
  'top right': 'top-end',

  'bottom center': 'bottom',
  'bottom left': 'bottom-start',
  'bottom right': 'bottom-end',

  'right center': 'right',
  'left center': 'left',
};

export const positions = Object.keys(positionsMapping);

export const placementMapping = Object.entries(positionsMapping).reduce((acc, [k, v]) => { acc[v] = k; return acc; }, {} as Record<string, string>);
