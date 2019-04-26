import { SystemSettings } from 'config/config';

const environmentSettings = process.env;

// Ensure required ENV vars are set
const requiredEnv = ['PORT'];
const unsetEnv = requiredEnv.filter(variable => !(typeof process.env[variable] !== 'undefined'));

if (unsetEnv.length > 0) {
  throw new Error('Required ENV variables are not set: [' + unsetEnv.join(', ') + ']');
}

export const AppConfig: SystemSettings = {
  port: environmentSettings.PORT,
  appUrl: environmentSettings.APP_URL,
  frontendUrl: environmentSettings.FRONT_URL
};
