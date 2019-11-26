import { Injectable } from '@nestjs/common';
import { User } from './interface/user..interface';

@Injectable()
export class UserService {

  getCurrentUser(): User {
    return  {
      id: 1,
      email: 'prosenjit@itobuz.com',
    };
  }
}
