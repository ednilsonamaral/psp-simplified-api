import { DeleteResult, FindManyOptions, UpdateResult } from 'typeorm';

import { PayableEntity } from '@core/db/entities';
import { ISearchParameterPayable, Pagination } from '@core/models/pagination';

export interface IPayableRepository {
  create(transaction: PayableEntity): Promise<PayableEntity>;
  updateById(id: string, transaction: PayableEntity): Promise<UpdateResult>;
  selectById(id: string): Promise<PayableEntity | null>;
  selectPagination(searchParameter: ISearchParameterPayable): Promise<Pagination<PayableEntity>>;
  selectByOptions(options?: FindManyOptions<PayableEntity>): Promise<(PayableEntity | null)[]>;
  selectOneByOptions(options?: FindManyOptions<PayableEntity>): Promise<PayableEntity | null>;
  deleteById(id: string): Promise<DeleteResult>;
}
