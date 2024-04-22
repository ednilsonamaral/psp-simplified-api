import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  interfaces,
} from 'inversify-express-utils';

import { PayableEntity } from '@core/db/entities';
import { ICustomRequest } from '@core/models/custom-request';
import Types from '@core/types';

import { getPayableFilter } from '@modules/payable/helper';
import { IGetAllPayablesUseCase, IGetPayableUseCase } from '@modules/payable/use-cases';

@controller('/payable')
export class PayableController extends BaseHttpController implements interfaces.Controller {
  constructor (
    @inject(Types.GetPayableUseCase)
      private getPayableUseCase: IGetPayableUseCase,
    @inject(Types.GetAllPayablesUseCase)
      private getAllPayablesUseCase: IGetAllPayablesUseCase
  ) {
    super();
  }

  @httpGet('/all')
  public async getAllPayables (req: ICustomRequest): Promise<PayableEntity[]> {
    const { searchParameter } = getPayableFilter(req, false);
    return this.getAllPayablesUseCase.execute(searchParameter);
  }

  @httpGet('/:id')
  public async getPayableById (req: ICustomRequest): Promise<PayableEntity> {
    return this.getPayableUseCase.execute(req.params.id);
  }
}