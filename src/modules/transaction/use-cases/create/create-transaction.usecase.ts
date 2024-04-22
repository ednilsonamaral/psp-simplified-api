import { TransactionsEntity } from '@core/db/entities';

import { CreateTransactionDTO } from '@modules/transaction/dtos';

export interface ICreateTransactionUseCase {
  execute(dto: CreateTransactionDTO): Promise<TransactionsEntity>;
}
