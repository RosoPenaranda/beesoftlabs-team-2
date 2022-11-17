import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'If the service require a start time',
    required: false,
    type: Date,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  @Expose()
  start_time?: Date;

  @ApiProperty({
    description: 'If the service require an end time',
    required: false,
    type: Date,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  @Expose()
  end_time?: Date;

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
