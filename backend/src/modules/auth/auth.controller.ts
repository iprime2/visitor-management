import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { Public } from 'src/utils/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto); // Pass the entire DTO to the service
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.authService.validateUser(loginUserDto); // Pass the entire DTO to the service
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    // If user is valid, return the JWT token and user data
    const data = await this.authService.login(user);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: data,
    });
  }
}
