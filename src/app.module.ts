import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CivilGuardsModule } from './civil-guards/civil-guards.module';

@Module({
  imports: [CivilGuardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
