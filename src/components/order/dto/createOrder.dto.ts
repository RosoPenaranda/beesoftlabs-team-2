import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Service } from '../../../database/entities/service.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDate()
  @Expose()
  start_time: Date;

  @IsNotEmpty()
  @IsDate()
  @Expose()
  end_time: Date;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  total_price: number;

  @IsNotEmpty()
  @Expose()
  services: Service[];
}
