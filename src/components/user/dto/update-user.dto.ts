import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  name: string;

  @IsUrl()
  @Expose()
  profile_picture: string;

  @IsInt()
  @IsPositive()
  phone: number;
}
