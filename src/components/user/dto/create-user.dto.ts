import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
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
  @Expose()
  profile_picture: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  phone: number;
}
