import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Name of the service',
    required: true,
    enum: Object.values(TypeOfService),
    type: TypeOfService,
  })
  @IsNotEmpty()
  @IsIn(Object.values(TypeOfService))
  @Expose()
  service: TypeOfService;

  @ApiProperty({
    description: 'Name of the service',
    required: true,
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Description of the service',
    required: true,
    minLength: 1,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Price of the service in COP',
    required: true,
    minimum: 0.0,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  price: number;

  @ApiProperty({
    description: 'URL of the image to show for the service',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsUrl()
  @Expose()
  image_url: string;

  @ApiProperty({
    description: 'alt for the image of the service',
    required: true,
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @Expose()
  image_alt: string;
}
