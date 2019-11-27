import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './interface/user..interface';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUser);
    return await createdUser.save();
  }

  async editUser(editUser: EditUserDto): Promise<User> {
    const editUserDoc = new this.userModel(editUser);
    return await editUserDoc.updateOne(editUser);
  }

  async findAUser(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async deleteUser(id: string) {
    return await this.userModel.remove({_id: id});
  }
}
