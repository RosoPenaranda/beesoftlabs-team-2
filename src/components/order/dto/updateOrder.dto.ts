import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'If the service require a start time',
    required: false,
    type: Date,
  })
  @Expose()
  @MinLength(1)
  @MaxLength(250)
  @IsString()
  @IsOptional()
  start_time?: string;

  @ApiProperty({
    description: 'If the service require an end time',
    required: false,
    type: Date,
  })
  @Expose()
  @MinLength(1)
  @MaxLength(250)
  @IsString()
  @IsOptional()
  end_time?: string;

  @ApiProperty({
    description: 'Total price of all the services',
    required: false,
    minimum: 0,
    type: Number,
  })
  @Expose()
  @IsNumber()
  @IsOptional()
  total_price?: number;

  @ApiProperty({
    description: 'Array containing the provided services',
    required: true,
    type: String,
  })
  @Expose()
  @IsArray()
  @IsOptional()
  services_id?: string[];
}
