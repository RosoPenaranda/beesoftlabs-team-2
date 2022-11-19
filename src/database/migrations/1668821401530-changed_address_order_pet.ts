import {MigrationInterface, QueryRunner} from "typeorm";

export class changedAddressOrderPet1668821401530 implements MigrationInterface {
    name = 'changedAddressOrderPet1668821401530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" ADD "age" integer`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "start_time"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "start_time" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "end_time"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "end_time" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "remark" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "postal_code" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "postal_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "remark" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "end_time"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "end_time" date`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "start_time"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "start_time" date`);
        await queryRunner.query(`ALTER TABLE "pets" DROP COLUMN "age"`);
    }

}
