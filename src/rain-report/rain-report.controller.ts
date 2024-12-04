import { Controller, Get } from '@nestjs/common';

@Controller('data')
export class RainReportController {
  @Get()
  async index() {
    return null;
  }
}
