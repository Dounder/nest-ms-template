import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestErrorDto } from './dto';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth() {
    return this.healthService.checkHealth();
  }

  @Get('error')
  throwError() {
    throw new Error('This is a test error');
  }

  @Post('error/validation')
  throwValidationError(@Body() body: TestErrorDto) {
    return body;
  }
}
