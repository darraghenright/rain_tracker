import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataController } from './data/data.controller';
import { RainReportService } from './rain-report/rain-report.service';

@Module({
  imports: [],
  controllers: [AppController, DataController],
  providers: [AppService, RainReportService],
})
export class AppModule {}
