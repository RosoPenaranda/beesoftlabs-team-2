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
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  state?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  city?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  remark?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsLongitude()
  @Expose()
  longitude?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsLatitude()
  @Expose()
  latitude?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsPostalCode()
  @MaxLength(50)
  postal_code?: string;
}
