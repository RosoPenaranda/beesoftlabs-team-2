import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class ReadUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(18)
  @Expose()
  age: number;
}
