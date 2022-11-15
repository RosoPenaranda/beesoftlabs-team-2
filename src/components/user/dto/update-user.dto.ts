import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: "User's email",
    required: false,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @IsOptional()
  @IsEmail()
  @MinLength(3)
  @MaxLength(250)
  @IsNotEmpty()
  email?: string;

  @ApiProperty({
    description: "User's name",
    required: false,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: "URL of the user's profile picture",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUrl()
  @IsNotEmpty()
  profile_picture?: string;

  @ApiProperty({
    description: "User's phone number",
    required: false,
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @IsNotEmpty()
  phone?: string;
}
