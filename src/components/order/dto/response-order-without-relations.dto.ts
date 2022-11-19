import { ApiProperty } from '@nestjs/swagger';

export class ResponseOrderWithoutRelationsDto {
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
}
