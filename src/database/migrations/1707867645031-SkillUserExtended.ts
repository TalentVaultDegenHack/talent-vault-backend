import { MigrationInterface, QueryRunner } from 'typeorm';

export class SkillUserExtended1707867645031 implements MigrationInterface {
  name = 'SkillUserExtended1707867645031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "skills-user" ADD "requestedValue" smallint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" ADD "mentorValue" smallint`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" ADD "mentorCooperation" smallint`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" ALTER COLUMN "value" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "skills-user" ALTER COLUMN "value" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" DROP COLUMN "mentorCooperation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" DROP COLUMN "mentorValue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "skills-user" DROP COLUMN "requestedValue"`,
    );
  }
}
