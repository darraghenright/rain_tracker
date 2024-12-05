import { Module } from '@nestjs/common';
import { RainReportController } from './rain-report.controller';
import { RainReportService } from './rain-report.service';
import { DatabaseService } from './database.service';

@Module({
  controllers: [RainReportController],
  providers: [DatabaseService, RainReportService],
})
export class RainReportModule {}
