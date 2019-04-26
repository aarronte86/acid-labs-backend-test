import { Router, Request, Response } from 'express';

import { SystemSettings } from 'config/config';
import {
  IGetWeatherConditionsRequest,
  IGetWeatherConditionsHandler,
  GetWeatherConditionsHandler
} from 'services/weather';
import { HttpClient } from 'infrastructure/httpClient/httpClientImplementation';

import { BaseApiController } from '../baseApiController';

export class WeatherOutputApiController extends BaseApiController {
  private _handler: IGetWeatherConditionsHandler;

  private constructor(config: SystemSettings) {
    super();

    // TODO: This should be injected in the constructor in a real world application. I know none IoC container in Node.
    this._handler = GetWeatherConditionsHandler.create(
      HttpClient.create(),
      config.weatherApiSettings
    );
  }

  public static create(config: SystemSettings): WeatherOutputApiController {
    return new WeatherOutputApiController(config);
  }

  public initializeRoutes(route: Router): void {
    const path = '/weather';

    route.get(path, this.getWeatherConditions);
  }

  getWeatherConditions = async (request: Request, response: Response): Promise<void> => {
    const internalRequest: IGetWeatherConditionsRequest = request.query;

    // TODO: I suppose that there should be lot of validation libraries in Node. I know none so I decide to use this pretty basic validation logic.
    const errors = this.validateRequest(internalRequest);

    if (errors.length) {
      response.status(400).send({ errors });
    }

    response.send(await this._handler.handle(internalRequest));
  };

  private validateRequest(request: IGetWeatherConditionsRequest): string[] {
    const erros: string[] = [];

    const { latitude, longitude } = request;

    if (!latitude) {
      erros.push('Latitude is required.');
    }

    if (!longitude) {
      erros.push('Longitude is required.');
    }

    if (Number.isNaN(Number.parseFloat(latitude))) {
      erros.push('Latitude is invalid.');
    }

    if (Number.isNaN(Number.parseFloat(longitude))) {
      erros.push('Longitude is invalid.');
    }

    return erros;
  }
}
