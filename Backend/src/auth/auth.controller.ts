import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
  Request,
  Put,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import {
  SigninDto,
  ForgotPasswordDto,
  SignupDto,
  ChangePasswordDto,
  UpdateProfileDto,
} from './dto/auth.dto';
import { Public } from './auth.decorator';
import { UserService } from '../user/user.service';
import { ResponseInterceptor } from '../response/response.interceptor';
import { TokenPayload } from 'src/types';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() payload: SigninDto) {
    const data = await this.authService.signIn(payload.email, payload.password);

    return {
      data,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPassword(@Body() payload: ForgotPasswordDto) {
    const message = await this.authService.forgotPassword(payload.email);
    return {
      message,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() payload: SignupDto) {
    if (payload.password !== payload.confirm_password) {
      throw new BadRequestException(
        'Confirm password should match with Password',
      );
    }

    const password = payload.password;

    await this.userService.create({ ...payload, unit: 'kg', language: 'es' });

    const data = await this.authService.signIn(payload.email, password);
    return {
      data,
    };
  }

  @Put('change-password')
  async changePassword(
    @Body() payload: ChangePasswordDto,
    @Request() request: { user: TokenPayload },
  ) {
    const user = await this.userService.findByEmail(request.user.email);

    if (!user) {
      throw new BadRequestException('Cannot find this user.');
    }

    if (user.password || payload.current_password) {
      const isMatch = await bcrypt.compare(
        payload.current_password,
        user.password,
      );
      if (!isMatch) {
        return new BadRequestException('Your current password is not correct.');
      }
    }

    const data = await this.userService.update(user.id, {
      password: payload.new_password,
    });

    return {
      data,
    };
  }

  @Put('profile')
  async updateProfile(
    @Body() payload: UpdateProfileDto,
    @Request() request: { user: TokenPayload },
  ) {
    const data = await this.userService.update(request.user.id, payload);

    return {
      data,
    };
  }
}
