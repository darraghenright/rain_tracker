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
      const [recordMidday, recordMidnight] = await rainReportService.all();

      // assert that returned records match inserted data
      expect(recordMidday).toStrictEqual(reportMidday);
      expect(recordMidnight).toStrictEqual(reportMidnight);

      // assert that returned records do not include `id`
      expect(recordMidday['id']).toBeUndefined();
      expect(recordMidnight['id']).toBeUndefined();

      // assert that the result set is in descending order by `timestamp`
      expect(recordMidday.timestamp > recordMidnight.timestamp).toBe(true);
    });
  });
});
