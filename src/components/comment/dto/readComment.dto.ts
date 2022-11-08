import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ReadCommentDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Expose()
  points: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  comment: string;
}
