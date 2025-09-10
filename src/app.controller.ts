/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): string {
    const user = request['user'] || { name: 'Anon' };

    return this.appService.getHello({ user });
  }
}
