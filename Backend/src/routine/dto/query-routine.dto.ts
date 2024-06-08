import { IsString, IsOptional } from 'class-validator';

export class QueryRoutineDto {
  @IsString()
  @IsOptional()
  category_id?: string;
}
