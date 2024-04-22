import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { TypeormHelper } from '@shared/helpers';

export class CreateTransations1713744395771 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    const hasTable = await TypeormHelper.checkHasTable('transactions', queryRunner);

    if (hasTable) return;

    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'amount',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'method',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'document',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cardNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'expiringDate',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'cvv',
            type: 'varchar',
            isNullable: true,
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
            name: 'IDX_TRANSATIONS',
            columnNames: [
              'id',
            ],
          }),
        ],
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const hasTable = await TypeormHelper.checkHasTable('transactions', queryRunner);

    if (!hasTable) return;

    await TypeormHelper.dropIndex('transactions', 'IDX_TRANSATIONS', queryRunner);
    await queryRunner.dropTable('transactions');
  }

}
