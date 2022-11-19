import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserWithoutRelationsDto } from 'src/components/user/dto/response-user-without-relations.dto';

export class ResponseCommentWithRelationsDto {
  @ApiProperty({ required: true, description: 'Comment ID' })
  id: string;

  @ApiProperty({ required: true, description: 'Comment creation date' })
  created_at: Date;

  @ApiProperty({ required: true, description: 'Comment last update date' })
  last_updated_at: Date;

  @ApiProperty({ required: true, description: 'Points given by the user' })
  points: number;

  @ApiProperty({ required: true, description: 'Comment message' })
  comment: string;

  @ApiProperty({ required: true, description: 'Authorof the comment' })
  author: ResponseUserWithoutRelationsDto;
}
