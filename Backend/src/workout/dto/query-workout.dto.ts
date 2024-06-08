import { IsString, IsOptional } from 'class-validator';

export class QueryWorkoutDto {
  @IsString()
  @IsOptional()
  routine_id?: string;
}
