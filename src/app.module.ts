import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CivilGuardsModule } from './civil-guards/civil-guards.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), CivilGuardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
