import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Hello World!',
      date: new Date(),
      version: '1.0.0',
      environment: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
      port: process.env.PORT ? Number(process.env.PORT) : 3000,
    };
  }
}
