import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CustomException } from 'src/exceptions/custom.exception';
import { RpcError } from 'src/types';

@Catch() // Catch all exceptions
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(`Exception caught: ${exception}`);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Handle CustomException specifically
    if (exception instanceof CustomException) {
      const { status, message } = exception.getError() as RpcError;
      response.status(status).json({ status, message });
      return;
    }

    // Handle other RPC exceptions
    if (exception instanceof RpcException) {
      const rpcError = exception.getError();
      response.status(400).json({
        status: 400,
        message: rpcError,
      });
      return;
    }

    // Handle HTTP exceptions (including class-validator errors)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      response.status(status).json({
        status,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : exceptionResponse['message'] || 'An error occurred',
      });
      return;
    }

    // Handle any other unhandled exceptions
    response.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}
