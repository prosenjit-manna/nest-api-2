import { Controller, Post, Body, Request, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('/sign-up')
  async signUp(@Body() user: CreateUserDto) {
    const userPayload = {
      ...user,
      password: await bcrypt.hash(user.password, 12),
    };
    return this.authService.createUser(userPayload);
  }

}
