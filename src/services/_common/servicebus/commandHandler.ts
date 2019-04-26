import { ICommand } from './command';

export interface ICommandHandler<TCommand extends ICommand, TResult = any> {
  handle(command: TCommand): Promise<TResult>;
}
