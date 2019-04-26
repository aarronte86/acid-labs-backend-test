import { ICommand } from '../../_common/servicebus/command';

export interface IGetWeatherConditionsRequest extends ICommand {
  latitude: string;
  longitude: string;
}
