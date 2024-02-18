import { MigrationInterface, QueryRunner } from 'typeorm';

const fixtures = [
  {
    name: 'Skill #1',
    description: 'Skill #1 Description',
  },
  {
    name: 'Skill #2',
    description: 'Skill #2 Description',
  },
  {
    name: 'Skill #3',
    description: 'Skill #3 Description',
  },
  {
    name: 'Skill #4',
    description: 'Skill #4 Description',
  },
];
export class SkillEntity1707748231655 implements MigrationInterface {
  name = 'SkillEntity1707748231655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "skills" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_94de7d6a365dac5ff8fe82527e4" UNIQUE ("name"), CONSTRAINT "PK_9fe425ebba936c53d4e6979d8ff" PRIMARY KEY ("id"))`,
    );

    // Add Skills
    for (const fix of fixtures) {
      await queryRunner.query(
        `INSERT INTO "public"."skills" ("name", "description") VALUES ('${fix.name}', '${fix.description}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "skills"`);

    // Remove Skills
    for (const fix of fixtures) {
      await queryRunner.query(
        `DELETE FROM "public"."skills" WHERE name = '${fix.name}'`,
      );
    }
  }
}
