import { SkillUserEntity } from '../../infrastructure/entities/skill-user.entity';
import { SkillDto } from './skill.dto';
import { MentorDto } from '../../../user/app/models/mentor.dto';
import { UserPublicDto } from '../../../user/app/models/userPublicDto';
import { SkillUserStateEnum } from '../../infrastructure/models/skill-user-state.enum';

export class SkillUserDto {
  private constructor(
    public readonly id: number,
    public readonly skill: SkillDto,
    public readonly mentor: MentorDto,
    public readonly user: UserPublicDto,
    public readonly state: SkillUserStateEnum,
    public readonly requestedValue: number,
    public readonly value: number | null,
    public readonly mentorValue: number | null,
    public readonly mentorCooperation: number | null,
    public readonly createdAt: Date,
    public readonly confirmedAt: Date | null,
  ) {}

  static async map(entity: Readonly<SkillUserEntity>): Promise<SkillUserDto> {
    const skill = SkillDto.map(await entity.skill);
    const mentor = MentorDto.map(await entity.mentor);
    const userPublic = UserPublicDto.map(await entity.user);

    return new SkillUserDto(
      entity.id,
      skill,
      mentor,
      userPublic,
      entity.state,
      entity.requestedValue,
      entity.value,
      entity.mentorValue,
      entity.mentorCooperation,
      entity.createdAt,
      entity.confirmedAt,
    );
  }
}
