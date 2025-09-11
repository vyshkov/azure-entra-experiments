import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

type AuthDataResponse = {
  name?: string;
  email?: string;
  roles?: string[];
  secureData?: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('azure-ad'))
  @Get()
  getData(@Req() request: Request): AuthDataResponse {
    console.log('Request');
    const user = (request?.['user'] || {}) as {
      name?: string;
      email?: string;
      roles?: string[];
    };
    return {
      name: user?.name,
      email: user?.email,
      roles: user?.roles,
      secureData: 'hello, this is secure: ' + new Date().toDateString(),
    };
  }
}
