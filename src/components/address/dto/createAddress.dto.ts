import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, TransformFnParams } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsPostalCode,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'State where the city is placed',
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @Expose()
  @MaxLength(250)
  @MinLength(3)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  state: string;

  @ApiProperty({
    description: 'City where the user lives',
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @Expose()
  @MaxLength(250)
  @MinLength(3)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Address of the user',
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @Expose()
  @MaxLength(250)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  address: string;

  @ApiProperty({
    description: 'Additional information about the address',
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @Expose()
  @MaxLength(500)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  remark: string;

  @ApiProperty({
    description: 'Longitude of the address',
    required: true,
    type: String,
  })
  @Expose()
  @IsLongitude()
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  longitude: string;

  @ApiProperty({
    description: 'Latitude the address',
    required: true,
    type: String,
  })
  @Expose()
  @IsLatitude()
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  latitude: string;

  @ApiProperty({
    description: 'Postal code of the zone',
    required: true,
    type: String,
  })
  @Expose()
  @IsPostalCode()
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  postal_code: string;
}
