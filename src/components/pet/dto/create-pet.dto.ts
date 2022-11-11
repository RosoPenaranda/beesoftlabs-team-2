import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/database/entities/user.entity';
import { PetSize } from 'src/utils/enums';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @Expose()
  species: string;

  @IsOptional()
  @IsUrl()
  @IsNotEmpty()
  profile_picture: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  weight: number;

  @IsNotEmpty()
  @IsIn(Object.values(PetSize))
  @Expose()
  size: PetSize;

  @IsNotEmptyObject()
  @Expose()
  owner: User;
}
