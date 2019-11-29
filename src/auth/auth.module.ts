import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from './auth-constants';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy  } from './jwt.strategy';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [ AuthController ],
  exports: [AuthService, JwtStrategy, JwtStrategy],
})
export class AuthModule {}
