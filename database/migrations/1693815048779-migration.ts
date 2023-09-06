import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1693815048779 implements MigrationInterface {
    name = 'Migration1693815048779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "Contact_no"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "Contact_no" character varying NOT NULL`);
    }

}
