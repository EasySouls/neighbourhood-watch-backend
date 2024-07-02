import { Module } from '@nestjs/common';
import { CivilGuardsService } from './civil-guards.service';
import { CivilGuardsController } from './civil-guards.controller';

@Module({
  controllers: [CivilGuardsController],
  providers: [CivilGuardsService],
  exports: [CivilGuardsService],
})
export class CivilGuardsModule {}
