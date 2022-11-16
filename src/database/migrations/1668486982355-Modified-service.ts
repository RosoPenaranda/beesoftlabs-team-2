import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifiedService1668486982355 implements MigrationInterface {
    name = 'ModifiedService1668486982355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "name" character varying(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "image_url" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "image_alt" character varying(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "longitude" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "latitude" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "postal_code"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "postal_code" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "description" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pets" ALTER COLUMN "profile_picture" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(250)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pets" ALTER COLUMN "profile_picture" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "description" character varying(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "postal_code"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "postal_code" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "longitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "image_alt"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "name"`);
    }

}
