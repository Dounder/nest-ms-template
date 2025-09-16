import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  checkHealth() {
    this.logger.debug('Checking health...');
    return { status: 'healthy' };
  }
}
