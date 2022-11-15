import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  state: string;

  @ApiProperty({
    description: 'City where the user lives',
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  city: string;

  @ApiProperty({
    description: 'Address of the user',
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  address: string;

  @ApiProperty({
    description: 'Additional information about the address',
    required: true,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  remark: string;

  @ApiProperty({
    description: 'Longitude of the address',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsLongitude()
  @Expose()
  longitude: string;

  @ApiProperty({
    description: 'Latitude the address',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsLatitude()
  @Expose()
  latitude: string;

  @ApiProperty({
    description: 'Postal code of the zone',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsPostalCode()
  @MaxLength(50)
  @Expose()
  postal_code: string;
}
