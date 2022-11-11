<<<<<<< HEAD
import { Expose } from 'class-transformer';
=======
>>>>>>> 5611889 (pet component created)
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
  @IsOptional()
  @IsEmail()
  @MinLength(3)
  @MaxLength(250)
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @IsNotEmpty()
  name?: string;

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
