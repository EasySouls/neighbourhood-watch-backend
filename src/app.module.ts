import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CivilGuardsModule } from './civil-guards/civil-guards.module';
import { PrismaModule } from 'nestjs-prisma';
import { DepartmentsModule } from './departments/departments.module';
import { DutiesModule } from './duties/duties.module';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), CivilGuardsModule, DepartmentsModule, DutiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
