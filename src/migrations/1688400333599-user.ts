import { MigrationInterface, QueryRunner } from "typeorm";

export class User1688400333599 implements MigrationInterface {
    name = 'User1688400333599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "avatar" character varying, "password" character varying(60) NOT NULL, "refreshToken" character varying(60), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
