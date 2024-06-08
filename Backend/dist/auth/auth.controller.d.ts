import { BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, ForgotPasswordDto, SignupDto, ChangePasswordDto, UpdateProfileDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { TokenPayload } from 'src/types';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    signIn(payload: SigninDto): Promise<{
        data: import("./entities/signin.entity").SigninEntity;
    }>;
    forgotPassword(payload: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    signup(payload: SignupDto): Promise<{
        data: import("./entities/signin.entity").SigninEntity;
    }>;
    changePassword(payload: ChangePasswordDto, request: {
        user: TokenPayload;
    }): Promise<BadRequestException | {
        data: string;
    }>;
    updateProfile(payload: UpdateProfileDto, request: {
        user: TokenPayload;
    }): Promise<{
        data: string;
    }>;
}
