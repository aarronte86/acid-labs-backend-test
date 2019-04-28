import { SystemSettings } from 'config/config';

const environmentSettings = process.env;

// Ensure required ENV vars are set
const requiredEnv = ['PORT', 'DARKSKY_BASE_URL', 'DARKSKY_SECRET_KEY', 'REDIS_HOST', 'REDIS_PORT'];
const unsetEnv = requiredEnv.filter(variable => !(typeof process.env[variable] !== 'undefined'));

if (unsetEnv.length > 0) {
  throw new Error('Required ENV variables are not set: [' + unsetEnv.join(', ') + ']');
}

export const AppConfig: SystemSettings = {
  port: environmentSettings.PORT,
  appUrl: environmentSettings.APP_URL,
  frontendUrl: environmentSettings.FRONTEND_URL,

  weatherApiSettings: {
    baseUrl: environmentSettings.DARKSKY_BASE_URL,
    secretKey: environmentSettings.DARKSKY_SECRET_KEY
  },

  redisSettings: {
    host: environmentSettings.REDIS_HOST,
    port: environmentSettings.REDIS_PORT,
    authPass: environmentSettings.REDIS_AUTH_PASS
  }
};
