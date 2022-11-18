import {MigrationInterface, QueryRunner} from "typeorm";

export class changedAddressLongitud_1668753156932 implements MigrationInterface {
    name = 'changedAddressLongitud_1668753156932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "longitude" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "latitude" character varying(250)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "latitude" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "longitude" character varying NOT NULL`);
    }

}
