import {MigrationInterface, QueryRunner} from "typeorm";

export class testPls1667864610202 implements MigrationInterface {
    name = 'testPls1667864610202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "points" integer NOT NULL, "comment" character varying(500) NOT NULL, "authorId" uuid, "authorEmail" character varying(250), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."services_size_enum" AS ENUM('paseo', 'peluqueria', 'guarderia')`);
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "size" "public"."services_size_enum" NOT NULL, "description" character varying(250) NOT NULL, "price" character varying(250) NOT NULL, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" date, "end_time" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "total_price" integer NOT NULL, "customerId" uuid, "customerEmail" character varying(250), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pets_size_enum" AS ENUM('tiny', 'normal', 'big')`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(250) NOT NULL, "species" character varying(250) NOT NULL, "profile_picture" character varying(250) NOT NULL, "weight" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "size" "public"."pets_size_enum" NOT NULL DEFAULT 'normal', "ownerId" uuid, "ownerEmail" character varying(250), CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" character varying(250) NOT NULL, "city" character varying(250) NOT NULL, "address" character varying(250) NOT NULL, "remark" character varying(250) NOT NULL, "length" integer NOT NULL, "latitude" integer NOT NULL, "postal_code" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, "ownerEmail" character varying(250), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_services_services" ("ordersId" uuid NOT NULL, "servicesId" uuid NOT NULL, CONSTRAINT "PK_7e079ff060e7e5a246195b6f412" PRIMARY KEY ("ordersId", "servicesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5c36400a99a00baeae7bededec" ON "orders_services_services" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d73969dd9c7fab3a753e59e6a4" ON "orders_services_services" ("servicesId") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_picture" character varying(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('client', 'employee', 'admin')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" "public"."users_roles_enum" NOT NULL DEFAULT 'client'`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_e752aee509d8f8118c6e5b1d8cc" PRIMARY KEY ("id", "email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_e752aee509d8f8118c6e5b1d8cc"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_97672ac88f789774dd47f7c8be3" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_e752aee509d8f8118c6e5b1d8cc" PRIMARY KEY ("email", "id")`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_894ad97b113786542d49e7f7d5e" FOREIGN KEY ("authorId", "authorEmail") REFERENCES "users"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_736d06ab800ae5750dab3bddb2a" FOREIGN KEY ("customerId", "customerEmail") REFERENCES "users"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_3ace2cd11587674a6a3dd7d6a4c" FOREIGN KEY ("ownerId", "ownerEmail") REFERENCES "users"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_63127381349d734f6c30410f798" FOREIGN KEY ("ownerId", "ownerEmail") REFERENCES "users"("id","email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_services_services" ADD CONSTRAINT "FK_5c36400a99a00baeae7bededec8" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_services_services" ADD CONSTRAINT "FK_d73969dd9c7fab3a753e59e6a42" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_services_services" DROP CONSTRAINT "FK_d73969dd9c7fab3a753e59e6a42"`);
        await queryRunner.query(`ALTER TABLE "orders_services_services" DROP CONSTRAINT "FK_5c36400a99a00baeae7bededec8"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_63127381349d734f6c30410f798"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_3ace2cd11587674a6a3dd7d6a4c"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_736d06ab800ae5750dab3bddb2a"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_894ad97b113786542d49e7f7d5e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_e752aee509d8f8118c6e5b1d8cc"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_97672ac88f789774dd47f7c8be3" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_e752aee509d8f8118c6e5b1d8cc" PRIMARY KEY ("id", "email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_e752aee509d8f8118c6e5b1d8cc"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_picture"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address" character varying(250) NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d73969dd9c7fab3a753e59e6a4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c36400a99a00baeae7bededec"`);
        await queryRunner.query(`DROP TABLE "orders_services_services"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`DROP TYPE "public"."pets_size_enum"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TYPE "public"."services_size_enum"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
