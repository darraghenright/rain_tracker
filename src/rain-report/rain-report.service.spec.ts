import { Test, TestingModule } from '@nestjs/testing';
import { RainReportService } from './rain-report.service';
import { seedDatabase, SEED_DATA } from '../../test/utils';
import { DatabaseService } from './database.service';

describe('RainReportService', () => {
  let rainReportService: RainReportService;
  let database: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, RainReportService],
    }).compile();

    database = new DatabaseService();
    rainReportService = module.get<RainReportService>(RainReportService);

    await seedDatabase();
  });

  describe('RainReportService.all()', () => {
    it('should return a list of rain reports', async () => {
      // fetch all rain reports
      const [recordMidday, recordMidnight] = await rainReportService.all();

      // assert that returned records match inserted data
      const [reportMidnight, reportMidday] = SEED_DATA;
      expect(recordMidday).toStrictEqual(reportMidday);
      expect(recordMidnight).toStrictEqual(reportMidnight);

      // assert that returned records do not include `id`
      expect(recordMidday['id']).toBeUndefined();
      expect(recordMidnight['id']).toBeUndefined();

      // assert that the result set is in descending order by `timestamp`
      expect(recordMidday.timestamp > recordMidnight.timestamp).toBe(true);
    });

    it('should return an empty array if no rain reports exist', async () => {
      // clear all rain reports
      await database.$executeRaw`TRUNCATE TABLE rain_report RESTART IDENTITY`;

      // assert that an empty result set is returned
      const records = await rainReportService.all();
      expect(records).toStrictEqual([]);
    });
  });

  describe('RainReportService.create()', () => {
    it('should create new rain reports', async () => {
      // clear all rain reports
      await database.$executeRaw`TRUNCATE TABLE rain_report RESTART IDENTITY`;

      // assert initial count is 0
      let count = await database.rainReport.count();
      expect(count).toBe(0);

      // report that it's raining
      await rainReportService.create(true);
      count = await database.rainReport.count();
      expect(count).toBe(1);

      // report that it's not raining
      await rainReportService.create(false);
      count = await database.rainReport.count();
      expect(count).toBe(2);
    });
  });
});
