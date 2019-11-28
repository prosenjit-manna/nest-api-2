import { Controller, Post, Body, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async findUser(@Body() user: LoginDto) {
    const userObject = await this.userService.findAUserByEmail(user.email);
    if (userObject) {
      const data: LoginDto = userObject.toJSON();
      if (data.password === user.password) {
        return userObject;
      } else {
        throw new ForbiddenException();
      }
    } else {
      throw new NotFoundException();
    }
  }

}
