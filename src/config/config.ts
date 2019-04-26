export interface RedisSettings {
  host: string;
  port: string;
  authPass: string;
}

export interface WeatherApiSettings {
  baseUrl: string;
  secretKey: string;
}

export interface SystemSettings {
  // Port the server will be listening on
  port: string;

  appUrl: string;

  frontendUrl: string;

  // Weather 3rd party service config
  weatherApiSettings: WeatherApiSettings;

  redisSettings: RedisSettings;
}
