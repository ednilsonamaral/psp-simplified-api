import { ISearchParameterTransaction } from '@src/core/models/pagination';

import { TransactionsEntity } from '@core/db/entities';

export interface IGetAllTransactionsUseCase {
  execute(searchParameter: ISearchParameterTransaction): Promise<TransactionsEntity[]>;
}
