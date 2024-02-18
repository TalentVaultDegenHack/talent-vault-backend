import { MigrationInterface, QueryRunner } from 'typeorm';

export class BlockchainToken1708116072566 implements MigrationInterface {
  name = 'BlockchainToken1708116072566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'search_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "search_view"`);
    await queryRunner.query(
      `CREATE TABLE "token" ("id" SERIAL NOT NULL, "skillUserId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "mintedAt" date, "destinationAddr" character varying NOT NULL, "isMinted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "blockchainAddress" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_83eb5ebc188af3c13b4ccb4183b" FOREIGN KEY ("skillUserId") REFERENCES "skills-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`CREATE VIEW "search_view" AS 
        SELECT
            "userId" as userId,
            "skillId" as skillId,
            min("skills-user".value) as minValue,
            max("skills-user".value) as maxValue,
            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,
        
            min("skills-user"."requestedValue") as minRequestedValue,
            max("skills-user"."requestedValue") as maxRequestedValue,
            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,
        
            min("skills-user"."mentorCooperation") as minMentorCooperation,
            max("skills-user"."mentorCooperation") as maxMentorCooperation,
            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,
        
            min("skills-user"."mentorValue") as minMentorValue,
            max("skills-user"."mentorValue") as maxMentorValue,
            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue
        FROM "skills-user" GROUP BY "skills-user"."userId", "skills-user"."skillId"
    `);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'search_view',
        'SELECT\n            "userId" as userId,\n            "skillId" as skillId,\n            min("skills-user".value) as minValue,\n            max("skills-user".value) as maxValue,\n            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,\n        \n            min("skills-user"."requestedValue") as minRequestedValue,\n            max("skills-user"."requestedValue") as maxRequestedValue,\n            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,\n        \n            min("skills-user"."mentorCooperation") as minMentorCooperation,\n            max("skills-user"."mentorCooperation") as maxMentorCooperation,\n            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,\n        \n            min("skills-user"."mentorValue") as minMentorValue,\n            max("skills-user"."mentorValue") as maxMentorValue,\n            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue\n        FROM "skills-user" GROUP BY "skills-user"."userId", "skills-user"."skillId"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'search_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "search_view"`);
    await queryRunner.query(
      `ALTER TABLE "token" DROP CONSTRAINT "FK_83eb5ebc188af3c13b4ccb4183b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "blockchainAddress"`,
    );
    await queryRunner.query(`DROP TABLE "token"`);
    await queryRunner.query(`CREATE VIEW "search_view" AS CREATE VIEW searchV1 AS
        SELECT
            "userId" as userId,
            min("skills-user".value) as minValue,
            max("skills-user".value) as maxValue,
            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,
        
            min("skills-user"."requestedValue") as minRequestedValue,
            max("skills-user"."requestedValue") as maxRequestedValue,
            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,
        
            min("skills-user"."mentorCooperation") as minMentorCooperation,
            max("skills-user"."mentorCooperation") as maxMentorCooperation,
            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,
        
            min("skills-user"."mentorValue") as minMentorValue,
            max("skills-user"."mentorValue") as maxMentorValue,
            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue
        FROM "skills-user" GROUP BY "skills-user"."userId"`);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'search_view',
        'CREATE VIEW searchV1 AS\n        SELECT\n            "userId" as userId,\n            min("skills-user".value) as minValue,\n            max("skills-user".value) as maxValue,\n            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,\n        \n            min("skills-user"."requestedValue") as minRequestedValue,\n            max("skills-user"."requestedValue") as maxRequestedValue,\n            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,\n        \n            min("skills-user"."mentorCooperation") as minMentorCooperation,\n            max("skills-user"."mentorCooperation") as maxMentorCooperation,\n            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,\n        \n            min("skills-user"."mentorValue") as minMentorValue,\n            max("skills-user"."mentorValue") as maxMentorValue,\n            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue\n        FROM "skills-user" GROUP BY "skills-user"."userId"',
      ],
    );
    await queryRunner.query(`CREATE VIEW "search_view" AS CREATE VIEW searchV1 AS
        SELECT
            "userId" as userId,
            min("skills-user".value) as minValue,
            max("skills-user".value) as maxValue,
            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,
        
            min("skills-user"."requestedValue") as minRequestedValue,
            max("skills-user"."requestedValue") as maxRequestedValue,
            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,
        
            min("skills-user"."mentorCooperation") as minMentorCooperation,
            max("skills-user"."mentorCooperation") as maxMentorCooperation,
            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,
        
            min("skills-user"."mentorValue") as minMentorValue,
            max("skills-user"."mentorValue") as maxMentorValue,
            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue
        FROM "skills-user" GROUP BY "skills-user"."userId"`);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'search_view',
        'CREATE VIEW searchV1 AS\n        SELECT\n            "userId" as userId,\n            min("skills-user".value) as minValue,\n            max("skills-user".value) as maxValue,\n            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,\n        \n            min("skills-user"."requestedValue") as minRequestedValue,\n            max("skills-user"."requestedValue") as maxRequestedValue,\n            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,\n        \n            min("skills-user"."mentorCooperation") as minMentorCooperation,\n            max("skills-user"."mentorCooperation") as maxMentorCooperation,\n            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,\n        \n            min("skills-user"."mentorValue") as minMentorValue,\n            max("skills-user"."mentorValue") as maxMentorValue,\n            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue\n        FROM "skills-user" GROUP BY "skills-user"."userId"',
      ],
    );
    await queryRunner.query(`CREATE VIEW "search_view" AS CREATE VIEW searchV1 AS
        SELECT
            "userId" as userId,
            min("skills-user".value) as minValue,
            max("skills-user".value) as maxValue,
            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,
        
            min("skills-user"."requestedValue") as minRequestedValue,
            max("skills-user"."requestedValue") as maxRequestedValue,
            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,
        
            min("skills-user"."mentorCooperation") as minMentorCooperation,
            max("skills-user"."mentorCooperation") as maxMentorCooperation,
            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,
        
            min("skills-user"."mentorValue") as minMentorValue,
            max("skills-user"."mentorValue") as maxMentorValue,
            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue
        FROM "skills-user" GROUP BY "skills-user"."userId"`);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'search_view',
        'CREATE VIEW searchV1 AS\n        SELECT\n            "userId" as userId,\n            min("skills-user".value) as minValue,\n            max("skills-user".value) as maxValue,\n            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,\n        \n            min("skills-user"."requestedValue") as minRequestedValue,\n            max("skills-user"."requestedValue") as maxRequestedValue,\n            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,\n        \n            min("skills-user"."mentorCooperation") as minMentorCooperation,\n            max("skills-user"."mentorCooperation") as maxMentorCooperation,\n            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,\n        \n            min("skills-user"."mentorValue") as minMentorValue,\n            max("skills-user"."mentorValue") as maxMentorValue,\n            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue\n        FROM "skills-user" GROUP BY "skills-user"."userId"',
      ],
    );
    await queryRunner.query(`CREATE VIEW "search_view" AS CREATE VIEW searchV1 AS
        SELECT
            "userId" as userId,
            min("skills-user".value) as minValue,
            max("skills-user".value) as maxValue,
            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,
        
            min("skills-user"."requestedValue") as minRequestedValue,
            max("skills-user"."requestedValue") as maxRequestedValue,
            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,
        
            min("skills-user"."mentorCooperation") as minMentorCooperation,
            max("skills-user"."mentorCooperation") as maxMentorCooperation,
            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,
        
            min("skills-user"."mentorValue") as minMentorValue,
            max("skills-user"."mentorValue") as maxMentorValue,
            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,
            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue
        FROM "skills-user" GROUP BY "skills-user"."userId"`);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'search_view',
        'CREATE VIEW searchV1 AS\n        SELECT\n            "userId" as userId,\n            min("skills-user".value) as minValue,\n            max("skills-user".value) as maxValue,\n            CAST (avg("skills-user".value) AS INTEGER ) as avgValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user".value) AS INTEGER) AS medianValue,\n        \n            min("skills-user"."requestedValue") as minRequestedValue,\n            max("skills-user"."requestedValue") as maxRequestedValue,\n            CAST (avg("skills-user"."requestedValue") AS INTEGER ) as avgRequestedValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."requestedValue") AS INTEGER) AS medianRequestedValue,\n        \n            min("skills-user"."mentorCooperation") as minMentorCooperation,\n            max("skills-user"."mentorCooperation") as maxMentorCooperation,\n            CAST (avg("skills-user"."mentorCooperation") AS INTEGER ) as avgMentorCooperation,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorCooperation") AS INTEGER) AS medianMentorCooperation,\n        \n            min("skills-user"."mentorValue") as minMentorValue,\n            max("skills-user"."mentorValue") as maxMentorValue,\n            CAST (avg("skills-user"."mentorValue") AS INTEGER ) as avgMentorValue,\n            CAST (PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "skills-user"."mentorValue") AS INTEGER) AS medianMentorValue\n        FROM "skills-user" GROUP BY "skills-user"."userId"',
      ],
    );
  }
}
