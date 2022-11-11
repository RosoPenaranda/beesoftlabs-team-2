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
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  name: string;

  @IsOptional()
  @IsUrl()
  @IsNotEmpty()
  profile_picture?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @IsNotEmpty()
  phone?: string;
}
