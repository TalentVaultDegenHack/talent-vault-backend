import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { SkillFilterInterface } from '../skill.filter.interface';
export class MatchingProfileInputDto {
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

  @IsString()
  public readonly userId!: string;
}
