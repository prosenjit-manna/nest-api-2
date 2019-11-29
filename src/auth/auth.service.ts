import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { User } from '../user/interface/user..interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userModel = await this.usersService.findAUserByEmail(username);
    let user: User;
    if (!userModel) {
      return null;
    }

    user = userModel.toJSON();
    const isMatched = await bcrypt.compare(pass, user.password);
    if (isMatched) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
