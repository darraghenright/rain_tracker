import { Test, TestingModule } from '@nestjs/testing';
import { RainReportService } from './rain-report.service';
import { PrismaClient } from '@prisma/client';

describe('RainReportService', () => {
  let prisma: PrismaClient;
  let rainReportService: RainReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RainReportService],
    }).compile();

    prisma = new PrismaClient();
    rainReportService = module.get<RainReportService>(RainReportService);
  });

  describe('RainReportService', () => {
    it('should return a list of rain reports', async () => {
      // clear any existing rain reports
      await prisma.rainReport.deleteMany();

      // insert test fixtures
      const insertMidnight = {
        rain: true,
        timestamp: new Date('2024-12-04T00:00:00Z'),
      };

      const insertMidday = {
        rain: false,
        timestamp: new Date('2024-12-04T12:00:00Z'),
      };

      await prisma.rainReport.createMany({
        data: [insertMidnight, insertMidday],
      });

      // fetch all rain reports
      const [recordMidnight, recordMidday] = await rainReportService.all();

      // assert expectations
      expect(recordMidnight.rain).toBe(insertMidnight.rain);
      expect(recordMidday.rain).toBe(insertMidday.rain);
      expect(recordMidnight.timestamp).toStrictEqual(insertMidnight.timestamp);
      expect(recordMidday.timestamp).toStrictEqual(insertMidday.timestamp);
    });
  });
});
