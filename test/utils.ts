import { DatabaseService } from '../src/rain-report/database.service';

export const USER_ID = '604bac992c524da18165a6acbaacf7ba';

export const SEED_DATA = [
  {
    rain: true,
    timestamp: new Date('2024-12-04T00:00:00Z'),
    user_id: USER_ID,
  },
  {
    rain: false,
    timestamp: new Date('2024-12-04T12:00:00Z'),
    user_id: USER_ID,
  },
];

export async function seedDatabase() {
  const database = new DatabaseService();
  await database.$executeRaw`TRUNCATE TABLE rain_report RESTART IDENTITY`;
  await database.rainReport.createMany({ data: SEED_DATA });
}
