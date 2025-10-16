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
  async getData(@Req() request: Request): Promise<AuthDataResponse> {
    const user = (request?.['user'] || {}) as {
      name?: string;
      email?: string;
      roles?: string[];
    };

    const url = await this.appService.uploadRandomFile();

    return {
      name: user?.name,
      email: user?.email,
      roles: user?.roles,
      secureData: 'new URL:' + url,
    };
  }
}
