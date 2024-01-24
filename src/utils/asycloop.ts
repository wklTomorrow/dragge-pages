import { fn } from '../types';
import { noopfunc, isFunction, isPromise } from './public';

export default class AsyncLoop {
  callbacks: Array<fn> = [];
  pending = true;
  timerFunc: fn | null = null;
  tick = 0;
  constructor() {
    this._setTimer();
  }

  _setTimer() {
    // requestIdleCallback
    if (isFunction(window.requestIdleCallback)) {
      this.timerFunc = () => {
        this._flush();
        this.tick++;
        const next = this.pending ? noopfunc : this.timerFunc;
        window.requestIdleCallback(next as fn);
      };
    }
    // requestAnimationFrame
    else if (isFunction(window.requestAnimationFrame)) {
      this.timerFunc = () => {
        this._flush();
        this.tick++;
        const next = this.pending ? noopfunc : this.timerFunc;
        requestAnimationFrame(next as fn);
      };
    }
    // Promise
    else if (isPromise(window.Promise)) {
      this.timerFunc = () => {
        this._flush();
        this.tick++;
        const next = this.pending ? noopfunc : this.timerFunc;
        Promise.resolve().then(next);
      };
    }
    // setTimeout
    else {
      this.timerFunc = () => {
        this._flush();
        this.tick++;
        const next = this.pending ? noopfunc : this.timerFunc;
        setTimeout(next as fn, 0);
      };
    }
  }

  _flush() {
    for (const cb of this.callbacks) {
      (cb as fn)();
    }
  }

  start() {
    if (this.pending !== false) {
      this.pending = false;
      this.tick = 0;
      (this.timerFunc as fn)();
    }
  }

  stop() {
    this.pending = true;
  }

  push(callback = noopfunc) {
    this.callbacks.push(() => {
      try {
        callback();
      } catch (error) {
        console.warn(error);
      }
    });
  }
}
