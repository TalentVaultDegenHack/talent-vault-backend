import { MigrationInterface, QueryRunner } from 'typeorm';

export class SkillUserEntityUpdate1707827675235 implements MigrationInterface {
  name = 'SkillUserEntityUpdate1707827675235';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "skills-user" ADD "value" smallint NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "skills-user" DROP COLUMN "value"`);
  }
}
