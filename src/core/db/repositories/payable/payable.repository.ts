import { injectable } from 'inversify';
import {
  DeleteResult,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';

import { PayableEntity } from '@core/db/entities';
import { getPayableFilter } from '@core/db/repositories/payable/payable.filter';
import { IPayableRepository } from '@core/db/repositories/payable/payable.interface';
import { ISearchParameterPayable, Pagination } from '@core/models/pagination';

import { PersistenceError, PersistenceErrorCodes } from '@shared/errors';

@injectable()
export class PayableRepository implements IPayableRepository {
  private payableRepository: Repository<PayableEntity> = getRepository(PayableEntity);

  async selectPagination (searchParameter: ISearchParameterPayable): Promise<Pagination<PayableEntity>> {
    let response: Pagination<PayableEntity> | null = null;

    const { where } = getPayableFilter(searchParameter);

    try {
      const [ rows, count ] = await this.payableRepository.findAndCount({
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

  async create (payable: PayableEntity): Promise<PayableEntity> {
    let response: PayableEntity | null = null;

    try {
      response = await this.payableRepository.save(payable);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.CREATE_ENTITY, err);
    }

    return response;
  }

  async selectById (id: string): Promise<PayableEntity | null> {
    let response: PayableEntity | null = null;

    try {
      response = await this.payableRepository.findOne({ where: { id } });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async updateById (id: string, payable: PayableEntity): Promise<UpdateResult> {
    let response: UpdateResult | null = null;

    try {
      response = await this.payableRepository.update(id, payable);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.UPDATE_ENTITY, err);
    }

    return response;
  }

  async selectByOptions (options?: FindManyOptions<PayableEntity>): Promise<(PayableEntity | null)[]> {
    let response: PayableEntity[] | null = null;

    try {
      response = await this.payableRepository.find(options);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async selectOneByOptions (options?: FindManyOptions<PayableEntity>): Promise<PayableEntity | null> {
    let response: PayableEntity | null = null;

    try {
      const [ payable ] = await this.payableRepository.find({ ...options, take: 1 });
      response = payable;

    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async deleteById (id: string): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.payableRepository.softDelete({ id });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }
}
