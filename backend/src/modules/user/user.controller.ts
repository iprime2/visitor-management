import { Controller, Get, Post, Delete, Param, Body, UseGuards, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from '../auth/get-user.decorator'; 
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@GetUser() user: any) {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userById = await this.userService.getUserById(id);
    return userById;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
