import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class ReadAddressDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @Expose()
  state: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
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
  @MaxLength(250)
  @Expose()
  remark: string;

  @IsNotEmpty()
  @IsInt()
  @Expose()
  length: number;

  @IsNotEmpty()
  @IsInt()
  @Expose()
  latitude: number;

  @IsNotEmpty()
  @IsInt()
  @Min(6)
  @Expose()
  postal_code: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  owner: string;
}
