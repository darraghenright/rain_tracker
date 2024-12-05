import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Controller()
export class AppController {
  /**
   * Placeholder root API endpoint.
   * Throws `501 Not Implemented` error.
   */
  @Get()
  @HttpCode(501)
  index() {
    throw new HttpException('Not Implemented', HttpStatus.NOT_IMPLEMENTED);
  }
}
