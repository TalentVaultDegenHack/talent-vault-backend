import { MigrationInterface, QueryRunner } from 'typeorm';

export class SkillUserEntity1707826120392 implements MigrationInterface {
  name = 'SkillUserEntity1707826120392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "skills-user" ("id" SERIAL NOT NULL, "skillId" integer NOT NULL, "userId" uuid NOT NULL, "mentorId" uuid NOT NULL, "state" smallint NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "confirmedAt" date, CONSTRAINT "PK_f14d3a454244d02584b1b033f70" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "firstName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "lastName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" ADD CONSTRAINT "FK_c24bd04fc301cc0ea145ad8daf9" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" ADD CONSTRAINT "FK_67b5674c6dff3449dbb5a2751ce" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" ADD CONSTRAINT "FK_b58488cb84d55ff170fb6a0a1ec" FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "skills-user" DROP CONSTRAINT "FK_b58488cb84d55ff170fb6a0a1ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" DROP CONSTRAINT "FK_67b5674c6dff3449dbb5a2751ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" DROP CONSTRAINT "FK_c24bd04fc301cc0ea145ad8daf9"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
    await queryRunner.query(`DROP TABLE "skills-user"`);
  }
}
