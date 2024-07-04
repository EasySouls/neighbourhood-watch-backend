import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CivilGuardsModule } from './civil-guards/civil-guards.module';
import { PrismaModule } from 'nestjs-prisma';
import { DepartmentsModule } from './departments/departments.module';
import { DutiesModule } from './duties/duties.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    CivilGuardsModule,
    DepartmentsModule,
    DutiesModule,
    AuthModule,
    AccountsModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
