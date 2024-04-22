import { ISearchParameterPayable } from '@src/core/models/pagination';

import { PayableEntity } from '@core/db/entities';

export interface IGetAllPayablesUseCase {
  execute(searchParameter: ISearchParameterPayable): Promise<PayableEntity[]>;
}
