import { PayableEntity, TransactionsEntity } from '@core/db/entities';

export interface ICreatePayableUseCase {
  execute(dto: TransactionsEntity): Promise<PayableEntity>;
}