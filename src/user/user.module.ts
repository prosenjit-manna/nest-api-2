import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schema/user.schema';
import { AuthModule } from '../auth/auth.module';

const UserDbModule =  MongooseModule.forFeature([
  { name: 'User', schema: UserSchema },
]);

@Module({
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
  imports: [
    UserDbModule,
    AuthModule,
  ],
  exports: [
    UserDbModule,
    UserService,
  ],
})
export class UserModule {}
