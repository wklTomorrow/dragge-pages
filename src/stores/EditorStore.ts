import { makeAutoObservable, runInAction } from 'mobx';
import kitBackend from '@src/config/backend';
import { kitConfigType, selectKitConfigType } from '../types/kitType';
import messager from '../utils/messager';
import { createUUID } from '../utils/public';
import { fn } from '../types';
import designerService from '@src/service/designerService';
import { message } from 'antd';

const configList = Object.values(kitBackend.config);
const initValue: any = [
  // { name: 'kit-form-demo', state: { name: '5' } },
  // { name: 'kit-image', state: { password: '2', username: '3' } },
  // { name: 'kit-info' },
  // { name: 'kit-info' },
  // { name: 'kit-info' },
  // { name: 'kit-type' },
];

export class EditorStore {
  frameReady = false;
  public canDrag = true;
  public loadingSchema = false;
  public listCom: Array<kitConfigType> = [...configList];
  public selectCom: Array<selectKitConfigType> = [];
  public selectIns: Partial<selectKitConfigType> = {};
  public selectInsForm: any = null;
  public dragToCube: selectKitConfigType = {
    name: 'drag',
    cnName: 'drag here',
    thumburl: '',
    uuid: '',
  };
  public schemaConfig: Record<string, any> = {};
  public validate = {
    fn: (fn: fn) => {
      return (...args: any) => {
        fn(...args);
        return Promise.resolve();
      };
    },
  };
  public constructor() {
    // mobx6的不同，函数式，而不再通过使用装饰器
    makeAutoObservable(this);
  }
  public setCanDrag = (canDrag: boolean) => {
    this.canDrag = canDrag;
  };
  public init = () => {
    if (initValue.length > 0) {
      this.selectCom = [
        ...initValue?.map(({ name, state }: any) => ({
          ...kitBackend.config[name],
          name,
          state,
          uuid: createUUID(),
        })),
      ];
      this.setSelectIns(this.selectCom[0].uuid);
      this.setCanDrag(false);
    } else {
      this.setSelectCom(this.dragToCube);
    }
  };
  public setFrameReady = (type: boolean) => {
    this.frameReady = type;
  };
  public setSelectCom = (kit: selectKitConfigType, index = -1) => {
    if (index > -1) {
      // 添加dragarea
      this.selectCom = [
        ...this.selectCom.slice(0, index),
        { ...kit, uuid: createUUID() },
        ...this.selectCom.slice(index),
      ];
    } else {
      const insertIndex = this.selectCom.findIndex(
        ({ name }) => name === 'drag'
      );
      const uuid = createUUID();
      this.selectCom = [
        ...this.selectCom.slice(0, insertIndex),
        { ...kit, uuid },
        ...this.selectCom.slice(insertIndex + 1),
      ];
      this.setSelectIns(uuid);
    }
    this.sendRenderKitList();
  };
  public setMoveSelectCom = (index: number) => {
    this.selectCom = [
      ...this.selectCom.slice(0, index),
      {
        ...this.selectCom[index + 1],
      },
      {
        ...this.selectCom[index],
      },
      ...this.selectCom.slice(index + 2),
    ];
    this.sendRenderKitList();
  };
  public setDeleteCom = (index: number) => {
    this.selectCom = [
      ...this.selectCom.slice(0, index),
      ...this.selectCom.slice(index + 1),
    ];
    if (this.selectCom.length === 0) {
      this.selectCom = [this.dragToCube];
      this.setCanDrag(true);
    }
    this.setSelectIns(this.selectCom[0].uuid);
    this.sendRenderKitList();
  };
  public setSelectIns = async (uuid: string) => {
    const kit = this.selectCom.find((com) => com.uuid === uuid);
    if (kit) {
      const kitName = kit.name;
      this.selectIns = kit;
      if (
        kitBackend.config[kitName]?.useSchema &&
        !this.schemaConfig[kitName]
      ) {
        await this.loadSchema(kitName);
      }
      this.selectInsForm = kitBackend.configForm[kitName];
    } else {
      this.selectIns = {};
      this.selectInsForm = null;
    }
  };
  public updateSelectInsState = (state: Record<string, any>) => {
    this.selectIns = {
      ...this.selectIns,
      state: {
        ...(this.selectIns?.state || {}),
        ...state,
      },
    };
    const curSelectIndex = this.selectCom.findIndex(
      ({ uuid }) => uuid === this.selectIns.uuid
    );
    if (curSelectIndex > -1) {
      this.selectCom = [
        ...this.selectCom.slice(0, curSelectIndex),
        this.selectIns as selectKitConfigType,
        ...this.selectCom.slice(curSelectIndex + 1),
      ];
    }
    this.sendRenderKitList();
  };
  public sendRenderKitList = () => {
    messager.send('render_kit', this.selectCom);
  };
  public setValidateFn = (fn: (...args: any) => any) => {
    this.validate = {
      fn,
    };
  };
  public getSelectComConfig = () => {
    if (this.loadingSchema) {
      message.error('请先等待组件的 schema 配置加载完成');
      return Promise.reject();
    }
    const value = this.validate.fn(() =>
      this.selectCom.map(({ name, state }) => ({ name, state }))
    );
    return value();
  };
  public setLoadingSchema = (loadingSchema: boolean) => {
    this.loadingSchema = loadingSchema;
  };
  public loadSchema = async (type: string) => {
    this.setLoadingSchema(true);
    return designerService
      .getDesignerSchemaByType(type)
      .then((res) => {
        runInAction(() => {
          this.schemaConfig = {
            ...this.schemaConfig,
            [type]: res,
          };
        });
      })
      .finally(() => {
        runInAction(() => {
          this.setLoadingSchema(false);
        });
      });
  };
  public get selectInsSchema() {
    return this.schemaConfig[this.selectIns?.name as string] || '';
  }
}
