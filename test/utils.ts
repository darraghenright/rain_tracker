import { DatabaseService } from '../src/rain-report/database.service';

export const SEED_DATA = [
  {
    rain: true,
    timestamp: new Date('2024-12-04T00:00:00Z'),
  },
  {
    rain: false,
    timestamp: new Date('2024-12-04T12:00:00Z'),
  },
];

export async function seedDatabase() {
  const database = new DatabaseService();
  await database.$executeRaw`TRUNCATE TABLE rain_report RESTART IDENTITY`;
  await database.rainReport.createMany({ data: SEED_DATA });
}
