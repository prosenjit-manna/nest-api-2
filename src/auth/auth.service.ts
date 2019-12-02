import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user/interface/user..interface';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  currentUser: string;

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userModel = await this.findAUserByEmail(username);
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

  async getToken(user: any) {
    const payload = { username: user.email };
    return {
      user: await this.getCurrentUser(user.email),
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUser);
    return await createdUser.save();
  }

  async findAUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({email}).exec();
  }

  async getCurrentUser(email: string) {
   const user =  await this.findAUserByEmail(email);
   const userData = user.toJSON();
   delete userData.password;

   return userData;
  }
}
