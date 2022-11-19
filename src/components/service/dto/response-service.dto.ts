import { ApiProperty } from '@nestjs/swagger';
import { TypeOfService } from 'src/utils/enums';

export class ResponseServiceDto {
  id: string;

  @ApiProperty({
    required: true,
    description: 'Type of service',
    enum: TypeOfService,
  })
  service: TypeOfService;

  @ApiProperty({ required: true, description: 'Service name' })
  name: string;

  @ApiProperty({ required: true, description: 'Service description' })
  description: string;

  @ApiProperty({ required: true, description: 'Service price' })
  price: number;

  @ApiProperty({ required: true, description: 'Service URL image' })
  image_url: string;

  @ApiProperty({ required: true, description: 'Service image"s alt' })
  image_alt: string;
}
