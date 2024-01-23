import { useStore } from '@/src/stores';
import messager from '@/src/utils/messager';
import React, { FC, useEffect, useRef } from 'react';
import style from './index.module.less';

const PreviewFrame: FC<{ frameheight: number }> = ({ frameheight }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {
    editorStore: { setFrameReady, sendRenderKitList },
  } = useStore();
  useEffect(() => {
    if (iframeRef.current) {
      messager.init(window, iframeRef.current.contentWindow as Window);
      messager.on('chid_ready', () => {
        setFrameReady(true);
        sendRenderKitList();
      });
    }
  }, []);
  return (
    <iframe
      ref={iframeRef}
      className={style['stage-frame']}
      style={{ height: frameheight }}
      src="https://local.zhenguanyu.com:3000/#/preview"
    />
  );
};

export default PreviewFrame;
