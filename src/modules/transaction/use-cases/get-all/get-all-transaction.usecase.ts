import { inject, injectable } from 'inversify';

import { TransactionsEntity } from '@src/core/db/entities';
import { getTransactionFilter, ITransactionRepository } from '@src/core/db/repositories';
import { serializeEntity } from '@src/core/db/utils';
import { ISearchParameterTransaction } from '@src/core/models/pagination';
import Types from '@src/core/types';
import { IGetAllTransactionsUseCase } from '@src/modules/transaction/use-cases/get-all/get-all-transaction.interface';
import { BusinessError, BusinessErrorCodes } from '@src/shared/errors';

@injectable()
export class GetAllTransactionsUseCase implements IGetAllTransactionsUseCase {
  constructor (
    @inject(Types.TransactionRepository)
    private readonly transactionRepository: ITransactionRepository
  ) { }

  async execute (searchParameter: ISearchParameterTransaction): Promise<TransactionsEntity[]> {
    const { where } = getTransactionFilter(searchParameter);

    try {
      const admins = await this.transactionRepository.selectByOptions({ where });

      return admins.map(transaction => serializeEntity<TransactionsEntity>(TransactionsEntity, transaction));
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
