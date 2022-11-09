import { Expose } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsPostalCode,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  state: string;

  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  city: string;

  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  address: string;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  remark: string;

  @IsLongitude()
  @Expose()
  longitude: number;

  @IsLatitude()
  @Expose()
  latitude: number;

  @IsPostalCode()
  @Min(6)
  @Expose()
  postal_code: number;
}
