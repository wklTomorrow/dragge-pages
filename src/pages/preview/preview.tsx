import { useStore } from '@/src/stores';
import { selectKitConfigType } from '@/src/types/kitType';
import AsyncLoop from '@/src/utils/asycloop';
import messager from '@/src/utils/messager';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import style from './index.module.less';

const Preview = () => {
  const cacheRenderDataRef = useRef<Record<string, any>>({});
  const cacheKitInfoList = useRef<Array<any>>([]);
  const {
    previewStore: { renderKitList, initRenderKitList, getKitView },
  } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messager.init(window.parent, window);
    messager.send('chid_ready', 'child_ready');
    messager.on('render_kit', (value = []) => {
      initRenderKitList(value as Array<selectKitConfigType>);
      cacheKitInfoList.current = value;
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
        const position = { height, left, top };
        list.push({ position, ...cacheKitInfoList.current?.[index] });
      });
    }
    return list;
  };

  useEffect(() => {
    const loop = new AsyncLoop();
    loop.push(() => {
      if (containerRef.current) {
        const { height } = (
          containerRef.current as HTMLElement
        )?.getBoundingClientRect();
        const renderData = {
          height,
          kitInfo: getAllKitHeight(),
        };
        if (
          JSON.stringify(renderData) !==
          JSON.stringify(cacheRenderDataRef.current)
        ) {
          cacheRenderDataRef.current = renderData;
          messager.send('render', cacheRenderDataRef.current);
        }
      }
    });
    loop.start();
  }, []);
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
