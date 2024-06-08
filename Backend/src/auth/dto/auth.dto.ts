import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export class SigninDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class SignupDto extends CreateUserDto {
  @IsNotEmpty()
  confirm_password: string;

  @IsNotEmpty()
  password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  readonly email: string;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  readonly current_password: string;

  @IsNotEmpty()
  readonly new_password: string;

  @IsNotEmpty()
  readonly confirm_password: string;
}

export class UpdateProfileDto {
  name?: string;
  email?: string;
  language?: string;
}
