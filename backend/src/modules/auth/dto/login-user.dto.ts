import { IsString, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  password: string;
}
