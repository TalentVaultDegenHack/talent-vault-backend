import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsOptional, IsString, MinLength} from 'class-validator';
export class RegisterDto {
  @ApiProperty({
    required: true,
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  public readonly password!: string;

  @ApiProperty({
    required: true,
    minLength: 4,
  })
  @IsString({})
  @MinLength(4)
  public readonly username!: string;

  @ApiProperty({
    required: true,
    minLength: 4,
  })
  @IsEmail({})
  public readonly email!: string;

  @IsOptional()
  public readonly address!: string;

  @IsString({})
  public readonly firstName!: string;

  @IsString({})
  public readonly lastName!: string;
}
