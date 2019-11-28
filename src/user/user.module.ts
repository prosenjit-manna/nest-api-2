import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

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
  ],
  exports: [
    UserDbModule,
    UserService,
  ],
})
export class UserModule {}
