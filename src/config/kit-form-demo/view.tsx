import React, { FC } from 'react';

const View: FC<{
  thumburl: string;
  name: string;
  preview: boolean;
  des: string;
  kitName: string;
}> = ({ thumburl, name, preview, des, kitName }) => {
  return (
    <div>
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
