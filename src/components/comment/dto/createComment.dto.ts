import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  Min,
  Max,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Points given by the user',
    required: true,
    minimum: 0,
    maximum: 5,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(0)
  @Max(5)
  @Expose()
  points: number;

  @ApiProperty({
    description: 'Comment content',
    required: true,
    minLength: 3,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  comment: string;
}
