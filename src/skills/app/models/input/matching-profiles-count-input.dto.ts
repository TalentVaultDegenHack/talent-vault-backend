import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { SkillFilterInterface } from '../skill.filter.interface';
export class MatchingProfilesCountInputDto {
  @ApiProperty({
    required: true,
  })
  @IsArray()
  public readonly filters!: SkillFilterInterface[];
}
