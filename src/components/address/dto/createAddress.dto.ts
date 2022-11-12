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
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  state: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  remark: string;

  @IsNotEmpty()
  @IsLongitude()
  @Expose()
  longitude: string;

  @IsNotEmpty()
  @IsLatitude()
  @Expose()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  @IsPostalCode()
  @MaxLength(50)
  @Expose()
  postal_code: string;
}
