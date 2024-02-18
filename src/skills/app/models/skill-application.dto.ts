import { SkillUserEntity } from '../../infrastructure/entities/skill-user.entity';
import { SkillDto } from './skill.dto';
import { MentorDto } from '../../../user/app/models/mentor.dto';
import { UserPublicDto } from '../../../user/app/models/userPublicDto';
import { SkillUserStateEnum } from '../../infrastructure/models/skill-user-state.enum';

export class SkillApplicationDto {
  private constructor(
    public readonly id: number,
    public readonly skill: SkillDto,
    public readonly mentor: MentorDto,
    public readonly user: UserPublicDto,
    public readonly state: SkillUserStateEnum,
    public readonly requestedValue: number,
    public readonly createdAt: Date,
    public readonly confirmedAt: Date | null,
  ) {}

  static async map(
    entity: Readonly<SkillUserEntity>,
  ): Promise<SkillApplicationDto> {
    const skill = SkillDto.map(await entity.skill);
    const mentor = MentorDto.map(await entity.mentor);
    const userPrivate = UserPublicDto.map(await entity.user);

    return new SkillApplicationDto(
      entity.id,
      skill,
      mentor,
      userPrivate,
      entity.state,
      entity.requestedValue,
      entity.createdAt,
      entity.confirmedAt,
    );
  }
}
