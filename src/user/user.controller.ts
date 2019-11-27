import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './interface/user..interface';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Get()
  getCurrentUser(): User {
    return null;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findAUser(id);
  }

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Put()
  async update(@Body() user: UserDto) {
    return this.userService.editUser(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

}
