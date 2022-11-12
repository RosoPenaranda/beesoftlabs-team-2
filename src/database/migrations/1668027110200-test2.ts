import {MigrationInterface, QueryRunner} from "typeorm";

export class test21668027110200 implements MigrationInterface {
    name = 'test21668027110200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_picture" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_picture" SET NOT NULL`);
    }

}
