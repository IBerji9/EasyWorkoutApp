import { Role } from 'src/user/entities/user.enum';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class QueryUserDto {
  @IsString()
  @IsOptional()
  role?: Role;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ obj, key }) => obj[key] === 'true')
  is_deleted?: boolean;

  @IsArray()
  @IsOptional()
  user_ids?: number[];

  @IsString()
  @IsOptional()
  name?: Role;
}

export type QueryUser = {
  where: {
    role?: Role;
    is_active?: boolean;
    is_deleted?: boolean;
    id?: number[];
    first_name?: any;
    last_name?: any;
  };
};
