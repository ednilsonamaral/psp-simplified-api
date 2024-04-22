import { inject, injectable } from 'inversify';

import { TransactionsEntity } from '@src/core/db/entities';
import { ITransactionRepository } from '@src/core/db/repositories';
import { serializeEntity } from '@src/core/db/utils';
import Types from '@src/core/types';
import { IGetTransactionUseCase } from '@src/modules/transaction/use-cases/get/get-transaction.interface';
import { BusinessError, BusinessErrorCodes } from '@src/shared/errors';

@injectable()
export class GetTransactionUseCase implements IGetTransactionUseCase {
  constructor (
    @inject(Types.TransactionRepository)
    private readonly transactionRepository: ITransactionRepository
  ) { }

  async execute (id: string): Promise<TransactionsEntity> {
    try {
      const transaction = await this.transactionRepository.selectById(id);

      if (!transaction) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

      return serializeEntity<TransactionsEntity>(TransactionsEntity, transaction);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
