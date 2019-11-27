import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleWare } from './middleware/loggger.middleware';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://admin:admin123@ds349618.mlab.com:49618/nest-api', {useNewUrlParser: true})
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .forRoutes('*')
  }
}
