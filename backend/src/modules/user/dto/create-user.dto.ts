import { IsString, IsEmail, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsBoolean({ message: 'isAdmin must be a boolean value' })
  @IsOptional()
  isAdmin?: boolean;
}
