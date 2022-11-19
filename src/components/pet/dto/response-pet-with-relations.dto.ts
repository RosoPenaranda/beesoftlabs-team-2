import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserWithoutRelationsDto } from 'src/components/user/dto/response-user-without-relations.dto';
import { PetSize } from 'src/utils/enums';

export class ResponsePetWithRelationsDto {
  @ApiProperty({ required: true, description: 'Pet"s ID' })
  id: string;

  @ApiProperty({ required: true, description: 'Pet"s name' })
  name: string;

  @ApiProperty({ required: true, description: 'Pet" species' })
  species: string;

  @ApiProperty({ required: false, description: 'Pet"s profile picture URL' })
  profile_picture?: string;

  @ApiProperty({ required: true, description: 'Pet"s age' })
  age: number;

  @ApiProperty({ required: true, description: 'Pet"s weight' })
  weight: number;

  created_at: Date;

  @ApiProperty({ required: true, description: 'Pet" size', enum: PetSize })
  size: PetSize;

  @ApiProperty({
    required: true,
    description: 'User Orders',
    type: ResponseUserWithoutRelationsDto,
  })
  owner: ResponseUserWithoutRelationsDto;
}
