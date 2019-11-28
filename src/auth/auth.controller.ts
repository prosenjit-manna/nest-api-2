import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() user: LoginDto) {
    return {
      success: true,
    };
  }

}
