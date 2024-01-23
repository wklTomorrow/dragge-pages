import production from './production';
import test from './test';
import { Environment } from './types';

/*
 * 判断是否为 Dev 环境
 * */
export const IsDev = () => {
  return import.meta.env.MODE === Environment.Dev;
};

/*
 * 判断是否为 production 环境，production / stage
 * */
export const isProduction = () => {
  const mode = import.meta.env.MODE;
  return mode === Environment.Production || mode === Environment.Stage;
};

export const environment = isProduction() ? production : test;
