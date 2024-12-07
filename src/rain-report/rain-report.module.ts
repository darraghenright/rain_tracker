import { Module } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { DatabaseService } from './database.service';
import { RainReportController } from './rain-report.controller';
import { RainReportService } from './rain-report.service';

@Module({
  controllers: [RainReportController],
  providers: [AuthGuard, DatabaseService, RainReportService],
})
export class RainReportModule {}
