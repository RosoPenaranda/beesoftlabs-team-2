import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, TransformFnParams } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
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
  @MaxLength(250)
  @MinLength(3)
  // @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @Expose()
  state: string;

  @ApiProperty({
    description: 'City where the user lives',
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @MaxLength(250)
  @MinLength(3)
  // @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @Expose()
  city: string;

  @ApiProperty({
    description: 'Address of the user',
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @MaxLength(250)
  @MinLength(3)
  // @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @Expose()
  address: string;

  @ApiProperty({
    description: 'Additional information about the address',
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @MaxLength(250)
  @MinLength(3)
  // @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @Expose()
  remark: string;

  @ApiProperty({
    description: 'Longitude of the address',
    required: true,
    type: String,
  })
  @IsLongitude()
  @MaxLength(50)
  // @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @Expose()
  longitude: string;

  @ApiProperty({
    description: 'Latitude the address',
    required: true,
    type: String,
  })
  @IsLatitude()
  @MaxLength(50)
  // @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @Expose()
  latitude: string;

  @ApiProperty({
    description: 'Postal code of the zone',
    required: true,
    type: String,
  })
  @IsPostalCode()
  @MaxLength(50)
  // @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @Expose()
  postal_code: string;
}
