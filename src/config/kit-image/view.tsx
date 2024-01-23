import React, { FC } from 'react';

const View: FC<{
  kitName: string;
  password: string;
  username: string;
  thumburl: string;
  preview: boolean;
}> = ({ kitName, password, username, thumburl, preview }) => {
  return (
    <div>
      <div>{kitName}</div>
      <div>preview: {String(preview)}</div>
      <div>{password}</div>
      <div>{username}</div>
      {/* 封面图占位 */}
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
