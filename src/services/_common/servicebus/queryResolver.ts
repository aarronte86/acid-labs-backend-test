import { IQuery } from './query';

export interface IQueryResolver<TQuery extends IQuery<any>, TResult> {
  resolve(query: TQuery): Promise<TResult>;
}
