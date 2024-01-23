import { useResizeObserver } from '@/src/hooks/useResizeObserver';
import { useStore } from '@/src/stores';
import { selectKitConfigType } from '@/src/types/kitType';
import messager from '@/src/utils/messager';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import style from './index.module.less';

const Preview = () => {
  const {
    previewStore: { kitList, renderKitList, initRenderKitList, getKitView },
  } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messager.init(window.parent, window);
    messager.send('chid_ready', 'child_ready');
    messager.on('render_kit', (value = []) => {
      initRenderKitList(value as Array<selectKitConfigType>);
    });
  }, []);

  const getAllKitHeight = () => {
    const list: any = [];
    if (containerRef.current) {
      const { childNodes } = containerRef.current;
      [...childNodes].forEach((child, index) => {
        const { height, left, top } = (
          child as HTMLElement
        ).getBoundingClientRect();
        console.log(child, { height, left, top });
        const position = { height, left, top };
        list.push({ position, ...renderKitList?.[index] });
      });
    }
    return list;
  };

  const height = useResizeObserver(containerRef.current as HTMLElement);
  useEffect(() => {
    if (height > 0) {
      messager.send('render', {
        height,
        kitInfo: getAllKitHeight(),
      });
    }
  }, [height, renderKitList.length]);
  return (
    <div className={style['preview']}>
      <div className={style['container']} ref={containerRef}>
        {renderKitList?.map(({ name, thumburl, state, cnName, uuid }) => {
          if (name === 'drag') {
            return (
              <div className={style['drag-here']} key={uuid}>
                <div className={style['drag-area']}> {cnName}</div>
              </div>
            );
          }
          const Component = getKitView(name);
          if (Component) {
            return (
              <Component
                {...state}
                kitName={name}
                key={uuid}
                thumburl={thumburl}
                preview
              />
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
};

export default observer(Preview);
