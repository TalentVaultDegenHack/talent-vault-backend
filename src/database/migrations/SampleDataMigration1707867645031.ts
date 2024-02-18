import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../../user/infrastructure/entities/user.entity';
import { UserState } from '../../user/infrastructure/models/user-state.enum';
import { faker } from '@faker-js/faker';
import { UserRoleEnum } from '../../user/infrastructure/models/user-role.enum';
import argon2 from 'argon2';
import { SkillEntity } from '../../skills/infrastructure/entities/skill.entity';
import { SkillUserEntity } from '../../skills/infrastructure/entities/skill-user.entity';
import { SkillUserStateEnum } from '../../skills/infrastructure/models/skill-user-state.enum';

export class SampleDataMigration1707867645031 implements MigrationInterface {
  name = 'SampleDataMigration1707867645031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const params = {
      user: 100,
      mentor: 10,
      iteration: 10,
    };
    const data: { users: UserEntity[]; mentors: UserEntity[] } = {
      users: [],
      mentors: [],
    };
    for (let i = 0; i < params.user; i++) {
      const username = faker.internet.userName();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      const temp = UserEntity.factory({
        username: username,
        email: faker.internet.email(firstName, lastName),
        state: UserState.Active,
        passwordHash: await argon2.hash(faker.internet.password()),
        roles: [UserRoleEnum.User],
        firstName: lastName,
        lastName: firstName,
      });
      const userObject = await queryRunner.manager
        .getRepository(UserEntity)
        .save(temp);
      data.users.push(userObject);
    }
    for (let i = 0; i < params.mentor; i++) {
      const username = faker.internet.userName();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      const temp = UserEntity.factory({
        username: username,
        email: faker.internet.email(firstName, lastName),
        state: UserState.Active,
        passwordHash: await argon2.hash(faker.internet.password()),
        roles: [UserRoleEnum.Mentor],
        firstName: lastName,
        lastName: firstName,
      });
      const userObject = await queryRunner.manager
        .getRepository(UserEntity)
        .save(temp);
      data.mentors.push(userObject);
    }

    const skills = await queryRunner.manager.getRepository(SkillEntity).find();
    for (const skill of skills) {
      for (const user of data.users) {
        for (let i = 0; i < params.iteration; i++) {
          // random
          if (faker.number.int({ min: 0, max: 100 }) < 70) {
            const skillUser = SkillUserEntity.factory({
              skillId: skill.id,
              userId: user.id,
              mentorId:
                data.mentors[
                  faker.number.int({ min: 0, max: params.mentor - 1 })
                ].id,
              requestedValue: faker.number.int({ min: 0, max: 100 }),
            });
            skillUser.mentorValue = faker.number.int({ min: 0, max: 100 });
            skillUser.mentorCooperation = faker.number.int({
              min: 0,
              max: 100,
            });
            skillUser.value = faker.number.int({ min: 0, max: 100 });
            skillUser.state = SkillUserStateEnum.Approved;

            await queryRunner.manager
              .getRepository(SkillUserEntity)
              .save(skillUser);
          }
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
