import { PayableEntity } from '@core/db/entities';

export interface IGetPayableUseCase {
  execute(id: string): Promise<PayableEntity>;
}
