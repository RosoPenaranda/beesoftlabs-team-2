import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateOrderDto {
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
    required: false,
    minimum: 0,
    type: Number,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  total_price?: number;

  @IsArray()
  services_id: string[];
}
