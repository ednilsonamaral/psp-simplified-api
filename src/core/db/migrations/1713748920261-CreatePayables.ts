import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { TypeormHelper } from '@shared/helpers';

export class CreatePayables1713748920261 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    const hasTable = await TypeormHelper.checkHasTable('payables', queryRunner);

    if (hasTable) return;

    await queryRunner.createTable(
      new Table({
        name: 'payables',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'paymentDate',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'transactionId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'createdBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updatedBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'deletedBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        indices: [
          new TableIndex({
            name: 'IDX_PAYABLES',
            columnNames: [
              'id',
            ],
          }),
        ],
        foreignKeys: [
          {
            columnNames: [ 'transactionId' ],
            referencedTableName: 'transactions',
            referencedColumnNames: [ 'id' ],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const hasTable = await TypeormHelper.checkHasTable('payables', queryRunner);

    if (!hasTable) return;

    await TypeormHelper.dropIndex('payables', 'IDX_PAYABLES', queryRunner);
    await queryRunner.dropTable('payables');
  }

}
