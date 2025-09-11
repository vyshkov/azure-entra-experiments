import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { EasyAuthMiddleware } from './auth/easy-auth.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  // // consumer.apply(EasyAuthMiddleware).forRoutes('*');
  // }
}
