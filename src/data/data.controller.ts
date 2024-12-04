import { Controller, Get } from '@nestjs/common';

@Controller('data')
export class DataController {
  @Get()
  list() {
    return null;
  }
}
