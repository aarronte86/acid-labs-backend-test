export interface IHttpClient {
  setBaseUrl(baseUrl: string): IHttpClient;

  setTimeOut(timeout: number): IHttpClient;

  getRequest<T>(url: string): Promise<T>;
}
