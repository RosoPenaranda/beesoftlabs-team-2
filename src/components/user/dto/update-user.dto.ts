import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  email: string;

  @IsOptional()
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
