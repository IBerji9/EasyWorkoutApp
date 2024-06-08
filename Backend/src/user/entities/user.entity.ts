import { Exclude } from 'class-transformer';
import { Role } from 'src/user/entities/user.enum';

export class User {
  id: string;
  name: string;
  email: string;
  language: string;
  unit: string;

  @Exclude()
  password: string;

  role: Role;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
