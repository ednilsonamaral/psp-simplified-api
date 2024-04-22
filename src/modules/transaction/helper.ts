import { ICustomRequest } from '@core/models/custom-request';
import { ISearchParameterTransaction } from '@core/models/pagination';

import { controllerPaginationHelper } from '@shared/utils';

export const getTransactionFilter = (req: ICustomRequest, pagination = true) => {
  const searchParameter: ISearchParameterTransaction = {
    ...(req.query &&
      req.query.name && {
      name: req.query.name.toString(),
    }),
    ...(req.query &&
      req.query.document && {
      document: req.query.document.toString(),
    }),
    ...controllerPaginationHelper(req.query),
  };

  if (!pagination) {
    delete searchParameter.offset;
    delete searchParameter.limit;
  }

  return { searchParameter };
};