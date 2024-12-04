import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RainReportModule } from './rain-report/rain-report.module';

@Module({
  imports: [RainReportModule],
  controllers: [AppController],
})
export class AppModule {}
