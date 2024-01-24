import { fn } from '../types';

export const createUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const isFunction = (v: fn) => {
  return typeof v === 'function';
};

export const isPromise = (v: any) => {
  return (
    isFunction(v) &&
    isFunction(v.resolve) &&
    isFunction(v.reject) &&
    isFunction(v.prototype.then) &&
    isFunction(v.prototype.catch)
  );
};

export const noopfunc = function () {};
