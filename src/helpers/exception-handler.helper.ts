import { InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';

import { DisabledException } from './disabled.exception';

export class ExceptionHandler {
  static logError(logger: Logger, error: Error | unknown): string {
    if (error instanceof UnauthorizedException) {
      logger.error(error.message, error.stack);
      return 'Unauthorized access';
    }

    if (error instanceof DisabledException) {
      logger.error(`Resource disabled: ${error.message}`, error.stack);
      return 'Resource not found';
    }

    if (error instanceof InternalServerErrorException) {
      logger.error(error.message, error.stack);
      return 'Internal server error, please try again later';
    }

    if (error instanceof Error) {
      logger.error(error.message, error.stack);
      return error.message;
    }

    // Handle other types of errors
    logger.error('An unexpected error occurred', error);
    return 'An unexpected error occurred';
  }

  static handleMongooseError(logger: Logger, error: Error): string {
    if (error.message.includes('E11000 duplicate key error')) {
      logger.error(`Duplicate key error: ${error.message}`);
      const match = error.message.match(/dup key: { (.+) }/);
      const keyValue = match ? match[1] : 'unknown';
      return `Duplicate ${keyValue}`;
    }

    logger.error(`MongoDB error: ${error.message}`);
    return `Database error: ${error.message}, name ${error.name}`;
  }
}
