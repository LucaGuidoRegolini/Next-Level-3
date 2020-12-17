import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602809478071 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Realizar alterações no banco de dados
    await queryRunner.createTable(new Table({
      name: 'orpanages',
      columns:[
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'instructions',
          type: 'text',
        },
        {
          name: 'opening_hours',
          type: 'varchar',
        },
        {
          name: 'open_on_wekends',
          type: 'boolean',
          default: false
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //Desfaz oque foi feito no up
    await queryRunner.dropTable('orpanages')
  }

}
