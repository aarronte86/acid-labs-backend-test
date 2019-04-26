import * as express from 'express';
import { json } from 'body-parser';
import * as cors from 'cors';
import { ExpressRedisCache } from 'express-redis-cache';

import { SystemSettings } from 'config/config';
import { IApiController } from './api/baseApiController';
import { WeatherOutputApiController } from './api';

export class App {
  private readonly _app: express.Application;
  private readonly _router: express.Router;
  private readonly _cache: ExpressRedisCache;
  private readonly _config: SystemSettings;

  constructor(config: SystemSettings) {
    this._config = config;
    this._app = express();
    this._router = express.Router();

    this._cache = new ExpressRedisCache({
      host: config.redisSettings.host,
      port: config.redisSettings.port,
      auth_pass: config.redisSettings.authPass
    });

    this.config();
    this.initializeControllers();
  }

  private config(): void {
    // enable cors
    const options: cors.CorsOptions = {
      origin: this._config.frontendUrl,
      methods: 'OPTIONS,POST,GET'
    };

    this._app.use(cors(options));
    this._app.options('*', cors(options));

    // support application/json type post data
    this._app.use(json());
  }

  private initializeControllers(): void {
    const controllers: IApiController[] = [WeatherOutputApiController.create(this._config)];

    controllers.forEach(controller => {
      controller.initializeRoutes(this._router);
    });

    this._app.use('/api', this._cache.route(), this._router);
  }

  public run(): void {
    const port = this._config.port;

    this._app.listen(port, () => {
      console.info(`Express server listening on port ${port}`);
    });
  }
}
