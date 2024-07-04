import { Module } from '@nestjs/common';
import { DutiesService } from './duties.service';
import { DutiesController } from './duties.controller';
import { CivilGuardsModule } from 'src/civil-guards/civil-guards.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [CivilGuardsModule, CaslModule],
  controllers: [DutiesController],
  providers: [DutiesService],
  exports: [DutiesService],
})
export class DutiesModule {}
