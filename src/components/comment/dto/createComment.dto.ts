import { Expose } from 'class-transformer';
import {
  Min,
  Max,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateCommentDto {
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
