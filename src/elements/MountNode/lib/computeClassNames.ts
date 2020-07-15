
export const computeClassNames = (value: Set<any>) => {

  const arr = Array.from(value, (x: any) => x.props.className).flatMap((x: string) => x.split(/\s+/)).filter(Boolean);

  return Array.from(new Set(Array.from(value, (x: any) => x.props.className).flatMap((x: string) => x.split(/\s+/)).filter(Boolean)));
};
// _.flow(
//   _.toArray,
//   _.map('props.className'),
//   _.flatMap(_.split(/\s+/)),
//   _.filter(_.identity),
//   _.uniq,
// );
