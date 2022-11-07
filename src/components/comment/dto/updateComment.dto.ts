import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  @MinLength(3)
  @MaxLength(200)
  @Expose()
  points: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  comment: string;
}
