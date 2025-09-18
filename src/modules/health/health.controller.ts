import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TestErrorDto } from './dto';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @MessagePattern('health.check')
  checkHealth() {
    return this.healthService.checkHealth();
  }

  @MessagePattern('health.error')
  throwError() {
    throw new Error('This is a test error');
  }

  @MessagePattern('health.error.validation')
  throwValidationError(@Payload() Payload: TestErrorDto) {
    return Payload;
  }
}
