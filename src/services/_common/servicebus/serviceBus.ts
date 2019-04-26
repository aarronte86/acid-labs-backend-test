import { ICommand } from './command';

export interface IServiceBus {
  handleCommand<TCommand extends ICommand>(
    command: TCommand,
    handlerIdentifier: Symbol
  ): Promise<void>;

  handleCommandWithResult<TCommand extends ICommand, TResult>(
    command: TCommand,
    handlerIdentifier: Symbol
  ): Promise<TResult>;
}
