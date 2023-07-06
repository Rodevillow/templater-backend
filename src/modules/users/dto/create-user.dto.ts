import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({required: false})
  firstName?: string;

  @ApiProperty({required: false})
  lastName?: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty({ required: false })
  avatar: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  email: string;
}
