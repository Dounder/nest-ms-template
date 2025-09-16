import { Module } from '@nestjs/common';
import { HealthModule } from './modules';

@Module({
  imports: [HealthModule],
})
export class AppModule {}
