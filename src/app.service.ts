import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(data: object): string {
    return `Hello, passed info: ${JSON.stringify(data)}`;
  }
}
