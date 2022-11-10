import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Service } from '../../../database/entities/service.entity';

export class UpdateOrderDto {
  @IsOptional()
  @IsDate()
  @Expose()
  start_time: Date;

  @IsOptional()
  @IsDate()
  @Expose()
  end_time: Date;

  @IsOptional()
  @IsNumber()
  @Expose()
  total_price: number;

  @IsOptional()
  @Expose()
  services: Service[];
}
