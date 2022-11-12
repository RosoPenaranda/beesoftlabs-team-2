import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
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

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  total_price?: number;
}
