import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
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
    return this.userService.getCurrentUser();
  }

  @Get(':id')
  findOne(@Param() params): string {
    return `Other user details by id #${params.id}`;
  }

  @Post()
  create(@Body() createUser: CreateUserDto ): string {
    return `User created`;
  }

  @Put()
  update(@Body() user: UserDto ): string {
    return `User updated`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Delete a user #${id}`;
  }

}
