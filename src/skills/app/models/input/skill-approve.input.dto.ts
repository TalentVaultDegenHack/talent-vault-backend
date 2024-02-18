import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class SkillApproveInputDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  public readonly value!: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  public readonly mentorValue!: number;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  public readonly mentorCooperation!: number;
}
