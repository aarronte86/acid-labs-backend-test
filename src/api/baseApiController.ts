import { Router } from 'express';

export interface IApiController {
  initializeRoutes(route: Router): void;
}

export abstract class BaseApiController implements IApiController {
  public abstract initializeRoutes(route: Router): void;
}
