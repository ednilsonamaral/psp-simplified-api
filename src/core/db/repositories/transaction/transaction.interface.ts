import { DeleteResult, FindManyOptions, UpdateResult } from 'typeorm';

import { TransactionsEntity } from '@core/db/entities';
import { ISearchParameterTransaction, Pagination } from '@core/models/pagination';

export interface ITransactionRepository {
  create(transaction: TransactionsEntity): Promise<TransactionsEntity>;
  updateById(id: string, transaction: TransactionsEntity): Promise<UpdateResult>;
  selectById(id: string): Promise<TransactionsEntity | null>;
  selectPagination(searchParameter: ISearchParameterTransaction): Promise<Pagination<TransactionsEntity>>;
  selectByOptions(options?: FindManyOptions<TransactionsEntity>): Promise<(TransactionsEntity | null)[]>;
  selectOneByOptions(options?: FindManyOptions<TransactionsEntity>): Promise<TransactionsEntity | null>;
  deleteById(id: string): Promise<DeleteResult>;
}
