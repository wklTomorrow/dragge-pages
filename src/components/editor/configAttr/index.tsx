import { useStore } from '@/src/stores';
import { FormInstance, message, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';

import style from './index.module.less';

const ConfigAttr = () => {
  const formRef = useRef({
    validateFields: () => {
      return Promise.resolve();
    },
  });
  const {
    editorStore: {
      selectInsForm: SelectForm,
      selectIns,
      canDrag,
      selectInsSchema,
      loadingSchema,
      loadSchema,
      updateSelectInsState,
      setValidateFn,
    },
  } = useStore();
  const handleChange = (val: Record<string, any>) => {
    updateSelectInsState(val);
  };
  useEffect(() => {
    setValidateFn((fn) => {
      return (...args: any) => {
        if (formRef.current) {
          return formRef.current
            .validateFields()
            .then(() => {
              return fn(...args);
            })
            .catch(() => {
              message.error('请先确保当前组件的配置项都正确');
            });
        }
        return Promise.resolve();
      };
    });
  }, [formRef.current]);

  return (
    <div className={style['editor-config']}>
      <div className={style['config-top']}>编辑栏</div>
      <div className={style['config-form']}>
        {canDrag && SelectForm && (
          <div className={style['config-overlay']}></div>
        )}
        <Spin spinning={loadingSchema}>
          {SelectForm && (
            <SelectForm
              handleChange={handleChange}
              handleSync={loadSchema}
              kitType={selectIns.name}
              initValue={selectIns.state}
              ref={formRef}
              schema={selectInsSchema}
            />
          )}
        </Spin>
      </div>
    </div>
  );
};

export default observer(ConfigAttr);
