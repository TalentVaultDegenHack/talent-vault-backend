import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { SkillFilterInterface } from '../skill.filter.interface';
export class MatchingProfilesInputDto {
  @ApiProperty({
    required: true,
  })
  @IsArray()
  public readonly filters!: SkillFilterInterface[];

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  public readonly precision!: number;
}
