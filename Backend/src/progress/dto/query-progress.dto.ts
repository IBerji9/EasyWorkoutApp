import { IsString, IsOptional } from 'class-validator';

export class QueryProgressDto {
  @IsString()
  @IsOptional()
  user_id?: string;
}
