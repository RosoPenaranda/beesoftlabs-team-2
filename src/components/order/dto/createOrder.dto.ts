import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Service } from "../../../database/entities/service.entity";

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

  @IsNotEmpty()
  @Expose()
  services: Service[];
}
