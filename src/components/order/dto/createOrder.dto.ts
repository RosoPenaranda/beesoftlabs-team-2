import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateOrderDto {
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
    required: true,
    minimum: 0,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Expose()
  total_price: number;

  @IsArray()
  services_id: string[];
}
