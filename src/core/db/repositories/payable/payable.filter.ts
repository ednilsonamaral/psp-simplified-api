import { ILike } from 'typeorm';

import { ISearchParameterPayable } from '@core/models/pagination';

export const getPayableFilter = (searchParameter: ISearchParameterPayable) => {
  let where = {};

  if (searchParameter.status) {
    where = { ...where, status: ILike(`%${searchParameter.status}%`) };
  }

  return { where };
};
