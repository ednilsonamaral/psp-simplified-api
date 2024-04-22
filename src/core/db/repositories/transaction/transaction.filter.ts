import { ILike } from 'typeorm';

import { ISearchParameterTransaction } from '@core/models/pagination';

export const getTransactionFilter = (searchParameter: ISearchParameterTransaction) => {
  let where = {};

  if (searchParameter.name) {
    where = { ...where, name: ILike(`%${searchParameter.name}%`) };
  }

  if (searchParameter.amount) {
    where = { ...where, amount: ILike(`%${searchParameter.amount}%`) };
  }

  if (searchParameter.method) {
    where = { ...where, method: ILike(`%${searchParameter.method}%`) };
  }

  if (searchParameter.document) {
    where = { ...where, document: ILike(`%${searchParameter.document}%`) };
  }

  return { where };
};
