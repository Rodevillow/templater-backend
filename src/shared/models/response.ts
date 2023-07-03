export class ResponseModel<T> {
  data: T;
  status: number;
  meta?: any;

  constructor(data: T, status?: number, meta?: any) {
    this.data = data;
    this.meta = meta;
    this.status = status;
  }
}
