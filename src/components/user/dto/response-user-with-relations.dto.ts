import { ApiProperty } from '@nestjs/swagger';
import { ResponseAddressWithoutRelationsDto } from 'src/components/address/dto/responseAddressWithoutRelations.dto';
import { ResponseCommentWithoutRelationsDto } from 'src/components/comment/dto/response-comment-without-relations.dto';
import { ResponseOrderWithoutRelationsDto } from 'src/components/order/dto/response-order-without-relations.dto';
import { ResponsePetWithoutRelationsDto } from 'src/components/pet/dto/response-pet-without-relations.dto';
import { UserRole } from 'src/utils/enums';

export class ResponseUserWithRelationsDto {
  @ApiProperty({ required: true, description: 'User ID' })
  id: string;

  @ApiProperty({ required: true, description: 'User email' })
  email: string;

  @ApiProperty({ required: true, description: 'User name' })
  name: string;

  @ApiProperty({ required: true, description: 'User register date' })
  created_at: Date;

  @ApiProperty({ required: false, description: 'User profile picture URL' })
  profile_picture?: string;

  @ApiProperty({ required: false, description: 'User"s phone number' })
  phone?: string;

  @ApiProperty({ required: true, description: 'User Role', enum: UserRole })
  roles: UserRole;

  @ApiProperty({
    required: true,
    description: 'User Addresses',
    type: [ResponseAddressWithoutRelationsDto],
  })
  addresses: ResponseAddressWithoutRelationsDto;

  @ApiProperty({
    required: true,
    description: 'User pets',
    type: [ResponsePetWithoutRelationsDto],
  })
  pets: ResponsePetWithoutRelationsDto;

  @ApiProperty({
    required: true,
    description: 'User Orders',
    type: [ResponseOrderWithoutRelationsDto],
  })
  orders: ResponseOrderWithoutRelationsDto;

  @ApiProperty({
    required: true,
    description: 'User Comments',
    type: [ResponseCommentWithoutRelationsDto],
  })
  comments: ResponseCommentWithoutRelationsDto;
}
