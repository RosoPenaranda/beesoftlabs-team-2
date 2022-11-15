import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Name of the service',
    required: false,
    enum: Object.values(TypeOfService),
    type: TypeOfService,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(TypeOfService))
  @Expose()
  service?: TypeOfService;

  @ApiProperty({
    description: 'Name of the service',
    required: false,
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
    required: false,
    minLength: 1,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Price of the service in COP',
    required: false,
    minimum: 0.0,
    type: Number,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  price?: number;

  @ApiProperty({
    description: 'URL of the image to show for the service',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  @Expose()
  image_url?: string;

  @ApiProperty({
    description: 'alt for the image of the service',
    required: false,
    minLength: 1,
    maxLength: 250,
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @Expose()
  image_alt?: string;
}
