import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TypeOfService } from 'src/utils/enums';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsIn(Object.values(TypeOfService))
  @Expose()
  service: TypeOfService;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @Expose()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  price: number;

  @IsNotEmpty()
  @IsUrl()
  @Expose()
  image_url: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @Expose()
  image_alt: string;
}
