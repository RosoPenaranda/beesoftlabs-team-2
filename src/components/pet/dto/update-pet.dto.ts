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

export class UpdatePetDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  species: string;

  @IsOptional()
  @IsUrl()
  @IsNotEmpty()
  profile_picture: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @IsPositive()
  @IsNotEmpty()
  weight: number;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(PetSize))
  size: PetSize;

  @IsOptional()
  @IsNotEmptyObject()
  owner: User;
}
