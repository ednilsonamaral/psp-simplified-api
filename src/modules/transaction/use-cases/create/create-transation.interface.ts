import { inject, injectable } from 'inversify';

import { TransactionType } from '@src/shared/enumerators';

import { TransactionsEntity } from '@core/db/entities';
import { ITransactionRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';

import { CreateTransactionDTO } from '@modules/transaction/dtos';
import { ICreateTransactionUseCase } from '@modules/transaction/use-cases/create';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor (
    @inject(Types.TransactionRepository)
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute (dto: CreateTransactionDTO): Promise<TransactionsEntity> {
    let transactionBody: TransactionsEntity = {
      amount: dto.amount,
      description: dto.description,
      method: dto.method,
      name: dto.name,
      document: dto.document,
      createdBy: 'SUPER_ADMIN',
      updatedBy: 'SUPER_ADMIN',
    };

    if (dto.method === TransactionType.CREDIT_CARD) {
      const [ month, year ] = dto.expiringDate.split('-');
      const expiringDate = new Date(parseInt(year), parseInt(month) - 1);

      transactionBody = {
        ...transactionBody,
        cardNumber: dto.cardNumber.slice(-4),
        expiringDate,
        cvv: dto.cvv,
      };
    }

    try {
      const transactionCreated = await this.transactionRepository.create(transactionBody);

      return serializeEntity<TransactionsEntity>(TransactionsEntity, transactionCreated);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
