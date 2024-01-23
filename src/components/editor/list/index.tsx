import { useStore } from '@/src/stores';
import { kitConfigType } from '@/src/types/kitType';
import { observer } from 'mobx-react-lite';
import React from 'react';
import style from './index.module.less';

const ListShowCom = () => {
  const {
    editorStore: { listCom, canDrag },
  } = useStore();
  return (
    <div className={style['editor-list']}>
      <div className={style['list-top']}>组件栏</div>
      <div className={style['list']}>
        {!canDrag && <div className={style['list-overlay']}></div>}
        <div className={style['list-com']}>
          {listCom.map(({ name, thumburl, cnName }: kitConfigType, index) => (
            <div
              key={index}
              className={style['list-com-img']}
              onDrag={(e) => {
                e.preventDefault();
              }}
              onDragStart={(e) => {
                e.dataTransfer.setData('config', name);
              }}
            >
              <img src={thumburl} />
              <div className={style['list-com-info']}>{cnName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(ListShowCom);
