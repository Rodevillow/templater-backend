import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async findAll(): Promise<string> {
    console.log('MAIN CONTROLLER /');
    return new Promise((resolve) => resolve('Test text response'));
  }
}
