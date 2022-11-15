import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsString,
  MaxLength,
  MinLength,
  IsLatitude,
  IsLongitude,
  IsPostalCode,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty({
    description: 'State where the city is placed',
    required: false,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  state?: string;

  @ApiProperty({
    description: 'City where the user lives',
    required: false,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  city?: string;

  @ApiProperty({
    description: 'Address of the user',
    required: false,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  address?: string;

  @ApiProperty({
    description: 'Additional information about the address',
    required: false,
    minLength: 3,
    maxLength: 250,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  remark?: string;

  @ApiProperty({
    description: 'Longitude of the address',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsLongitude()
  @Expose()
  longitude?: string;

  @ApiProperty({
    description: 'Latitude the address',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsLatitude()
  @Expose()
  latitude?: string;

  @ApiProperty({
    description: 'Postal code of the zone',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsPostalCode()
  @MaxLength(50)
  postal_code?: string;
}
