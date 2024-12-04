import { Module } from '@nestjs/common';
import { RainReportController } from './rain-report.controller';
import { RainReportService } from './rain-report.service';

@Module({
  controllers: [RainReportController],
  providers: [RainReportService],
})
export class RainReportModule {}
