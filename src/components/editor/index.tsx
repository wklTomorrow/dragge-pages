import React, { useEffect, useRef, useState } from 'react';
import ConfigAttr from './configAttr';
import ListShowCom from './list';
import StageShow from './stage/stage';
import style from './index.module.less';
import { observer } from 'mobx-react-lite';

const Editor = () => {
  return (
    <div className={style['editor-wrap']}>
      <ListShowCom />
      <StageShow />
      <ConfigAttr />
    </div>
  );
};

export default observer(Editor);
