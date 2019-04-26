import 'app-module-path/register';

import { App } from './app';
import { AppConfig } from './app.config';

const app = new App(AppConfig);

app.run();
