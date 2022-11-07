import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from '../../../database/entities/user.entity';
import { Service } from '../../../database/entities/service.entity';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsDate()
  @Expose()
  start_time: Date | null;

  @IsNotEmpty()
  @IsDate()
  @Expose()
  end_time: Date | null;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  total_price: number;

  @IsNotEmpty()
  @Expose()
  services: Service[];

}
