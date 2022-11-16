import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PetSize } from 'src/utils/enums';

export class CreatePetDto {
  @ApiProperty({
    description: "Pet's name",
    required: true,
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @Expose()
  name: string;

  @ApiProperty({
    description: "Pet' species",
    required: true,
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @Expose()
  species: string;

  @ApiProperty({
    description: "URL of the pet's picture",
    required: false,
    minLength: 0,
    type: String,
  })
  @IsOptional()
  @IsUrl()
  @IsNotEmpty()
  profile_picture?: string;

  @ApiProperty({
    description: 'Weight of the pet in kilograms',
    required: true,
    minimum: 0.0,
    maximum: 100.0,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  weight: number;

  @ApiProperty({
    description: 'Size of the pet',
    required: true,
    enum: Object.values(PetSize),
    default: PetSize.NORMAL,
    type: PetSize,
  })
  @IsNotEmpty()
  @IsIn(Object.values(PetSize))
  @Expose()
  size: PetSize;
}
