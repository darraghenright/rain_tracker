import { Test, TestingModule } from '@nestjs/testing';
import { RainReportController } from './rain-report.controller';
import { RainReportService } from './rain-report.service';
import { PrismaClient } from '@prisma/client';

describe('RainReportController', () => {
  let controller: RainReportController;
  let database: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RainReportController],
      providers: [RainReportService],
    }).compile();

    controller = module.get<RainReportController>(RainReportController);
    database = new PrismaClient();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(database).toBeDefined();
  });
});
