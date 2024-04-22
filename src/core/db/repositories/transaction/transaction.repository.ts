import { injectable } from 'inversify';
import {
  DeleteResult,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';

import { TransactionsEntity } from '@core/db/entities';
import { getTransactionFilter } from '@core/db/repositories/transaction/transaction.filter';
import { ITransactionRepository } from '@core/db/repositories/transaction/transaction.interface';
import { ISearchParameterTransaction, Pagination } from '@core/models/pagination';

import { PersistenceError, PersistenceErrorCodes } from '@shared/errors';

@injectable()
export class TransactionRepository implements ITransactionRepository {
  private transactionRepository: Repository<TransactionsEntity> = getRepository(TransactionsEntity);

  async selectPagination (searchParameter: ISearchParameterTransaction): Promise<Pagination<TransactionsEntity>> {
    let response: Pagination<TransactionsEntity> | null = null;

    const { where } = getTransactionFilter(searchParameter);

    try {
      const [ rows, count ] = await this.transactionRepository.findAndCount({
        where,
        skip: searchParameter.offset || 0,
        take: searchParameter.limit || 10,
        order: {
          [searchParameter.orderBy]: searchParameter.isDESC ? 'DESC' : 'ASC',
        },
      });

      response = {
        rows,
        count,
      };
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.PAGINATION_ENTITY, err);
    }

    return response;
  }

  async create (transaction: TransactionsEntity): Promise<TransactionsEntity> {
    let response: TransactionsEntity | null = null;

    try {
      response = await this.transactionRepository.save(transaction);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.CREATE_ENTITY, err);
    }

    return response;
  }

  async selectById (id: string): Promise<TransactionsEntity | null> {
    let response: TransactionsEntity | null = null;

    try {
      response = await this.transactionRepository.findOne({ where: { id } });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async updateById (id: string, transaction: TransactionsEntity): Promise<UpdateResult> {
    let response: UpdateResult | null = null;

    try {
      response = await this.transactionRepository.update(id, transaction);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.UPDATE_ENTITY, err);
    }

    return response;
  }

  async selectByOptions (options?: FindManyOptions<TransactionsEntity>): Promise<(TransactionsEntity | null)[]> {
    let response: TransactionsEntity[] | null = null;

    try {
      response = await this.transactionRepository.find(options);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async selectOneByOptions (options?: FindManyOptions<TransactionsEntity>): Promise<TransactionsEntity | null> {
    let response: TransactionsEntity | null = null;

    try {
      const [ transaction ] = await this.transactionRepository.find({ ...options, take: 1 });
      response = transaction;

    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async deleteById (id: string): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.transactionRepository.softDelete({ id });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }
}
