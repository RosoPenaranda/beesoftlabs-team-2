import { Expose } from 'class-transformer';
import {
  Min,
  Max,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCommentDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  @Expose()
  points: number;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  comment: string;
}
