/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): string {
    const user = request['user'] || { name: 'Anon' };
    const name = user?.name || null;
    const roles = user?.roles || null;
    return this.appService.getHello(`Name: ${name}, roles: ${roles}`);
  }
}
