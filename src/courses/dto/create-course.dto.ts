import {
  IsIn,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import type { DifficultyLevel } from '../entities/course.entity';

export class CreateCourseDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsNumber()
  @IsPositive()
  durationHours!: number;

  @IsString()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  difficultyLevel!: DifficultyLevel;

  @IsString()
  @MinLength(2)
  instructor!: string;
}
