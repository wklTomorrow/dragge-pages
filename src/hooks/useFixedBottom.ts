import { useEffect, useRef, useState } from 'react';
import { useResizeObserver } from './useResizeObserver';

export const useFixedBottom = () => {
  const refs = useRef<any>(null);
  const wrapEl = useRef<HTMLDivElement>(null);
  const height = useResizeObserver(wrapEl.current as HTMLElement);
  const [, _mounted] = useState<number>(0);
  useEffect(() => {
    const curDom = wrapEl.current;
    if (curDom) {
      const { height } = curDom.getBoundingClientRect();
      (curDom.parentNode as HTMLElement).setAttribute(
        'style',
        `padding-bottom: ${height}px;`
      );
      refs.current = curDom.parentNode as HTMLElement;
      _mounted((old) => old + 1);
    }

    return () => {
      if (refs.current) {
        (refs.current as HTMLElement).setAttribute(
          'style',
          'padding-bottom: 0px;'
        );
      }
    };
  }, []);
  useEffect(() => {
    if (height && refs.current) {
      (refs.current as HTMLElement).setAttribute(
        'style',
        `padding-bottom: ${height}px;`
      );
    }
  }, [height, refs.current]);
  return wrapEl;
};
