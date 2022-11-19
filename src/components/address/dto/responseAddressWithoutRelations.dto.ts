import { ApiProperty } from '@nestjs/swagger';

export class ResponseAddressWithoutRelationsDto {
  @ApiProperty({ required: true, description: "Address's ID" })
  id: string;

  @ApiProperty({ required: true, description: 'State where the user lives' })
  state: string;

  @ApiProperty({ required: true, description: 'City where the user lives' })
  city: string;

  @ApiProperty({ required: true, description: 'Current address of the user' })
  address: string;

  @ApiProperty({ required: false, description: 'Additional information' })
  remark?: string;

  @ApiProperty({ required: false })
  longitude?: string;

  @ApiProperty({ required: false })
  latitude?: string;

  @ApiProperty({ required: false })
  postal_code?: string;

  @ApiProperty({
    required: true,
    description: 'Date of creation of the address',
  })
  created_at: Date;
}
