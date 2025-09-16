import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface ValidationErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    this.logger.error(`Exception caught: ${JSON.stringify(exception)}`);

    // Handle non-HTTP exceptions
    if (!(exception instanceof HttpException)) {
      this.logger.error(`Unhandled exception: ${exception}`, exception instanceof Error ? exception.stack : undefined);

      const errorResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: 'Internal server error',
        errors: ['Internal Server Error'],
      };

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ValidationErrorResponse | string;

    const message =
      typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse.message || exception.message;

    const error = typeof exceptionResponse === 'string' ? exception.name : exceptionResponse.error || exception.name;

    // Special handling for validation errors
    const isValidationError = exception instanceof BadRequestException && Array.isArray(message);
    const finalMessage = isValidationError ? 'Validation error' : message;
    const finalErrors = isValidationError ? message : [error];

    this.logger.error(`HTTP Exception: [${request.method}] ${request.url} - (${status}) - ${JSON.stringify(message)}`);

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: finalMessage,
      errors: finalErrors,
    };

    response.status(status).json(errorResponse);
  }
}
