// import { stringify } from 'qs';
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosResponseHeaders,
} from 'axios';
import { Environment } from '@/src/environment/types';
import { environment } from '@/src/environment';

type Parmas = Record<string | number, unknown>;

/*
 * 基于 Axios 封装的 httpClient
 * 附带 get / post / put / delete 方法
 * */
class HttpClient {
  public axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.generateBaseUrl(),
      withCredentials: true,
      timeout: 10000,
      // paramsSerializer: (params) =>
      //   stringify(params, { arrayFormat: 'repeat' }),
    });
  }

  public get<T>(
    url: string,
    params?: Parmas,
    headers?: AxiosResponseHeaders
  ): Promise<T> {
    return this.axiosInstance
      .get(url, { params, headers })
      .then(({ data }) => data);
  }

  public post<T>(
    url: string,
    data?: unknown,
    params?: Parmas,
    headers?: AxiosResponseHeaders
  ): Promise<T> {
    return this.axiosInstance
      .post(url, data, { params, headers })
      .then(({ data }) => data);
  }

  public postReturnData<T>(
    url: string,
    data?: unknown,
    params?: Parmas,
    headers?: AxiosResponseHeaders
  ): Promise<AxiosResponse<any, any>> {
    return this.axiosInstance
      .post(url, data, { params, headers })
      .then((res: AxiosResponse<any, any>) => res);
  }

  public put<T>(
    url: string,
    data?: unknown,
    params?: Parmas,
    headers?: AxiosResponseHeaders
  ): Promise<T> {
    return this.axiosInstance
      .put(url, data, { params, headers })
      .then(({ data }) => data);
  }

  public delete<T>(
    url: string,
    params?: Parmas,
    headers?: AxiosResponseHeaders
  ): Promise<T> {
    return this.axiosInstance
      .delete(url, { params, headers })
      .then(({ data }) => data);
  }

  private generateBaseUrl(): string {
    const mode = import.meta.env.MODE;
    return mode === Environment.Dev ? '' : environment.apiUrl;
  }
}

export const httpClient = new HttpClient();
