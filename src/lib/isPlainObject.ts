// tslint:disable: triple-equals
const isObjectObject = (value: any) => value != null && typeof value == 'object' && Object.prototype.toString.call(value) == '[object Object]';

export const isPlainObject = (value: any) => {

  if (!isObjectObject(value)) return false;

  const ctor = value.constructor;
  if (!ctor) return true;

  if (typeof ctor != 'function') return false;

  const ptor = ctor.prototype;
  if (!isObjectObject(ptor)) return false;

  return !!ptor.hasOwnProperty('isPrototypeOf');
};
// tslint:enable: triple-equals
