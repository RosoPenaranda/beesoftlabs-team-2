import { ApiProperty } from '@nestjs/swagger';
import { ResponseServiceDto } from 'src/components/service/dto/response-service.dto';
import { ResponseUserWithoutRelationsDto } from 'src/components/user/dto/response-user-without-relations.dto';

export class ResponseOrderWithRelationsDto {
  @ApiProperty({ required: true, description: 'Order ID' })
  id: string;

  @ApiProperty({
    required: false,
    description: 'Start time of the provided services',
  })
  start_time?: string;

  @ApiProperty({
    required: false,
    description: 'Finish time of the provided services',
  })
  end_time?: string;

  @ApiProperty({ required: true, description: 'Order creation time' })
  created_at: Date;

  @ApiProperty({
    required: true,
    description: 'Total price of the provided services',
  })
  total_price: number;

  @ApiProperty({
    required: true,
    description: 'User Addresses',
    type: [ResponseServiceDto],
  })
  services: ResponseServiceDto;

  customer: ResponseUserWithoutRelationsDto;
}
