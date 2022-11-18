import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: "User's email",
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User's name",
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

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
