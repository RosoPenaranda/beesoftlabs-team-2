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
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
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
