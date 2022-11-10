import { Expose } from 'class-transformer';
import {
  Min,
  IsString,
  MaxLength,
  MinLength,
  IsLatitude,
  IsLongitude,
  IsPostalCode, IsOptional
} from "class-validator";

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  state: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  city: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  @Expose()
  address: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  remark: string;

  @IsOptional()
  @IsLongitude()
  @Expose()
  longitude: string;

  @IsOptional()
  @IsLatitude()
  @Expose()
  latitude: string;

  @IsOptional()
  @IsPostalCode()
  @Min(6)
  @Expose()
  postal_code: number;
}
