import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  interfaces,
} from 'inversify-express-utils';

import { TransactionsEntity } from '@core/db/entities';
import { ICustomRequest } from '@core/models/custom-request';
import Types from '@core/types';

import { CreateTransactionDTO } from '@modules/transaction/dtos';
import { getTransactionFilter } from '@modules/transaction/helper';
import { ICreateTransactionUseCase, IGetAllTransactionsUseCase, IGetTransactionUseCase } from '@modules/transaction/use-cases';

import { validateDTO } from '@shared/middlewares';

@controller('/transaction')
export class TransactionController extends BaseHttpController implements interfaces.Controller {
  constructor (
    @inject(Types.CreateTransactionUseCase)
      private createTransactionUseCase: ICreateTransactionUseCase,
    @inject(Types.GetTransactionUseCase)
      private getTransactionUseCase: IGetTransactionUseCase,
    @inject(Types.GetAllTransactionsUseCase)
      private getAllTransactionsUseCase: IGetAllTransactionsUseCase
  ) {
    super();
  }

  @httpPost(
    '/',
    validateDTO(CreateTransactionDTO)
  )
  public async create (req: ICustomRequest): Promise<TransactionsEntity> {
    return this.createTransactionUseCase.execute(req.body as CreateTransactionDTO);
  }

  @httpGet('/all')
  public async getAllTransactions (req: ICustomRequest): Promise<TransactionsEntity[]> {
    const { searchParameter } = getTransactionFilter(req, false);
    return this.getAllTransactionsUseCase.execute(searchParameter);
  }

  @httpGet('/:id')
  public async getTransactionById (req: ICustomRequest): Promise<TransactionsEntity> {
    return this.getTransactionUseCase.execute(req.params.id);
  }
}