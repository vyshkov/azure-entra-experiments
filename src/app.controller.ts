/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('azure-ad'))
  @Get()
  getHello(@Req() request: Request): { data: string; userInfo: any } {
    // const user = request['user'] || { name: 'Anon' };
    // const name = user?.name || null;
    // const roles = user?.roles || null;
    // return this.appService.getHello(
    //   `Name: ${name}, roles: ${roles}, decoded: ${user.decoded}`,
    // );
    console.log(request);
    return { data: 'Hello World', userInfo: request };
  }
}
