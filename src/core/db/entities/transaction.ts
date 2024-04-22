import { Column, Entity } from 'typeorm';

import { TransactionType } from '@src/shared/enumerators';

import BaseEntity from '@core/db/entities/base';

@Entity('transactions')
export class TransactionsEntity extends BaseEntity {
  @Column({
    type: 'int4',
    nullable: false,
  })
  public amount: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public description: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public method: TransactionType;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public document: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public cardNumber?: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  public expiringDate?: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public cvv?: string;

  constructor (props: Partial<TransactionsEntity>) {
    super();
    Object.assign(this, props);
  }
}
