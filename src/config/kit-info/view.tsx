import React, { FC } from 'react';

const View: FC<{ thumburl: string; kitName: string; preview: boolean }> = ({
  thumburl,
  kitName,
  preview,
}) => {
  return (
    <div>
      <div>{kitName}</div>
      <div>preview: {String(preview)}</div>
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
