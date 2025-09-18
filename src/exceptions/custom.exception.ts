import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class CustomException extends RpcException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super({ message, status });
  }
}
