import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';

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
