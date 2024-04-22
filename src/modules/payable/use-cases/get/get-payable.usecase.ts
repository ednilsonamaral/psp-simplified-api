import { inject, injectable } from 'inversify';

import { PayableEntity } from '@src/core/db/entities';
import { IPayableRepository } from '@src/core/db/repositories';
import { serializeEntity } from '@src/core/db/utils';
import Types from '@src/core/types';
import { IGetPayableUseCase } from '@src/modules/payable/use-cases/get/get-payable.interface';
import { BusinessError, BusinessErrorCodes } from '@src/shared/errors';

@injectable()
export class GetPayableUseCase implements IGetPayableUseCase {
  constructor (
    @inject(Types.PayableRepository)
    private readonly payableRepository: IPayableRepository
  ) { }

  async execute (id: string): Promise<PayableEntity> {
    try {
      const payable = await this.payableRepository.selectById(id);

      if (!payable) throw new BusinessError(BusinessErrorCodes.PAYABLE_NOT_FOUND);

      return serializeEntity<PayableEntity>(PayableEntity, payable);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
