import { TransactionsEntity } from '@core/db/entities';

export interface IGetTransactionUseCase {
  execute(id: string): Promise<TransactionsEntity>;
}
