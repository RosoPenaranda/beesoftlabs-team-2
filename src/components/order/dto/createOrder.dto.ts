import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  @Expose()
  start_time?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  @Expose()
  end_time?: Date;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  total_price: number;
}
