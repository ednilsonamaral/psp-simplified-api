import { PayableStatusType } from '@src/shared/enumerators';

import { ICustomRequest } from '@core/models/custom-request';
import { ISearchParameterPayable } from '@core/models/pagination';

import { controllerPaginationHelper } from '@shared/utils';

export const getPayableFilter = (req: ICustomRequest, pagination = true) => {
  const status = req.query.status?.toString();

  const searchParameter: ISearchParameterPayable = {
    ...(status && { status: status as PayableStatusType }),
    ...controllerPaginationHelper(req.query),
  };

  if (!pagination) {
    delete searchParameter.offset;
    delete searchParameter.limit;
  }

  return { searchParameter };
};