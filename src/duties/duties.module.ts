import { Module } from '@nestjs/common';
import { DutiesService } from './duties.service';
import { DutiesController } from './duties.controller';

@Module({
  controllers: [DutiesController],
  providers: [DutiesService],
})
export class DutiesModule {}
