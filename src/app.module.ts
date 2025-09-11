import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
//import { EasyAuthMiddleware } from './auth/easy-auth.middleware';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'azure-ad' })],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  // // consumer.apply(EasyAuthMiddleware).forRoutes('*');
  // }
}
