import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntity1708209127319 implements MigrationInterface {
    name = 'UpdateEntity1708209127319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" ALTER COLUMN "destinationAddr" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ALTER COLUMN "address" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ALTER COLUMN "destinationAddr" SET NOT NULL`);
    }

}
