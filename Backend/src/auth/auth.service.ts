import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { message } from 'src/config';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import { SigninEntity } from './entities/signin.entity';
import { Role } from 'src/user/entities/user.enum';
import { generate } from 'generate-password';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signIn(email: string, password: string): Promise<SigninEntity> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user || !user.password) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const payload = {
        email: user.email,
        role: Role.USER,
        id: user.id,
      };

      return new SigninEntity({
        ...user,
        token: await this.jwtService.signAsync(payload),
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const password = generate({
      length: 10,
      numbers: true,
    });

    await this.userService.update(user.id, { password });

    await this.mailService.sendForgotPassword(user.email, user.name, password);

    return message.send_email;
  }
}
