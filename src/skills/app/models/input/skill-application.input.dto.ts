import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
export class SkillApplicationInputDto {
  @ApiProperty({
    required: true,
  })
  @IsObject()
  public readonly skill!: { id: number; requestedValue: number };

  @ApiProperty({
    required: true,
  })
  @IsString()
  public readonly mentorId!: string;
}
