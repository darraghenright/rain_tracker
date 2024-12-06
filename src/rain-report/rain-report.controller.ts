import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
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
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() { rain: isRaining }: CreateRainReportDto) {
    return await this.rainReportService.create(isRaining);
  }
}
