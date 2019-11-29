import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Request,
  Put,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './interface/user..interface';

@ApiUseTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getCurrentUser(): User {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findAUser(id);
  }


  @Post('/find-user')
  async findUser(@Body() user: CreateUserDto) {
    const userObject = await this.userService.findAUserByEmail(user.email);
    if (userObject) {
      return userObject;
    } else {
      throw new NotFoundException();
    }
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
