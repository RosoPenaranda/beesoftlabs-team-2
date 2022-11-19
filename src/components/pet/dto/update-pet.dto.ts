import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PetSize } from 'src/utils/enums';

export class UpdatePetDto {
  @ApiProperty({
    description: "Pet's name",
    required: false,
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name?: string;

  @ApiProperty({
    description: "Pet' species",
    required: false,
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  species?: string;

  @ApiProperty({
    description: "Pet' age",
    required: false,
    minLength: 1,
    maxLength: 30,
    type: Number,
  })
  @Min(1)
  @Max(30)
  @IsInt()
  @IsOptional()
  age?: number;

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
    required: false,
    minimum: 0.0,
    maximum: 100.0,
    type: Number,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @IsPositive()
  @IsNotEmpty()
  weight?: number;

  @ApiProperty({
    description: 'Size of the pet',
    required: false,
    enum: Object.values(PetSize),
    default: PetSize.NORMAL,
    type: PetSize,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(PetSize))
  size?: PetSize;
}
