import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(data: object): string {
    return `User info: ${JSON.stringify(data)}`;
  }
}
