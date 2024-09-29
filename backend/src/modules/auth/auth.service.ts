import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Register user with hashed password (implementation remains the same)
  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.createUser({
      name,
      email,
      password: hashedPassword,
    });
  }

  // Validate user login
  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Exclude password from the result
      return result;
    }
    return null;
  }

  // Login and return JWT token and user data (without password)
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    // Return token and user data (excluding password)
    user.access_token = this.jwtService.sign(payload);
    
    return user;
  }
}
