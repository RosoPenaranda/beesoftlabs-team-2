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
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(0)
  @Max(5)
  @Expose()
  points?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  @Expose()
  comment?: string;
}
