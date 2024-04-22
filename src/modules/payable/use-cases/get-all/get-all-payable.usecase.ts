import { inject, injectable } from 'inversify';

import { PayableEntity } from '@src/core/db/entities';
import { getPayableFilter, IPayableRepository } from '@src/core/db/repositories';
import { serializeEntity } from '@src/core/db/utils';
import { ISearchParameterPayable } from '@src/core/models/pagination';
import Types from '@src/core/types';
import { IGetAllPayablesUseCase } from '@src/modules/payable/use-cases/get-all/get-all-payable.interface';
import { BusinessError, BusinessErrorCodes } from '@src/shared/errors';

@injectable()
export class GetAllPayablesUseCase implements IGetAllPayablesUseCase {
  constructor (
    @inject(Types.PayableRepository)
    private readonly transactionRepository: IPayableRepository
  ) { }

  async execute (searchParameter: ISearchParameterPayable): Promise<PayableEntity[]> {
    const { where } = getPayableFilter(searchParameter);

    try {
      const payables = await this.transactionRepository.selectByOptions({ where });

      return payables.map(payable => serializeEntity<PayableEntity>(PayableEntity, payable));
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
