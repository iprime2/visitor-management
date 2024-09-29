import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Fetch all users
  async getUsers() {
    return this.prisma.user.findMany();
  }

  // Fetch a user by ID
  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  // Create a new user with hashed password
  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password, isAdmin } = createUserDto;

    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user in the database
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin ? true : false,
      },
    });
  }

  // Update a user
  async updateUser(id: string, updateUserDto: CreateUserDto) {
    const { name, email, password, isAdmin } = updateUserDto;

    // Hash the password if provided
    let hashedPassword;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    // Update the user
    return this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword ? hashedPassword : undefined, // Only update password if it's provided
        isAdmin: isAdmin !== undefined ? isAdmin : undefined,
      },
    });
  }

  // Delete a user
  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Find user by email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
