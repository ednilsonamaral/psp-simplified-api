import { inject, injectable } from 'inversify';

import { getEnv } from '@src/core/constants';
import { PayableStatusType, TransactionType } from '@src/shared/enumerators';

import { PayableEntity, TransactionsEntity } from '@core/db/entities';
import { IPayableRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';

import { ICreatePayableUseCase } from '@modules/payable/use-cases/create';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class CreatePayableUseCase implements ICreatePayableUseCase {
  constructor (
    @inject(Types.PayableRepository)
    private readonly payableRepository: IPayableRepository
  ) {}

  private async generateFinalAmount (fees, amount): Promise<number> {
    const discountPercentageNumber = parseFloat(fees);
    const discount = amount * (discountPercentageNumber / 100);
    const totalAfterDiscount = Math.ceil(amount - discount);

    return totalAfterDiscount;
  }

  async execute (dto: TransactionsEntity): Promise<PayableEntity> {
    const { feesValues } = getEnv();
    const { pixFeesValue, creditCardFeesValue } = feesValues;

    let payableBody: PayableEntity = {
      paymentDate: null,
      amount: 0,
      status: dto.method === TransactionType.CREDIT_CARD ? PayableStatusType.WAITING_FUNDS : PayableStatusType.PAID,
      transaction: dto,
      createdBy: 'SUPER_ADMIN',
      updatedBy: 'SUPER_ADMIN',
    };

    if (dto.method === TransactionType.CREDIT_CARD) {
      const paymentDate = new Date(dto.createdAt.getTime());
      paymentDate.setDate(paymentDate.getDate() + 15);

      payableBody = {
        ...payableBody,
        amount: await this.generateFinalAmount(creditCardFeesValue, dto.amount),
        paymentDate,
      };
    } else if (dto.method === TransactionType.PIX) {
      payableBody = {
        ...payableBody,
        amount: await this.generateFinalAmount(pixFeesValue, dto.amount),
        paymentDate: dto.createdAt,
      };
    }

    try {
      const payableCreated = await this.payableRepository.create(payableBody);

      return serializeEntity<PayableEntity>(PayableEntity, payableCreated);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
