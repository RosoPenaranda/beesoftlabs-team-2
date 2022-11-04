import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1661017496154 implements MigrationInterface {
  name = 'user1661017496154';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "address" character varying(250) NOT NULL, "email" character varying(250) NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
