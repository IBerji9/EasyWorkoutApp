import { Role } from 'src/user/entities/user.enum';
import { IsNumber, IsOptional } from 'class-validator';

export class Paging {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}

export type TokenPayload = {
  email: string;
  role: Role;
  id: string;
};

export type Message = {
  userId: number;
  name: string;
  content: string;
  media: string;
  note: string;
};
