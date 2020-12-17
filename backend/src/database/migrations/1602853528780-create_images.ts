import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602853528780 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "images",
        columns: [
          {
            name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'orpanage_id',
            type: 'integer',
          }
        ],
        foreignKeys: [
          {
            name: 'ImageOrphanage',
            columnNames: ['orpanage_id'],
            referencedTableName: 'orpanages',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('images');
    }

}
