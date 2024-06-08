import { User } from 'src/user/entities/user.entity';

export class SigninEntity extends User {
  token: string;

  constructor(partial: Partial<SigninEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
