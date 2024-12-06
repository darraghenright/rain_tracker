import { Body, Controller, Get, Post } from '@nestjs/common';
import { RainReportService } from './rain-report.service';
import { CreateRainReportDto } from './dto/create-rain-report.dto/create-rain-report.dto';

@Controller('data')
export class RainReportController {
  constructor(private readonly rainReportService: RainReportService) {}

  @Get()
  async index() {
    return await this.rainReportService.all();
  }

  @Post()
  async create(@Body() { rain: isRaining }: CreateRainReportDto) {
    return await this.rainReportService.create(isRaining);
  }
}
