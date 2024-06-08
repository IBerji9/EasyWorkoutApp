import { IsString, IsOptional } from 'class-validator';
import { Type } from '../entities/category.enum';

export class QueryCategoryDto {
  @IsString()
  @IsOptional()
  type?: Type;

  @IsString()
  @IsOptional()
  user_id?: string;
}
