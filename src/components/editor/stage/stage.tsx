import { useStore } from '@/src/stores';
import { selectKitConfigType } from '@/src/types/kitType';
import messager from '@/src/utils/messager';
import { observer } from 'mobx-react-lite';
import React, {
  DragEvent,
  FC,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import style from './index.module.less';
import PreviewFrame from './previewFrame';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { KitOperateEnum } from './type';
import { fn } from '@/src/types';
import { message } from 'antd';

const Stage: FC<{ wrapValidate?: fn }> = ({ wrapValidate }) => {
  const {
    editorStore: {
      listCom,
      selectIns,
      selectCom,
      dragToCube,
      canDrag,
      validate,
      loadingSchema,
      setCanDrag,
      setSelectCom,
      setSelectIns,
      setDeleteCom,
    },
  } = useStore();
  const stageRef = useRef<HTMLDivElement>(null);
  const [initHeight, setInitHeight] = useState<number>(0);
  const [frameHeight, setFrameHeight] = useState<number>(0);
  const [kitInfoList, setKitInfo] = useState<Array<any>>([]);

  useEffect(() => {
    if (stageRef.current) {
      setInitHeight(stageRef.current.offsetHeight);
    }
    messager.on('render', ({ height, kitInfo }: any) => {
      console.log(kitInfo);
      setFrameHeight(height);
      setKitInfo(kitInfo);
    });
  }, []);
  const handleDrogDown = (e: DragEvent<HTMLDivElement>) => {
    const type = e.dataTransfer.getData('config');
    const dragObj = listCom.find(({ name }) => name === type);
    if (dragObj) {
      setSelectCom(dragObj as selectKitConfigType);
      setCanDrag(false);
    }
  };
  const handleSelectKit = validate.fn((uuid: string) => {
    setSelectIns(uuid);
  });
  const handleOperate = (
    type: KitOperateEnum,
    index: number,
    e: MouseEvent<HTMLElement>
  ) => {
    e.stopPropagation();
    if (loadingSchema) {
      message.info('请等待加载schema');
      return;
    }
    if (type === KitOperateEnum.ADD_PRE) {
      validate.fn(() => {
        setSelectCom(dragToCube, index);
        setCanDrag(true);
      })();
    }
    if (type === KitOperateEnum.ADD_NEXT) {
      validate.fn(() => {
        setSelectCom(dragToCube, index + 1);
        setCanDrag(true);
      })();
    }
    if (type === KitOperateEnum.DELETE) {
      setDeleteCom(index);
    }
  };
  return (
    <div className={style['stage']}>
      <div className={style['show-top']}>展示页面</div>
      <div className={style['stage-wrap']}>
        <div
          ref={stageRef}
          className={style['editor-stage']}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={handleDrogDown}
        >
          {!canDrag && (
            <div className={style['editor-display']}>
              <div className={style['display-wrap']}>
                {kitInfoList.map(({ uuid, position = {} }, index) => (
                  <div
                    key={uuid}
                    className={`${style['editor-ins']} ${
                      selectIns.uuid === uuid ? style['select-ins'] : ''
                    }`}
                    style={position}
                    onClick={() => {
                      handleSelectKit(uuid);
                    }}
                  >
                    <div className={style['inner']}>
                      <PlusCircleOutlined
                        className={style['add-pre']}
                        onClick={(e) => {
                          handleOperate(KitOperateEnum.ADD_PRE, index, e);
                        }}
                      />
                      <MinusCircleOutlined
                        className={style['delete']}
                        onClick={(e) => {
                          handleOperate(KitOperateEnum.DELETE, index, e);
                        }}
                      />
                      <PlusCircleOutlined
                        className={style['add-next']}
                        onClick={(e) => {
                          handleOperate(KitOperateEnum.ADD_NEXT, index, e);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <PreviewFrame frameheight={Math.max(initHeight, frameHeight)} />
        </div>
      </div>
    </div>
  );
};

export default observer(Stage);
