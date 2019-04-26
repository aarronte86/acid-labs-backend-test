import * as express from 'express';
import { json } from 'body-parser';
import * as cors from 'cors';

import { SystemSettings } from 'config/config';

export class App {
  private readonly _app: express.Application;
  private readonly _config: SystemSettings;

  constructor(config: SystemSettings) {
    this._config = config;
    this._app = express();

    this.config();
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

    this._app.get('/', function(req, res) {
      res.send('Hello World!');
    });
  }

  public run(): void {
    const port = this._config.port;

    this._app.listen(port, () => {
      console.info(`Express server listening on port ${port}`);
    });
  }
}
