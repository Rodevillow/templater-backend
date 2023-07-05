import { ApiProperty } from '@nestjs/swagger';

export class ResponseModel<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  status: number;

  @ApiProperty()
  meta?: any;

  constructor(data: T, status?: number, meta?: any) {
    this.data = data;
    this.meta = meta;
    this.status = status;
  }
}
