import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import { SigninEntity } from './entities/signin.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    private mailService;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailService);
    signIn(email: string, password: string): Promise<SigninEntity>;
    forgotPassword(email: string): Promise<string>;
}
