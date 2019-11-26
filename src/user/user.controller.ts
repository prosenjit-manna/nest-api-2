import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDto } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  @Get()
  getOneUser(): string {
    return `Return single user`;
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
