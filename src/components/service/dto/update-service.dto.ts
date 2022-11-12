import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TypeOfService } from 'src/utils/enums';
export class UpdateServiceDto {
  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(TypeOfService))
  @Expose()
  service?: TypeOfService;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @Expose()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  price?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  @Expose()
  image_url?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @Expose()
  image_alt?: string;
}
