import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(data: string): string {
    return `User info: ${data}`;
  }
}
