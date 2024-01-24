import { useFixedBottom } from '@/src/hooks/useFixedBottom';
import React, { FC } from 'react';

const View: FC<{
  thumburl: string;
  name: string;
  preview: boolean;
  des: string;
  kitName: string;
}> = ({ thumburl, name, preview, des, kitName }) => {
  const wrapEl = useFixedBottom();
  return (
    <div
      ref={wrapEl}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div>{kitName}</div>
      <div>preview: {String(preview)}</div>
      <div>{des}</div>
      <div>{name}</div>
      <img
        src={thumburl}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export default View;
