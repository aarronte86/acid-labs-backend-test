import { ApplicationError } from './applicationError';

export class NotFoundError extends ApplicationError {
  constructor(resource: string) {
    super(`Resource ${resource} was not found.`);
  }
}
