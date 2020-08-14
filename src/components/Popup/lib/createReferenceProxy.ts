import React, { createRef } from 'react';
import { isRefObject } from '../../Ref';

class ReferenceProxy {

  ref: React.RefObject<HTMLElement>;

  constructor(refObject: React.RefObject<HTMLElement> | HTMLElement) {

    if (isRefObject(refObject)) {
      this.ref = refObject;
    } else {
      this.ref = createRef<HTMLElement>();
      (this.ref as any).current = refObject;
    }
  }

  getBoundingClientRect() {
    const c = this.ref.current;

    return c?.getBoundingClientRect() ?? {} as any;
  }

  get clientWidth() {
    return this.getBoundingClientRect().width;
  }

  get clientHeight() {
    return this.getBoundingClientRect().height;
  }

  get parentNode() {
    return this.ref.current ? this.ref.current.parentNode : undefined;
  }
}

const assign = Object.assign;

const vrgs = (f: any) => {

  // tslint:disable-next-line: one-variable-per-declaration
  const s = f + "", i = s.indexOf("...");                                   // tslint:disable-line: prefer-template
  return i >= 0 && (i < s.indexOf(")") || s.indexOf("arguments") >= 0);
};

const nanomemoize = (fn: any, o: any = {}) => {
  /*o = {
    serializer, // used to serialize arguments of single argument functions, multis are not serialized
    equals, // equality tester, will force use of slower multiarg approach even for single arg functions
    maxAge, // max cache age is ms, set > 0 && < Infinity if you want automatic clearing
    maxArgs, // max args to use for signature
    vargs = vrgs(fn) // set to true if function may have variable or beyond-signature arguments, default is best attempt at infering
    } = {}
  */

  // tslint:disable: one-variable-per-declaration
  const vargs = o.vargs || vrgs(fn);
  let s = Object.create(null); // single arg function key/value cache
  let k: any[] = []; // multiple arg function arg key cache
  let v: any[] = []; // multiple arg function result cache
  let wm = new WeakMap();

  const d = function (key: any, c: any, k?: any) {

    return setTimeout(() => {

      if (k) { // dealing with multi-arg function, c and k are Arrays
        c.splice(key, 1);
        k.splice(key, 1);
        return;
      } // dealing with single arg function, c is a WekMap or Object

      c instanceof WeakMap ? c.delete(key) : delete c[key];
    }, o.maxAge);

  };

  const c = o.maxAge > 0 && o.maxAge < Infinity ? d : 0; // cache change timeout,
  const eq = o.equals ? o.equals : (a: any, b: any) => a === b;
  const maxargs = o.maxArgs;
  const srlz = o.serializer;
  let f: any; // memoized function to return
  let u: any; // flag indicating a unary arg function is in use for clear operation

  if (fn.length === 1 && !o.equals && !vargs) {

    // for single argument functions, just use a JS object key look-up
    f = (a: any) => {
      // strings must be serialized because cache[1] should not equal or overwrite cache["1"] for value = 1 and value = "1"
      const t = typeof a;
      // set chng timeout only when new value computed, hits will not push out the tte, but it is arguable they should not
      if (!srlz && ((t === "object" && a) || t === "function")) {
        let r;
        return wm.get(a) || ((!c || c(a, wm)), wm.set(a, r = fn(a)), r);
      }

      const key = t === "number" || t === "boolean" || a == null ? a : t === "string" ? JSON.stringify(a) : srlz(a);
      return s[key] || ((!c || c(key, s)), s[key] = fn.call(a));
    };

    u = 1;

  } else {

    // for multiple arg functions, loop through a cache of all the args
    // looking at each arg separately so a test can abort as soon as possible
    f = (...args: any[]) => {

      const l = maxargs || args.length;
      let i;

      for (i = k.length - 1; i >= 0; i--) { // an array of arrays of args, each array represents a call signature
        if (!maxargs && k[i].length !== l) continue; // cache miss if called with a different number of args
        for (let j = l - 1; j >= 0 && eq(k[i][j], args[j]); j--) {	// compare each arg
          if (j === 0) { return v[i]; } // the args matched
        }
      }
      i = k.length - (i + 1);
      // set change timeout only when new value computed, hits will not push out the tte, but it is arguable they should not
      return (!c || c(i, v, k)), v[i] = fn(...(k[i] || args));
    };
  }

  // reset all the caches
  f.clear = function () {
    wm = new WeakMap();
    s = Object.create(null);
    k = [];
    v = [];
  };
  f.keys = function () { return u ? null : k.slice(); };
  f.values = function () { return u ? null : v.slice(); };
  f.keyValues = function () { return u ? { primitives: assign({}, s), objects: wm } : null; };
  return f;
};

/**
 * Popper.js does not support ref objects from `createRef()` as referenceElement. If we will pass
 * directly `ref`, `ref.current` will be `null` at the render process. We use memoize to keep the
 * same reference between renders.
 *
 * @see https://popper.js.org/popper-documentation.html#referenceObject
 */
export const createReferenceProxy = nanomemoize((reference: any) => new ReferenceProxy(reference));
