import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsDate()
  @Expose()
  start_time: Date;

  @IsOptional()
  @IsDate()
  @Expose()
  end_time: Date;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  total_price: number;
}
