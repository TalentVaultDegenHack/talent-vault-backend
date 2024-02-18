import { MigrationInterface, QueryRunner } from 'typeorm';

export class TokenEntityUpdate1708121047738 implements MigrationInterface {
  name = 'TokenEntityUpdate1708121047738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "token" ADD "address" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "address"`);
  }
}
