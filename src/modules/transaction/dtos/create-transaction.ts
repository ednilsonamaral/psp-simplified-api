import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

import { TransactionType } from '@shared/enumerators';
import { IsDocument } from '@shared/validations/class-validator/IsDocument';

export class CreateTransactionDTO {
  @IsNumber()
  public amount: number;

  @IsString()
  public description: string;

  @IsString()
  public method: TransactionType;

  @IsString()
  public name: string;

  @IsString()
  @IsDocument()
  public document: string;

  @IsString()
  @ValidateIf((object) => object.method === TransactionType.CREDIT_CARD)
  public cardNumber?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((object) => object.method === TransactionType.CREDIT_CARD)
  public expiringDate?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((object) => object.method === TransactionType.CREDIT_CARD)
  public cvv?: string;
}
