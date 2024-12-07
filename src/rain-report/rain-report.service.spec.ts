import { Test, TestingModule } from '@nestjs/testing';
import { RainReportService } from './rain-report.service';
import { seedDatabase, SEED_DATA, USER_ID } from '../../test/utils';
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
    it('should return a list of rain reports associated with a given `userId`', async () => {
      // fetch all rain reports
      const [recordMidday, recordMidnight] =
        await rainReportService.all(USER_ID);

      // assert that returned records match inserted data
      // only include the fields we will return
      const [reportMidnight, reportMidday] = SEED_DATA.map(
        ({ rain, timestamp }) => ({ rain, timestamp }),
      );

      expect(recordMidday).toStrictEqual(reportMidday);
      expect(recordMidnight).toStrictEqual(reportMidnight);

      // assert that returned records do not include `id`
      expect(recordMidday['id']).toBeUndefined();
      expect(recordMidnight['id']).toBeUndefined();

      // assert that the result set is in descending order by `timestamp`
      expect(recordMidday.timestamp > recordMidnight.timestamp).toBe(true);
    });

    it('should return an empty array if no rain reports exist for a given `userId`', async () => {
      // clear all rain reports
      await database.$executeRaw`TRUNCATE TABLE rain_report RESTART IDENTITY`;

      // assert that an empty result set is returned
      const records = await rainReportService.all('DOES_NOT_EXIST');
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
      const firstReport = await rainReportService.create(true, USER_ID);
      count = await database.rainReport.count();
      expect(count).toBe(1);
      expect(firstReport.rain).toBe(true);

      // report that it's not raining
      const secondReport = await rainReportService.create(false, USER_ID);
      count = await database.rainReport.count();
      expect(count).toBe(2);
      expect(secondReport.rain).toBe(false);
    });

    it('should save the current timestamp with the rain report', async () => {
      // fake the current datetime
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-12-06T00:00:00.000Z'));

      // create a rain report and return the record
      const rainReport = await rainReportService.create(true, USER_ID);

      // assert that the record's timestamp matches the current datetime
      expect(rainReport.timestamp).toStrictEqual(
        new Date('2024-12-06T00:00:00.000Z'),
      );
    });
  });
});
