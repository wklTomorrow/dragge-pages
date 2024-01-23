import { useEffect, useRef } from 'react';

export const useFixedBottom = () => {
  const dom = useRef<HTMLElement>(null);
  useEffect(() => {
    const curDom = dom.current;
    if (curDom) {
      const { height } = curDom.getBoundingClientRect();
      (curDom.parentNode as HTMLElement).style[
        'padding-bottom'
      ] = `${height}px`;
    }
  }, [dom.current]);
  return dom;
};
