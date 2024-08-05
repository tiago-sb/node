import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1722862324311 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usuarios',
                columns: [
                    {
                        name: 'id_user',
                        type: 'string',
                        isPrimary: true
                    },
                    {
                        name: 'nome',
                        type: 'string',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'string',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'senha',
                        type: 'string',
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios')
    }

}
