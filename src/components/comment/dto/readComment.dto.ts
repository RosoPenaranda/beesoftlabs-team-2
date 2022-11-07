import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../../../database/entities/user.entity';

export class ReadCommentDto {
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

  @IsNotEmpty()
  @Expose()
  author: User;
}
