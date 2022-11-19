import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/utils/enums';

export class ResponseUserWithoutRelationsDto {
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
}
