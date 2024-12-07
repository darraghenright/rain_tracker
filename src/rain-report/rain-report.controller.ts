import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, AUTH_HEADER } from '../auth/auth.guard';
import { CreateRainReportDto } from './dto/create-rain-report.dto/create-rain-report.dto';
import { RainReportService } from './rain-report.service';

@Controller('data')
@UseGuards(AuthGuard)
export class RainReportController {
  constructor(private readonly rainReportService: RainReportService) {}

  @Get()
  async index(@Headers(AUTH_HEADER) userId: string) {
    console.log(userId);
    return { data: await this.rainReportService.all() };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() { rain: isRaining }: CreateRainReportDto,
    @Headers(AUTH_HEADER) userId: string,
  ) {
    return { data: await this.rainReportService.create(isRaining, userId) };
  }
}
