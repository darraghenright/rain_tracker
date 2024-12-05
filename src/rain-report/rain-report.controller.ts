import { Controller, Get } from '@nestjs/common';
import { RainReportService } from './rain-report.service';

@Controller('data')
export class RainReportController {
  constructor(private readonly rainReportService: RainReportService) {}

  @Get()
  async index() {
    return await this.rainReportService.all();
  }
}
