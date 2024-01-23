import { makeAutoObservable } from 'mobx';
import { selectKitConfigType } from '../types/kitType';
import kitClient from '@src/config/client';

const configList = kitClient.configViewForm;

export class PreviewStore {
  public kitList: any = [];
  public renderKitList: Array<selectKitConfigType> = [];
  public constructor() {
    // mobx6的不同，函数式，而不再通过使用装饰器
    makeAutoObservable(this);
  }
  addKit = (kit: any) => {
    this.kitList = [...this.kitList, kit];
  };
  initRenderKitList = (kit: Array<selectKitConfigType>) => {
    this.renderKitList = [...kit];
  };
  public getKitView = (type: string) => {
    return configList[type] || null;
  };
}
