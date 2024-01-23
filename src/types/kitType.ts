export type kitConfigType = {
  name: string;
  cnName: string;
  thumburl: string;
  useSchema?: boolean;
};

export type selectKitConfigType = {
  uuid: string;
  state?: Record<string, any>;
} & kitConfigType;
