import { HttpException, HttpStatus } from '@nestjs/common';

export class DisabledException extends HttpException {
  constructor({ message }: { message?: string } = {}) {
    super(message || 'Resource is not available', HttpStatus.FORBIDDEN);
  }
}
