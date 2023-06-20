import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  async findAll(): Promise<string[]> {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        resolve('Ok');
      }, 2000);
    });
  }
}
