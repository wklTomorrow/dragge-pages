const handler: {
  [key: string]: any;
} = {
  targetWindow: null,
  originWindow: null,
  origin: '*',
  listener: {},
  initFlag: false,
};
const isMessager = (event: any) => {
  const v = event.data;

  return (
    // isPlainObject(v) &&
    // isString(v.event) &&
    v.tag === 'brick' && !!Object.prototype.hasOwnProperty.call(v, 'data')
  );
};

const addlistener = () => {
  const { originWindow } = handler;
  if (originWindow) {
    (originWindow as Window).addEventListener('message', (event) => {
      const { eventname, tag, data } = event.data;
      if (handler.listener[eventname]) {
        handler.listener[eventname].forEach((cb) => {
          cb(JSON.parse(data));
        });
      }
    });
  }
};

const init = (parentWindow: Window, childWindow: Window, origin = '*') => {
  const { initFlag } = handler;
  if (initFlag) {
    return;
  }
  const curWindow = window;
  if (curWindow === childWindow) {
    Object.assign(handler, {
      origin,
      originWindow: parentWindow,
      targetWindow: childWindow,
    });
  } else if (curWindow === parentWindow) {
    Object.assign(handler, {
      origin,
      originWindow: childWindow,
      targetWindow: parentWindow,
    });
  }
  addlistener();
  handler.initFlag = true;
};

const on = (eventname: string, cb: any) => {
  if (!handler.listener[eventname]) {
    handler.listener[eventname] = [cb];
  } else {
    handler.listener[eventname].push(cb);
  }
};

const send = (eventname: string, data: any) => {
  if (handler.targetWindow) {
    const payload = {
      tag: 'brick',
      eventname: eventname,
      data: JSON.stringify(data),
    };
    (handler.targetWindow as Window).postMessage(payload, handler.origin);
  }
};
export default {
  init,
  on,
  send,
};
