import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  Min,
  Max,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Points given by the user',
    required: false,
    minimum: 0,
    maximum: 5,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(0)
  @Max(5)
  @Expose()
  points?: number;

  @ApiProperty({
    description: 'Comment content',
    required: false,
    minLength: 3,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  comment?: string;
}
