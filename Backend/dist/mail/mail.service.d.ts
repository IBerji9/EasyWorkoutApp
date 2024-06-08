import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendForgotPassword(email: string, fullname: string, password: string): Promise<void>;
}
