import Axios, { AxiosInstance, AxiosResponse } from 'axios';

import { IHttpClient } from 'services/_common/httpClient';

export class HttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = Axios.create();
  }

  public static create(): IHttpClient {
    return new HttpClient();
  }

  setBaseUrl(baseUrl: string): IHttpClient {
    this.axiosInstance.defaults.baseURL = baseUrl;

    return this;
  }

  setTimeOut(timeout: number): IHttpClient {
    this.axiosInstance.defaults.timeout = timeout;

    return this;
  }

  async getRequest<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url);

    return response.data;
  }
}
