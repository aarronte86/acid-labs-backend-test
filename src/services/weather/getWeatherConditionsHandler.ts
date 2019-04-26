import { WeatherApiSettings } from 'config/config';

import { IHttpClient } from '../_common/httpClient/httpClient';
import { ICommandHandler } from '../_common/servicebus/commandHandler';
import { IGetWeatherConditionsRequest } from './_requests/getWeatherConditionsRequest';
import { IWeatherDTO } from './_outputs/weatherDTO';

interface IDarkSkyForecast {
  timezone: string;
  currently: { summary: string; icon: string; temperature: number };
}

export interface IGetWeatherConditionsHandler
  extends ICommandHandler<IGetWeatherConditionsRequest> {}

export class GetWeatherConditionsHandler implements IGetWeatherConditionsHandler {
  private _httpClient: IHttpClient;
  private _apiConfig: WeatherApiSettings;

  private constructor(httpClient: IHttpClient, config: WeatherApiSettings) {
    this._httpClient = httpClient;
    this._apiConfig = config;
  }

  public static create(
    httpClient: IHttpClient,
    config: WeatherApiSettings
  ): IGetWeatherConditionsHandler {
    return new GetWeatherConditionsHandler(httpClient, config);
  }

  async handle(request: IGetWeatherConditionsRequest): Promise<IWeatherDTO> {
    const { latitude, longitude } = request;

    const url = `forecast/${this._apiConfig.secretKey}/${latitude},${longitude}`;

    const forecast: IDarkSkyForecast = await this._httpClient
      .setBaseUrl(this._apiConfig.baseUrl)
      .setTimeOut(3000)
      .getRequest<IDarkSkyForecast>(url);

    const { summary, temperature, icon } = forecast.currently;

    return {
      summary,
      temperature,
      condition: icon
    };
  }
}
