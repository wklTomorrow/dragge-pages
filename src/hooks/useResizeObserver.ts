import { useEffect, useState } from 'react';

export const useResizeObserver = (dom: HTMLElement) => {
  const [update, setUpdate] = useState<number>(0);
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const height = (entry.target as HTMLElement).offsetHeight;
      console.log(height);
      if (update !== height) {
        setUpdate(height);
      }
    }
  });
  useEffect(() => {
    if (dom) {
      resizeObserver.observe(dom);
    }
  }, [dom]);
  return update;
};
