import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() user: LoginDto) {
    return {
      success: true,
    };
  }

  @Post('/sign-up')
  async signUp(@Body() user: CreateUserDto) {
    const userPayload = {
      ...user,
      password: await bcrypt.hash(user.password, 12),
    };
    return this.userService.createUser(userPayload);
  }

}
