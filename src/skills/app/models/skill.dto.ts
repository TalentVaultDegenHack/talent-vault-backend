import { SkillEntity } from '../../infrastructure/entities/skill.entity';

export class SkillDto {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
  ) {}

  static map(entity: Readonly<SkillEntity>): SkillDto {
    return new SkillDto(entity.id, entity.name, entity.description);
  }
}
