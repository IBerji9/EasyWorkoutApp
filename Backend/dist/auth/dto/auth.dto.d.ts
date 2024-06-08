import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class SigninDto {
    readonly email: string;
    readonly password: string;
}
export declare class SignupDto extends CreateUserDto {
    confirm_password: string;
    password: string;
}
export declare class ForgotPasswordDto {
    readonly email: string;
}
export declare class ChangePasswordDto {
    readonly current_password: string;
    readonly new_password: string;
    readonly confirm_password: string;
}
export declare class UpdateProfileDto {
    name?: string;
    email?: string;
    language?: string;
}
