import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommentWithoutRelationsDto {
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
}
