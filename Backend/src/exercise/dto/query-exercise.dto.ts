import { Role } from 'src/user/entities/user.enum';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class QueryUserDto {
  @IsString()
  @IsOptional()
  role?: Role;
}
