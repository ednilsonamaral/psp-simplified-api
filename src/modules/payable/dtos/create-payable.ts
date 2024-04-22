import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

import { PayableStatusType } from '@shared/enumerators';

export class CreatePayableDTO {
  @IsString()
  public status: PayableStatusType;

  @IsNumber()
  public amount: number;

  @IsDate()
  public paymentDate: Date;

  @IsUUID()
  public transactionId: string;
}
