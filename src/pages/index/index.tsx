import React, { useEffect } from 'react';
import './index.less';
import Editor from '@/src/components/editor';
import { Button } from 'antd';
import { useStore } from '@/src/stores';
import { observer } from 'mobx-react-lite';

const Index = () => {
  const {
    editorStore: { getSelectComConfig, init },
  } = useStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="editor">
      <Editor />
      <div className="editor-footer">
        <Button
          onClick={() => {
            getSelectComConfig().then((res) => {
              console.log(res);
            });
          }}
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default observer(Index);
