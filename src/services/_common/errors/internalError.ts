import { ApplicationError } from './applicationError';

export class InternalError extends ApplicationError {
  internal: any;

  constructor(error: Error) {
    super('Oops! Something went wrong');

    this.internal = error.stack;
  }
}
