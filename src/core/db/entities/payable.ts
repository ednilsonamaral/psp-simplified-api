import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { PayableStatusType } from '@src/shared/enumerators';

import { TransactionsEntity } from '@core/db/entities';
import BaseEntity from '@core/db/entities/base';

@Entity('payables')
export class PayableEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  public status: PayableStatusType;

  @Column({
    type: 'timestamptz',
    nullable: false,
  })
  public paymentDate: Date;

  @Column({
    type: 'int4',
    nullable: false,
  })
  public amount: number;

  @OneToOne(() => TransactionsEntity)
  @JoinColumn()
  public transaction: TransactionsEntity;

  constructor (props: Partial<PayableEntity>) {
    super();
    Object.assign(this, props);
  }
}
