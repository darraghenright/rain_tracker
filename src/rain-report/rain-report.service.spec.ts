import { Test, TestingModule } from '@nestjs/testing';
import { RainReportService } from './rain-report.service';
import { PrismaClient } from '@prisma/client';

describe('RainReportService', () => {
  let database: PrismaClient;
  let rainReportService: RainReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RainReportService],
    }).compile();

    database = new PrismaClient();
    rainReportService = module.get<RainReportService>(RainReportService);
  });

  describe('RainReportService', () => {
    it('should return a list of rain reports', async () => {
      // clear any existing rain reports
      await database.rainReport.deleteMany();

      // assert that there are no records
      const records = await rainReportService.all();
      expect(records).toStrictEqual([]);

      // insert test fixtures
      const reportMidnight = {
        rain: true,
        timestamp: new Date('2024-12-04T00:00:00Z'),
      };

      const reportMidday = {
        rain: false,
        timestamp: new Date('2024-12-04T12:00:00Z'),
      };

      await database.rainReport.createMany({
        data: [reportMidnight, reportMidday],
      });

      // fetch all rain reports
      const [recordMidnight, recordMidday] = await rainReportService.all();

      // assert expectations
      expect(recordMidnight).toStrictEqual(reportMidnight);
      expect(recordMidday).toStrictEqual(reportMidday);

      expect(recordMidnight['id']).toBeUndefined();
      expect(recordMidday['id']).toBeUndefined();
    });
  });
});
