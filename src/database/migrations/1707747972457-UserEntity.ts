import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntity1707747972457 implements MigrationInterface {
  name = 'UserEntity1707747972457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const q = `
    create table users
(
    id                  uuid       default uuid_generate_v4() not null
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    email               varchar                               not null
        constraint "UQ_97672ac88f789774dd47f7c8be3"
            unique,
    username            varchar                               not null,
    state               smallint   default '2'::smallint      not null,
    "passwordHash"      varchar
);
    `;
    await queryRunner.query(
        q,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "roles" smallint array NOT NULL DEFAULT '{1}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    // );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
  }
}
